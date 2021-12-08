const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((e) => e !== '')
    .map((s) =>
        s
            .split(' ')
            .filter((e) => !e.match(/#\d+/) && e !== '@')
            .map((e) =>
                e
                    .replace(':', '')
                    .split(/x|,/)
                    .map((n) => parseInt(n))
            )
    );

const sizeX = Math.max(...input.map((s) => s[0][0] + s[1][0]));
const point: { [key: number]: number } = {};

for (const line of input) {
    for (let x = 0; x < line[1][0]; x++) {
        for (let y = 0; y < line[1][1]; y++) {
            const pos = (line[0][1] + y) * sizeX + line[0][0] + x;
            point[pos] = point[pos] ? ++point[pos] : 1;
        }
    }
}

console.log(Object.values(point).filter((n) => n >= 2).length);
