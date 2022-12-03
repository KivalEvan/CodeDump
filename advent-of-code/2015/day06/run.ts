export const tests = { part1: 998996, part2: 2000001 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input
        .split('\n')
        .filter((e) => e !== '')
        .map((e) => e.toLowerCase().split(' '));
}

export function part1() {
    const input = getInput();
    const grid = [];
    for (let x = 0; x < 1000; x++) {
        grid.push(new Array(1000).fill(false));
    }

    for (let i = 0; i < input.length; i++) {
        if (input[i][0] === 'toggle') {
            const [startX, startY] = input[i][1].split(',').map((e) => parseInt(e));
            const [endX, endY] = input[i][3].split(',').map((e) => parseInt(e));
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    grid[x][y] = !grid[x][y];
                }
            }
        }
        if (input[i][0] === 'turn') {
            const s = input[i][1] === 'on';
            const [startX, startY] = input[i][2].split(',').map((e) => parseInt(e));
            const [endX, endY] = input[i][4].split(',').map((e) => parseInt(e));
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

    return lit;
}

export function part2() {
    const input = getInput(true);
    const grid = [];
    for (let x = 0; x < 1000; x++) {
        grid.push(new Array(1000).fill(0));
    }

    for (let i = 0; i < input.length; i++) {
        if (input[i][0] === 'toggle') {
            const [startX, startY] = input[i][1].split(',').map((e) => parseInt(e));
            const [endX, endY] = input[i][3].split(',').map((e) => parseInt(e));
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    grid[x][y] += 2;
                }
            }
        }
        if (input[i][0] === 'turn') {
            const s = input[i][1] === 'on' ? 1 : -1;
            const [startX, startY] = input[i][2].split(',').map((e) => parseInt(e));
            const [endX, endY] = input[i][4].split(',').map((e) => parseInt(e));
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    grid[x][y] += s;
                    grid[x][y] = Math.max(grid[x][y], 0);
                }
            }
        }
    }

    let lit = 0;
    for (let x = 0; x < 1000; x++) {
        for (let y = 0; y < 1000; y++) {
            if (grid[x][y]) {
                lit += grid[x][y];
            }
        }
    }

    return lit;
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
