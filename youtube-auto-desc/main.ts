import { getData } from './data.ts';
import { YouTube } from './deps.ts';
import { getDescription } from './description.ts';
import { YouTubePlaylistItems, YouTubePlaylists, YoutubeResponse, YouTubeVideo } from './types.ts';

const data = await getData();
let completed = Deno.readTextFileSync('./completed.txt');

const yt = new YouTube(
   Deno.env.get('GOOGLE_API_KEY')!,
   Deno.env.get('GOOGLE_ACCESS_TOKEN')!,
);

let playlists: YoutubeResponse<YouTubePlaylists> = await Deno.readTextFile(
   './playlist/playlists.txt',
)
   .then(JSON.parse)
   .catch((_) => null);

if (!playlists) {
   playlists = await yt.playlists_list({
      part: 'snippet',
      mine: true,
      maxResults: 50,
   });
   if (playlists.error) throw playlists.error;
   Deno.writeTextFileSync('./playlist/playlists.txt', JSON.stringify(playlists));
}

const packSet = new Set(data.map((e) => e.pack));
for (
   const playlist of playlists.items.filter(
      (e) =>
         e.snippet.title.startsWith('Beat Saber') &&
         !e.snippet.title.endsWith('Lightshow') &&
         !e.snippet.title.endsWith('Map Preview'),
   )
) {
   const pack = playlist.snippet.title.slice(
      playlist.snippet.title.indexOf('|') + 2,
   );
   if (!packSet.has(pack)) throw new Error('Unknown pack: ' + pack);
   console.log('reading', './playlist/' + pack + '.txt');
   let playlistItems: YoutubeResponse<YouTubePlaylistItems> = await Deno.readTextFile(
      './playlist/' + pack + '.txt',
   )
      .then(JSON.parse)
      .catch((_) => null);
   if (!playlistItems) {
      let nextToken: string | undefined = '';
      while (nextToken !== undefined) {
         const currentItems: YoutubeResponse<YouTubePlaylistItems> = await yt.playlistItems_list({
            part: 'snippet',
            playlistId: playlist.id,
            maxResults: 50,
            pageToken: nextToken,
         });
         if (playlistItems) playlistItems.items.push(...currentItems.items);
         else playlistItems = currentItems;
         nextToken = currentItems.nextPageToken;
      }
      if (playlistItems.error) throw playlistItems.error;
      Deno.writeTextFileSync(
         './playlist/' + pack + '.txt',
         JSON.stringify(playlistItems),
      );
   }

   const songList: [string, string][] = playlist.snippet.description
      .slice(
         playlist.snippet.description.indexOf('-- Song List --'),
         playlist.snippet.description.lastIndexOf('\n'),
      )
      .split('\n')
      .slice(1)
      .filter((e) => e)
      .map((e) => {
         const d = e.replaceAll('’', "'").replaceAll('‘', "'").split(' - ');
         if (d[1] === 'Freebird') d[1] = 'Free Bird';
         return [d[0], d.slice(1).join(' - ')];
      });

   for (
      const map of data.filter(
         (e) => playlist.snippet.title.split('|')[1].trim() === e.pack,
      )
   ) {
      const diffTag = `[${map.difficulty}${
         map.characteristic === 'Standard' ? '' : ` (${map.characteristic})`
      }]`;
      const selYtData = playlistItems.items.filter((e) =>
         e.snippet.title
            .slice(e.snippet.title.indexOf('|'))
            .replaceAll('’', "'")
            .replaceAll('‘', "'")
            .replaceAll('…', '...')
            .toLowerCase()
            .includes(map.title.toLowerCase())
      );
      const singleData = selYtData.find((e) => e.snippet.title.includes(diffTag));
      if (!singleData) {
         console.log(playlistItems.items.map((e) => e.snippet.title));
         throw new Error("Couldn't find data for " + map.title + diffTag);
      }
      if (completed.includes(singleData.snippet.title)) {
         console.log(singleData.snippet.title, 'skipped');
         continue;
      }
      const description = getDescription(map, playlistItems.items, songList);

      console.log('fetching', pack, map.title, diffTag);
      const vidRes: YoutubeResponse<YouTubeVideo> = await yt.videos_list({
         part: 'snippet',
         id: singleData.snippet.resourceId.videoId,
         maxResults: 1,
      });
      if (vidRes.error) throw vidRes.error;
      if (!vidRes.items.length) throw new Error('why');

      console.log('updating', vidRes.items[0].snippet.title);
      const res = await yt.videos_update(
         { part: 'snippet' },
         JSON.stringify({
            id: singleData.snippet.resourceId.videoId,
            snippet: {
               title: singleData.snippet.title,
               categoryId: vidRes.items[0].snippet.categoryId,
               description,
            },
         }) as unknown as Record<string, unknown>,
      );

      if (res.error) throw res.error;

      completed += singleData.snippet.title + '\n';
      Deno.writeTextFileSync('./completed.txt', completed);
      console.log('done');
   }
}
