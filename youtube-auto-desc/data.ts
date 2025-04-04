import { BeatmapData, BeatmapRawData } from './types.ts';

function parseData(data: {
   data: {
      [key: string]: BeatmapRawData
   };
}): BeatmapData[] {
   return Object.values(data.data).map((d) => {
      return {
         title: d.title,
         pack: d.pack,
         releaseDate: new Date(d.released),
         length: d.length,
         bpm: d.bpm,
         characteristic: d.characteristic,
         difficulty: d.difficulty,
         nps: d.colorNotes.total / d.length,
         notes: { color: d.colorNotes.total, bomb: d.bombNotes.total },
         obstacles: d.obstacles.total,
         sliders: {
            arc: d.sliders?.total || 0,
            chain: d.burstSliders?.total || 0,
         },
         events: {
            basic: d.basicBeatmapEvents.total,
            boost: d.colorBoostBeatmapEvents.total,
            rotation: d.rotationEvents.total || 0,
            bpm: d.bpmEvents?.total || 0,
         },
         eventGroups: {
            color: d.lightColorEventBoxGroups?.total || 0,
            rotate: d.lightRotationEventBoxGroups?.total || 0,
            translate: d.lightTranslationEventBoxGroups?.total || 0,
            vfx: d.vfxEventBoxGroups?.total || 0,
         },
         waypoints: d.waypoints?.total || 0,
         keywords: d.basicEventTypesWithKeywords?.total || 0,
         njs: { value: d.jumpSpeed, offset: d.jumpOffset },
         mappers: d.mappers?.join(', ') || 'Unknown',
         lighters: d.lighters?.join(', ') || 'Unknown',
      };
   });
}

function dataCorrection(data: BeatmapData[]): BeatmapData[] {
   data.forEach((d) => {
      switch (d.difficulty) {
         case 'ExpertPlus':
            d.difficulty = 'Expert+';
      }
      switch (d.pack) {
         case 'MonstercatVol2':
            d.pack = 'Monstercat Mixtape 2';
            break;
         case 'ShockDrop':
            d.pack = 'Shock Drops';
            break;
         case 'Monstercat':
            d.pack = 'Monstercat Vol. 1';
            break;
         case 'Rocket League':
            d.pack = 'Rocket League x Monstercat';
            break;
         case 'DaftPunk':
            d.pack = 'Daft Punk';
            break;
         case 'OstVol6':
            d.pack = 'OST Vol. 6';
            break;
         case 'OstVol7':
            d.pack = 'OST Vol. 7';
            break;
         case 'TheRollingStones':
            d.pack = 'The Rolling Stones';
            break;
         case 'HipHop':
            d.pack = 'Hip Hop Mixtape';
            break;
         case 'BritneySpears':
            d.pack = 'Britney Spears';
            break;
      }
      d.title = d.title.replaceAll('…', '...');
      switch (d.title) {
         case 'Lvl INSANE':
            d.title = 'Lvl Insane';
            break;
         case 'I Was Made For Loving You':
            d.title = "I was made for lovin' you";
            break;
         case '$100 Bills (Remix)':
            d.title = '$100 Bills (Camellia\'s "215$-Step" Remix)';
            break;
         case 'Escape (Remix)':
            d.title = 'Escape Remix';
            break;
         case 'Around The World / Harder Better Faster Stronger':
            d.title = 'Around The World / Harder Better Faster Stronger (Live 2007)';
            break;
         case 'Da Funk / Daftendirekt':
            d.title = 'Da Funk / Daftendirekt (Live 2007)';
            break;
         case 'Prime Time of Your Life':
            d.title = 'The Prime Time of Your Life (Live 2007)';
            break;
      }
   });
   return data;
}

export function getData(path?: string) {
   return Deno.readTextFile(path || './ost.json')
      .then(JSON.parse)
      .then(parseData)
      .then(dataCorrection);
}
