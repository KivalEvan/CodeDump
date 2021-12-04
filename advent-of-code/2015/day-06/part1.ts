const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput
    .split('\r\n')
    .filter((e) => e !== '')
    .map((e) => e.toLowerCase().split(' '));
const grid = [];
for (let x = 0; x < 1000; x++) {
    grid.push(new Array(1000).fill(false));
}

for (let i = 0; i < parsed.length; i++) {
    if (parsed[i][0] === 'toggle') {
        const [startX, startY] = parsed[i][1].split(',').map((e) => parseInt(e));
        const [endX, endY] = parsed[i][3].split(',').map((e) => parseInt(e));
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                grid[x][y] = !grid[x][y];
            }
        }
    }
    if (parsed[i][0] === 'turn') {
        const s = parsed[i][1] === 'on';
        const [startX, startY] = parsed[i][2].split(',').map((e) => parseInt(e));
        const [endX, endY] = parsed[i][4].split(',').map((e) => parseInt(e));
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                grid[x][y] = s;
            }
        }
    }
}

let lit = 0;
for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
        if (grid[x][y]) {
            lit++;
        }
    }
}

console.log(lit);
