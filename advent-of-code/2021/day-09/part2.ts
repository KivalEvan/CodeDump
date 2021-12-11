const startTime = performance.now();
const input = (await Deno.readTextFile('input.txt'))
    .trim()
    .split('\r\n')
    .filter((s) => s !== '')
    .map((n) => n.split('').map((s) => parseInt(s)));

const maxW = input[0].length;
const maxH = input.length;

const position: [number, number][] = [];
for (let h = 0; h < maxH; h++) {
    for (let w = 0; w < maxW; w++) {
        if (
            input[h][w] < (input[h - 1]?.[w] ?? 9) &&
            input[h][w] < (input[h + 1]?.[w] ?? 9) &&
            input[h][w] < (input[h][w - 1] ?? 9) &&
            input[h][w] < (input[h][w + 1] ?? 9)
        ) {
            position.push([w, h]);
        }
    }
}

const traverse = (x: number, y: number, ary: string[]): void => {
    if (9 > (input[y - 1]?.[x] ?? 9) && !ary.includes(`${x},${y - 1}`)) {
        ary.push(`${x},${y - 1}`);
        traverse(x, y - 1, ary);
    }
    if (9 > (input[y + 1]?.[x] ?? 9) && !ary.includes(`${x},${y + 1}`)) {
        ary.push(`${x},${y + 1}`);
        traverse(x, y + 1, ary);
    }
    if (9 > (input[y][x - 1] ?? 9) && !ary.includes(`${x - 1},${y}`)) {
        ary.push(`${x - 1},${y}`);
        traverse(x - 1, y, ary);
    }
    if (9 > (input[y][x + 1] ?? 9) && !ary.includes(`${x + 1},${y}`)) {
        ary.push(`${x + 1},${y}`);
        traverse(x + 1, y, ary);
    }
};

const search = (x: number, y: number): string[] => {
    const ary: string[] = [];
    traverse(x, y, ary);
    return ary;
};

const size = [];
for (const p of position) {
    const ary = search(...p).map((n) => n.split(',').map((m) => parseInt(m)));
    size.push(ary.length);
}
size.sort((a, b) => b - a);
console.log(size[0] * size[1] * size[2]);

const endTime = performance.now() - startTime;
console.log('time taken', endTime);
