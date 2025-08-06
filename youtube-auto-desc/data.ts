import { CharacteristicName, DifficultyName } from 'jsr:@kvl/bsmap/types';
import { BeatmapData, BeatmapRawData } from './types.ts';

function parseData(data: {
   data: {
      [key: string]: BeatmapRawData;
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
            njs: d.njsEvents?.total || 0,
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

const characteristicRemap: {
   [key in
      | CharacteristicName
      | BeatmapData['characteristic']]?: BeatmapData['characteristic'];
} = {
   OneSaber: 'One Saber',
   NoArrows: 'No Arrows',
   '360Degree': '360 Degree',
   '90Degree': '90 Degree',
};

const difficultyRemap: { [key in DifficultyName]?: DifficultyName } = {
   ExpertPlus: 'Expert+',
};

const packRemap: { [key: string]: string } = {
   MonstercatVol2: 'Monstercat Mixtape 2',
   LinkinPark: 'Linkin Park',
   LinkinPark2: 'Linkin Park x Mike Shinoda',
   LadyGaga: 'Lady Gaga',
   BillieEilish: 'Billie Eilish',
   ShockDrop: 'Shock Drops',
   Monstercat: 'Monstercat Vol. 1',
   RocketLeague: 'Rocket League x Monstercat',
   GreenDay: 'Green Day',
   PanicAtTheDisco: 'Panic! at the Disco',
   ImagineDragons: 'Imagine Dragons',
   Interscope: 'Interscope Mixtape',
   RockMixtape: 'Rock Mixtape',
   EDM: 'Electronic Mixtape',
   FallOutBoy: 'Fall Out Boy',
   TheWeeknd: 'The Weeknd',
   DaftPunk: 'Daft Punk',
   OstVol1: 'OST Vol. 1',
   OstVol2: 'OST Vol. 2',
   OstVol3: 'OST Vol. 3',
   OstVol4: 'OST Vol. 4',
   OstVol5: 'OST Vol. 5',
   OstVol6: 'OST Vol. 6',
   OstVol7: 'OST Vol. 7',
   TheRollingStones: 'The Rolling Stones',
   HipHop: 'Hip Hop Mixtape',
   BritneySpears: 'Britney Spears',
};

const titleRemap: { [key: string]: string } = {
   'Lvl INSANE': 'Lvl Insane',
   'Curtains All Night Long': 'Curtains (All Night Long)',
   'Final Boss Chan': 'Final-Boss-Chan',
   'POP/STARS - K/DA': 'POP/STARS',
   'I Was Made For Loving You': "I was made for lovin' you",
   '$100 Bills (Remix)': '$100 Bills (Camellia\'s "215$-Step" Remix)',
   'Escape (Remix)': 'Escape Remix',
   'Around The World / Harder Better Faster Stronger':
      'Around The World / Harder Better Faster Stronger (Live 2007)',
   'Da Funk / Daftendirekt': 'Da Funk / Daftendirekt (Live 2007)',
   'Prime Time of Your Life': 'The Prime Time of Your Life (Live 2007)',
   KillerQueen: 'Killer Queen',
};

function dataCorrection(data: BeatmapData[]): BeatmapData[] {
   data.forEach((d) => {
      d.characteristic =
         characteristicRemap[d.characteristic] || d.characteristic;
      d.difficulty = difficultyRemap[d.difficulty] || d.difficulty;
      d.pack = packRemap[d.pack] || d.pack;
      d.title = d.title.replaceAll('…', '...');
      d.title = titleRemap[d.title] || d.title;
   });
   return data;
}

export function getData(path?: string) {
   return Deno.readTextFile(path || './ost.json')
      .then(JSON.parse)
      .then(parseData)
      .then(dataCorrection);
}
