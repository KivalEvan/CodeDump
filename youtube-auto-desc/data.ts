import { BeatmapData } from './type.ts';

function parseData(data: {
   data: {
      [key: string]: {
         title: string;
         pack: string;
         released: string;
         bpm: number;
         length: number;
         characteristic:
            | 'Standard'
            | 'One Saber'
            | 'No Arrows'
            | '360 Degree'
            | '90 Degree'
            | 'Legacy';
         difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'Expert+';
         colorNotes: {
            total: number;
         };
         bombNotes: {
            total: number;
         };
         obstacles: {
            total: number;
         };
         sliders?: {
            total: number;
         };
         burstSliders?: {
            total: number;
         };
         basicBeatmapEvents: {
            total: number;
         };
         colorBoostBeatmapEvents: {
            total: number;
         };
         rotationEvents: {
            total: number;
         };
         bpmEvents: {
            total: number;
         };
         lightColorEventBoxGroups?: {
            total: number;
         };
         lightRotationEventBoxGroups?: {
            total: number;
         };
         lightTranslationEventBoxGroups?: {
            total: number;
         };
         vfxEventBoxGroups: {
            total: number;
         };
         waypoints?: {
            total: number;
         };
         basicEventTypesWithKeywords?: {
            total: number;
         };
         jumpSpeed: number;
         jumpOffset: number;
         mappers: string[];
         lighters: string[];
      };
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
            bpm: d.bpmEvents.total,
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
      if (d.difficulty === 'ExpertPlus') d.difficulty = 'Expert+';
      if (d.pack === 'OstVol6') d.pack = 'OST Vol. 6';
      if (d.pack === 'TheRollingStones') d.pack = 'The Rolling Stones';
      if (d.pack === 'HipHop') d.pack = 'Hip Hop Mixtape';
      if (d.title === 'Lvl INSANE') d.title = 'Lvl Insane';
      if (d.title === 'I Was Made For Loving You') {
         d.title = "I was made for lovin' you";
      }
      if (d.title === '$100 Bills (Remix)') {
         d.title = '$100 Bills (Camellia\'s "215$-Step" Remix)';
      }
      if (d.title === 'Escape (Remix)') d.title = 'Escape Remix';
      if (d.title === 'Around The World / Harder Better Faster Stronger') {
         d.title = 'Around The World / Harder Better Faster Stronger (Live 2007)';
      }
      if (d.title === 'Da Funk / Daftendirekt') {
         d.title = 'Da Funk / Daftendirekt (Live 2007)';
      }
      if (d.title === 'Prime Time of Your Life') {
         d.title = 'The Prime Time of Your Life (Live 2007)';
      }
      if (d.pack === 'Monstercat') d.pack = 'Monstercat Vol. 1';
      if (d.pack === 'Rocket League') d.pack = 'Rocket League x Monstercat';
      if (d.pack === 'DaftPunk') d.pack = 'Daft Punk';
   });
   return data;
}

export function getData(path?: string) {
   return Deno.readTextFile(path || './ost.json')
      .then(JSON.parse)
      .then(parseData)
      .then(dataCorrection);
}
