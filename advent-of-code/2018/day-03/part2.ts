const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((e) => e !== '')
    .map((s) =>
        s
            .split(' ')
            .filter((e) => e !== '@')
            .map((e) =>
                e
                    .replace(/[#:]/, '')
                    .split(/x|,/)
                    .map((n) => parseInt(n))
            )
    );

const sizeX = Math.max(...input.map((s) => s[1][0] + s[2][0]));
const point: { [key: number]: number } = {};

for (const line of input) {
    for (let x = 0; x < line[2][0]; x++) {
        for (let y = 0; y < line[2][1]; y++) {
            const pos = (line[1][1] + y) * sizeX + line[1][0] + x;
            point[pos] = point[pos] ? ++point[pos] : 1;
        }
    }
}

for (const line of input) {
    let overlapped = false;
    for (let x = 0; x < line[2][0]; x++) {
        for (let y = 0; y < line[2][1]; y++) {
            const pos = (line[1][1] + y) * sizeX + line[1][0] + x;
            if (point[pos] > 1) {
                overlapped = true;
            }
        }
    }
    if (!overlapped) {
        console.log(line);
    }
}
