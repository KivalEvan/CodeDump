import { NoteJumpSpeed, round, toMmss } from './deps.ts';
import { BeatmapData, YouTubePlaylistItems } from './type.ts';

// honestly i forgor
const HardwareSettings: {
   [key: string]: { platform: string; name: string; connection: string };
} = {
   '01-01-2020': { platform: 'PCVR', name: 'Meta Quest 2', connection: 'Link' },
   '01-01-2019': { platform: 'PCVR', name: 'HTC Vive', connection: 'Wired' },
};
const ControllerOffsetSettings: {
   [key: string]: {
      pos: { x: number; y: number; z: number };
      rot: { x: number; y: number; z: number };
   };
} = {
   '01-04-2024': { pos: { x: -1, y: -0.5, z: 0 }, rot: { x: 9, y: -8, z: 0 } },
   '01-03-2024': {
      pos: { x: -1.6, y: -0.8, z: 0 },
      rot: { x: 9, y: -9, z: 0 },
   },
   '01-01-2024': {
      pos: { x: -1.2, y: -0.8, z: -1.6 },
      rot: { x: 8, y: -8, z: 0 },
   },
   '01-10-2023': {
      pos: { x: -1.2, y: -0.8, z: 0 },
      rot: { x: 8, y: -8, z: 0 },
   },
   '01-01-2023': {
      pos: { x: -1.2, y: -0.8, z: 0 },
      rot: { x: 8, y: -2, z: 0 },
   },
};
const CameraSettings: {
   [key: string]: {
      fov: number;
      zOffset: number;
      smoothPos: number;
      smoothRot: number;
   };
} = {
   '01-01-2023': { fov: 64, zOffset: -0.375, smoothPos: 14, smoothRot: 7 },
   '01-01-2022': { fov: 64, zOffset: -0.4, smoothPos: 14, smoothRot: 7 },
   '01-01-2020': { fov: 70, zOffset: -0.4, smoothPos: 12, smoothRot: 6 },
   '01-01-2019': { fov: 90, zOffset: -0.5, smoothPos: 12, smoothRot: 6 },
};

function getSettings<T>(
   settings: { [key: string]: T },
   date: Date,
): T | undefined {
   for (const settingsDate in settings) {
      const d = new Date(settingsDate);
      if (date > d) {
         return settings[settingsDate];
      }
   }
}

function getCustomDescription(bmData: BeatmapData): string {
   switch (bmData.title) {
      case 'Sandstorm':
         return 'song name?\n';
      default:
         return '';
   }
}

export function getDescription(
   bmData: BeatmapData,
   ytData: YouTubePlaylistItems[],
   songList: [string, string][],
): string {
   const description = getCustomDescription(bmData);
   const diffTag = `[${bmData.difficulty}${
      bmData.characteristic === 'Standard' ? '' : ` (${bmData.characteristic})`
   }]`;
   const selYtData = ytData.filter((e) =>
      e.snippet.title
         .slice(e.snippet.title.indexOf('|'))
         .replaceAll('’', "'")
         .replaceAll('‘', "'")
         .toLowerCase()
         .includes(bmData.title.toLowerCase())
   );
   const singleData = selYtData.find((e) => e.snippet.title.includes(diffTag));
   if (!singleData) {
      throw new Error("Couldn't find data for " + bmData.title + diffTag);
   }
   const songe = songList.find((e) => e[1].toLowerCase().includes(bmData.title.toLowerCase()));
   if (!songe) {
      throw new Error(
         "Couldn't find " + bmData.title + ' from playlist description',
      );
   }
   const artist = songe[0];
   const title = songe[1];
   const ytDate = new Date(singleData.snippet.publishedAt);

   const hw = getSettings(HardwareSettings, ytDate)!;
   const contOffset = getSettings(ControllerOffsetSettings, ytDate);
   const cam = getSettings(CameraSettings, ytDate)!;

   const njs = new NoteJumpSpeed(
      bmData.bpm,
      bmData.njs.value,
      bmData.njs.offset,
   );

   return `!! EPILEPSY WARNING: FOOTAGE MAY CONTAIN FLASHING LIGHT !!
${description}
[ Beatmap Information ]
Title: ${title}
Artist: ${artist}
Pack: ${bmData.pack}
Release Date: ${bmData.releaseDate.toUTCString()}
Mapper(s): ${bmData.mappers}
Lighter(s): ${bmData.lighters}

Length: ${toMmss(bmData.length)}
BPM: ${bmData.bpm}${bmData.events.bpm > 1 ? ` (${bmData.events.bpm} changes)` : ''}
NJS: ${njs.value}
Offset: ${njs.offset}
HJD: ${njs.hjd}
Jump Distance: ${round(njs.jd, 2)} 
Reaction Time: ${round(njs.reactionTime * 1000)}ms

Characteristic: ${bmData.characteristic}
Difficulty: ${bmData.difficulty}
NPS: ${round(bmData.nps, 2)}

Notes: ${bmData.notes.color}
Bombs: ${bmData.notes.bomb}
Arcs: ${bmData.sliders.arc}
Chains: ${bmData.sliders.chain}
Obstacles: ${bmData.obstacles}

Basic Events: ${bmData.events.basic}
Boost Events: ${bmData.events.boost}
Rotation Events: ${bmData.events.rotation}
Event Box Groups:
   Color: ${bmData.eventGroups.color}
   Rotation: ${bmData.eventGroups.rotate}
   Translation: ${bmData.eventGroups.translate}
   VFX: ${bmData.eventGroups.vfx}

Waypoints: ${bmData.waypoints}
Keywords: ${bmData.keywords}

[ Other Difficulties ]
${
      selYtData
         .filter((e) => !e.snippet.title.includes(diffTag))
         .map(
            (e) =>
               `https://youtu.be/${e.snippet.resourceId.videoId} - ${
                  e.snippet.title.slice(
                     e.snippet.title.indexOf('[') + 1,
                     e.snippet.title.indexOf(']'),
                  )
               }`,
         )
         .join('\n')
   }

[ Setup ]
Platform: ${hw.platform}
VR: ${hw.name}
Connection: ${hw.connection}

Controller Position:
   X: ${contOffset?.pos.x ?? '?'}
   Y: ${contOffset?.pos.y ?? '?'}
   Z: ${contOffset?.pos.z ?? '?'}
Controller Rotation:
   X: ${contOffset?.rot.x ?? '?'}
   Y: ${contOffset?.rot.y ?? '?'}
   Z: ${contOffset?.rot.z ?? '?'}

Camera
   FOV: ${cam.fov}
   Z Offset: ${cam.zOffset}
   Pivoting Offset: ${
      bmData.characteristic === '360 Degree' ||
         bmData.characteristic === '90 Degree'
         ? 'true'
         : 'false'
   }
   Smooth Position: ${cam.smoothPos}
   Smooth Rotation: ${cam.smoothRot}

The description is autogenerated on ${
      new Date().toISOString()
   } using modified Beat Saber Map Analysis dataset.`;
}
