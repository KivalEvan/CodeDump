export const tests = { part1: 24, part2: 93 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').map((str) =>
        str.split('->').map((coor) => coor.split(',').map((n) => parseInt(n)))
    ) as [
        number,
        number,
    ][][];
}

function line(
    grid: string[][],
    start: [number, number],
    end: [number, number],
    offsetX: number,
) {
    const x = start[0] - end[0];
    const y = start[1] - end[1];
    if (x) {
        for (let i = 1; i < Math.abs(x); i++) {
            if (x > 0) {
                grid[start[1]][start[0] - i + offsetX] = '#';
            } else {
                grid[start[1]][start[0] + i + offsetX] = '#';
            }
        }
    }
    if (y) {
        for (let i = 1; i < Math.abs(y); i++) {
            if (y > 0) {
                grid[start[1] - i][start[0] + offsetX] = '#';
            } else {
                grid[start[1] + i][start[0] + offsetX] = '#';
            }
        }
    }
}

function draw(grid: string[][], path: [number, number][], offsetX: number) {
    let previous: [number, number] | null = null;
    for (const p of path) {
        grid[p[1]][p[0] + offsetX] = '#';
        if (previous) {
            line(grid, previous, p, offsetX);
        }
        previous = p;
    }
}

function sand(grid: string[][], x: number): boolean {
    const pos = [x, 0];
    const MAX_Y = grid.length;
    const MAX_X = grid[0].length - 1;
    while (true) {
        if (grid[0][x] === 'o') {
            return false;
        }

        const checkY = pos[1] + 1;
        if (checkY === MAX_Y) {
            return false;
        }

        if (grid[checkY][pos[0]] === 'o' || grid[checkY][pos[0]] === '#') {
            if (pos[0] - 1 < 0) {
                return false;
            }
            if (pos[0] + 1 > MAX_X) {
                return false;
            }
            // check left
            if (grid[checkY][pos[0] - 1] === '.') {
                pos[0]--;
                pos[1]++;
                continue;
            }
            // check right
            if (grid[checkY][pos[0] + 1] === '.') {
                pos[0]++;
                pos[1]++;
                continue;
            }
            grid[pos[1]][pos[0]] = 'o';
            return true;
        }

        pos[1]++;
    }
}

export function part1() {
    const input = getInput();
    const allCoordinates = input.flat();
    const allX = allCoordinates.map((n) => n[0]);
    const allY = allCoordinates.map((n) => n[1]);

    const MIN_X = Math.min(...allX);
    const MAX_X = Math.max(...allX) + 1;
    const MAX_Y = Math.max(...allY) + 1;

    const offset = 500 - MIN_X;

    const grid = new Array(MAX_Y);
    for (let y = 0; y < MAX_Y; y++) {
        grid[y] = new Array(MAX_X - MIN_X).fill('.');
    }
    for (const path of input) {
        draw(grid, path, -MIN_X);
    }
    let sum = 0;
    while (sand(grid, offset)) {
        // console.log(grid.map((g) => g.join('')).join('\n'));
        sum++;
    }
    return sum;
}

export function part2() {
    const input = getInput();
    input.push([
        [0, Math.max(...input.flat().map((n) => n[1])) + 2],
        [1000, Math.max(...input.flat().map((n) => n[1])) + 2],
    ]);
    const MAX_X = Math.max(...input.flat().map((n) => n[0])) + 1;
    const MAX_Y = Math.max(...input.flat().map((n) => n[1])) + 1;

    const grid = new Array(MAX_Y);
    for (let y = 0; y < MAX_Y; y++) {
        grid[y] = new Array(MAX_X).fill('.');
    }
    for (const path of input) {
        draw(grid, path, 0);
    }
    let sum = 0;
    while (sand(grid, 500)) {
        // console.log(grid.map((g) => g.join('')).join('\n'));
        sum++;
    }
    return sum;
}

if (import.meta.main) {
    settings.test = true;
    const test1 = part1();
    console.log('Test Part 1:\n', test1);
    console.assert(test1 === tests.part1, `Expected ${tests.part1}`);
    const test2 = part2();
    console.log('Test Part 2:\n', test2);
    console.assert(test2 === tests.part2, `Expected ${tests.part2}`);
    console.log();
    settings.test = false;
    console.log('Run Part 1:\n', part1());
    console.log('Run Part 2:\n', part2());
}
