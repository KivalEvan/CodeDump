// honestly i forgor
export const HardwareSettings: {
   [key: string]: { platform: string; name: string; connection: string };
} = {
   '07-01-2025': { platform: 'PCVR', name: 'PS VR2', connection: 'Wired' },
   '11-01-2024': { platform: 'PCVR', name: 'Meta Quest 3', connection: 'Link' },
   '01-01-2020': { platform: 'PCVR', name: 'Meta Quest 2', connection: 'Link' },
   '01-01-2019': { platform: 'PCVR', name: 'HTC Vive', connection: 'Wired' },
};
export const ControllerOffsetSettings: {
   [key: string]: {
      pos: { x: number; y: number; z: number };
      rot: { x: number; y: number; z: number };
   };
} = {
   '08-01-2025': { pos: { x: 0, y: -6, z: -4 }, rot: { x: 41, y: -3, z: 0 } },
   '07-01-2025': { pos: { x: 0, y: -6, z: -4 }, rot: { x: 42, y: -3, z: 0 } },
   '02-01-2025': { pos: { x: -1.5, y: -6, z: -3 }, rot: { x: 36, y: -18, z: 0 } },
   '01-02-2025': { pos: { x: -0.5, y: -5.5, z: -7 }, rot: { x: 41, y: -20, z: 0 } },
   '11-15-2024': { pos: { x: -0.5, y: -7, z: -1.2 }, rot: { x: 45, y: -8, z: 0 } },
   '11-01-2024': { pos: { x: 2.5, y: -6, z: 5 }, rot: { x: 42, y: -3, z: 0 } },
   '09-01-2024': { pos: { x: -1, y: -0.5, z: 0 }, rot: { x: 8, y: -8, z: 0 } },
   '04-01-2024': { pos: { x: -1, y: -0.5, z: 0 }, rot: { x: 9, y: -8, z: 0 } },
   '03-01-2024': {
      pos: { x: -1.6, y: -0.8, z: 0 },
      rot: { x: 9, y: -9, z: 0 },
   },
   '01-01-2024': {
      pos: { x: -1.2, y: -0.8, z: -1.6 },
      rot: { x: 8, y: -8, z: 0 },
   },
   '10-01-2023': {
      pos: { x: -1.2, y: -0.8, z: 0 },
      rot: { x: 8, y: -8, z: 0 },
   },
   '01-01-2023': {
      pos: { x: -1.2, y: -0.8, z: 0 },
      rot: { x: 8, y: -2, z: 0 },
   },
};
export const CameraSettings: {
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

export function getSettings<T>(
   settings: { [key: string]: T },
   date: Date,
): T | undefined {
   for (const settingsDate in settings) {
      const d = new Date(settingsDate);
      if (date.valueOf() > d.valueOf()) {
         return settings[settingsDate];
      }
   }
}
