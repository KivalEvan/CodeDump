export const tests = { part1: 21, part2: 8 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').map((n) => n.split('').map((m) => parseInt(m)));
}

function crawl(
    input: number[][],
    x: number,
    y: number,
    maxX: number,
    maxY: number,
    crawlX: number,
    crawlY: number,
    direction: 'top' | 'bottom' | 'left' | 'right',
): boolean {
    switch (direction) {
        case 'top':
            while (crawlY !== 0) {
                if (input[y][x] <= input[--crawlY][x]) {
                    return false;
                }
            }
            break;
        case 'bottom':
            while (crawlY !== maxY) {
                if (input[y][x] <= input[++crawlY][x]) {
                    return false;
                }
            }
            break;
        case 'left':
            while (crawlX !== 0) {
                if (input[y][x] <= input[y][--crawlX]) {
                    return false;
                }
            }
            break;
        case 'right':
            while (crawlX !== maxX) {
                if (input[y][x] <= input[y][++crawlX]) {
                    return false;
                }
            }
            break;
    }
    return true;
}

function check(input: number[][], x: number, y: number, maxX: number, maxY: number) {
    return (
        crawl(input, x, y, maxX, maxY, x, y, 'top') ||
        crawl(input, x, y, maxX, maxY, x, y, 'bottom') ||
        crawl(input, x, y, maxX, maxY, x, y, 'left') ||
        crawl(input, x, y, maxX, maxY, x, y, 'right')
    );
}

export function part1() {
    const input = getInput();
    const MAX_Y = input.length,
        MAX_X = input[0].length;
    const MAX_Y_PAD = MAX_Y - 1,
        MAX_X_PAD = MAX_X - 1;
    let seen = MAX_Y * 2 + (MAX_X - 2) * 2;
    for (let y = 1; y < MAX_Y_PAD; y++) {
        for (let x = 1; x < MAX_X_PAD; x++) {
            if (check(input, x, y, MAX_X_PAD, MAX_Y_PAD)) {
                seen++;
            }
        }
    }
    return seen;
}

function crawlScore(
    input: number[][],
    x: number,
    y: number,
    maxX: number,
    maxY: number,
    crawlX: number,
    crawlY: number,
    direction: 'top' | 'bottom' | 'left' | 'right',
): number {
    let sum = 0;
    let dig = true;
    switch (direction) {
        case 'top':
            while (crawlY !== 0 && dig) {
                dig = input[y][x] > input[--crawlY][x];
                sum++;
            }
            break;
        case 'bottom':
            while (crawlY !== maxY - 1 && dig) {
                dig = input[y][x] > input[++crawlY][x];
                sum++;
            }
            break;
        case 'left':
            while (crawlX !== 0 && dig) {
                dig = input[y][x] > input[y][--crawlX];
                sum++;
            }
            break;
        case 'right':
            while (crawlX !== maxX - 1 && dig) {
                dig = input[y][x] > input[y][++crawlX];
                sum++;
            }
            break;
    }
    return sum;
}

function calculate(
    input: number[][],
    x: number,
    y: number,
    maxX: number,
    maxY: number,
) {
    return (
        crawlScore(input, x, y, maxX, maxY, x, y, 'top') *
        crawlScore(input, x, y, maxX, maxY, x, y, 'bottom') *
        crawlScore(input, x, y, maxX, maxY, x, y, 'left') *
        crawlScore(input, x, y, maxX, maxY, x, y, 'right')
    );
}

export function part2() {
    const input = getInput();
    const MAX_Y = input.length,
        MAX_X = input[0].length;
    const score: number[] = [];
    for (let y = 0; y < MAX_Y; y++) {
        for (let x = 0; x < MAX_X; x++) {
            score.push(calculate(input, x, y, MAX_X, MAX_Y));
        }
    }
    return Math.max(...score);
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
