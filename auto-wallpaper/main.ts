import { encodeBase64, ensureDirSync, resolve } from './deps.ts';
import { services } from './services.ts';
import {
   Rating,
   RatingSerialize,
   ServiceAuthType,
   ServiceDetails,
   ServiceName,
} from './types.ts';

const IS_TEST = false;
const SERVICE: ServiceName = 'danbooru';
const REFRESH_RATE = 120_000;
const SAVE_PATH = '/home/kival/Pictures/API';
const MONITOR_INDEX = 0;
const ASPECT_RATIO = '>7/8';
const RATING_WHITELIST: Rating[] = [
   Rating.GENERAL,
   Rating.SENSITIVE,
   Rating.QUESTIONABLE,
   Rating.EXPLICIT,
   Rating.UNKNOWN,
];

const service: ServiceDetails = services[SERVICE];
const TAGS = IS_TEST
? ['touhou']
: [
   'touhou',
   '-loli',
   '-comic',
   '-animated',
   '-cookie_(touhou)',
   '-onikobe_rin',
   'ratio:' + ASPECT_RATIO,
   ...service.tags,
];
const MIN_X = 2560;
const EXT_WHITELIST = ['png', 'jpg', 'jpeg', 'webp'];

// const ratingCount = [
//    Deno.readDirSync(resolve(SAVE_PATH, 'saved', 'g')).toArray().length,
//    Deno.readDirSync(resolve(SAVE_PATH, 'saved', 's')).toArray().length,
//    Deno.readDirSync(resolve(SAVE_PATH, 'saved', 'q')).toArray().length,
//    Deno.readDirSync(resolve(SAVE_PATH, 'saved', 'e')).toArray().length,
//    0,
// ];

let queue: Record<string, unknown>[] = [];
let id = 0;
let previousPath = '';

function filterExtension(json: Record<string, unknown>): boolean {
   return EXT_WHITELIST.includes(service.method.getImageExt(json));
}

function filterRating(json: Record<string, unknown>): boolean {
   return RATING_WHITELIST.includes(service.method.getRating(json));
}

async function getPosts(api: string, tags: string[]) {
   const url = new URL(api, IS_TEST ? service.testUrl : service.url);
   url.searchParams.set('tags', tags.join(' '));
   const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'ApplicationName/1.0',
   };
   if (service.authType === ServiceAuthType.HEADER && !IS_TEST) {
      headers['Authorization'] = encodeBase64(
         Deno.env.get('USER_NAME') + ':' + Deno.env.get('API_KEY')
      );
   }

   const response = await fetch(url, { headers });
   if (response.status !== 200) {
      console.error('Failed to fetch', response.status);
      return [];
   }

   const results = service.method
      .getPosts(await response.json())
      .filter(service.method.getImageUrl)
      .filter(filterExtension)
      .filter(filterRating);

   id = Math.max(id, ...results.map(service.method.getId));
   return results.reverse();
}

async function main() {
   if (!queue.length) {
      console.log('Polling new images');
      const newTags = [...TAGS];
      if (id) {
         newTags.push(`id:>${id}`);
      }
      queue = await getPosts(service.postsApi, newTags);
      if (!queue.length) {
         console.log('No new images, fetching random');
         queue = await getPosts(service.randomApi || service.postsApi, [
            ...TAGS,
            'date:>2018-01-01',
         ]);
      }
   }

   const data = queue.shift()!;
   if (!data) {
      console.log('No image fetched');
      return;
   }
   const createdDate = service.method.getCreatedDate(data);
   const imgUrl = new URL(service.method.getImageUrl(data));
   const img = await (await fetch(imgUrl)).blob();
   const characters = service.method.getCharacters(data);
   const imgFilename =
      createdDate.getFullYear().toString() +
      '_' +
      (characters.length === 1 ? characters[0] + '_' : '') +
      imgUrl.pathname.split('/').at(-1)!;
   const imgFilepath = resolve(
      SAVE_PATH,
      'saved',
      RatingSerialize[service.method.getRating(data)],
      imgFilename
   );
   console.log('Writing', imgFilepath);
   ensureDirSync(imgFilepath.split('/').slice(0, -1).join('/'));
   Deno.writeFileSync(imgFilepath, await img.bytes());

   const scale =
      2 ** Math.ceil(Math.log2(MIN_X / service.method.getWidth(data)));
   let resPath;
   if (scale > 1 && !service.method.getTags(data).includes('pixel_art')) {
      console.log('Upscaling by', scale);
      resPath = resolve(
         SAVE_PATH,
         scale + 'x_' + imgFilename.split('.')[0] + '.png'
      );
      new Deno.Command('waifu2x-ncnn-vulkan', {
         args: [
            '-i',
            imgFilepath,
            '-o',
            resPath,
            '-s',
            scale.toString(),
            '-n',
            '1',
         ],
      }).outputSync();
   } else {
      resPath = resolve(SAVE_PATH, imgFilename);
      Deno.copyFileSync(imgFilepath, resPath);
   }
   new Deno.Command('dbus-send', {
      args: [
         '--session',
         '--dest=org.kde.plasmashell',
         '--type=method_call',
         '/PlasmaShell',
         'org.kde.PlasmaShell.evaluateScript',
         `
string: var Desktops = desktops();
d = Desktops[${MONITOR_INDEX}];
d.wallpaperPlugin = "org.kde.image";
d.currentConfigGroup = Array("Wallpaper", "org.kde.image", "General");
d.writeConfig("Image", "${resPath}");`.replace('\n', ''),
      ],
   }).outputSync();
   if (previousPath) {
      Deno.removeSync(previousPath);
   }
   previousPath = resPath;

   // ratingCount[service.method.getRating(data)]++;
   // const total = ratingCount.reduce((a, b) => a + b, 0);
   // console.log(
   //    'G:',
   //    ratingCount[Rating.GENERAL],
   //    'S:',
   //    ratingCount[Rating.SENSITIVE],
   //    'Q:',
   //    ratingCount[Rating.QUESTIONABLE],
   //    'E:',
   //    ratingCount[Rating.EXPLICIT]
   // );
   // console.log(
   //    1,
   //    'in',
   //    total /
   //       (ratingCount[Rating.QUESTIONABLE] +
   //          ratingCount[Rating.EXPLICIT] +
   //          ratingCount[Rating.SENSITIVE] / 10)
   // );

   console.log('Waiting...', queue.length, 'in queue');
}

function uniqueRun(func: () => void) {
   let lock = false;
   return () => {
      if (lock) return;
      try {
         lock = true;
         func();
      } catch (e) {
         console.error(e);
      } finally {
         lock = false;
      }
   };
}

const uMain = uniqueRun(main);
uMain();
setInterval(uMain, REFRESH_RATE);
