const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((s) => s !== '')
    .map((s) => s.split(' -> ').map((n) => n.split(',').map((m) => parseInt(m))));

const sizeX = Math.max(...input.map((i) => i.map((n) => n[0])).flat());
const point: { [key: number]: number } = {};

for (const line of input) {
    if (line[0][0] !== line[1][0] && line[0][1] !== line[1][1]) {
        continue;
    }
    const minX = Math.min(line[0][0], line[1][0]);
    const maxX = Math.max(line[0][0], line[1][0]);
    const minY = Math.min(line[0][1], line[1][1]);
    const maxY = Math.max(line[0][1], line[1][1]);
    if (minY === maxY) {
        for (let x = minX; x <= maxX; x++) {
            const pos = minY * sizeX + x;
            point[pos] = point[pos] ? ++point[pos] : 1;
        }
        continue;
    }
    if (minX === maxX) {
        for (let y = minY; y <= maxY; y++) {
            const pos = y * sizeX + minX;
            point[pos] = point[pos] ? ++point[pos] : 1;
        }
        continue;
    }
}

console.log(Object.values(point).filter((n) => n >= 2).length);