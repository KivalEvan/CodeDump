export const tests = { part1: 4, part2: 3 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input;
}

export function part1() {
    const input = getInput();
    const delivered = [[0, 0]];
    let posX = 0;
    let posY = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        if (input[i] === '>') {
            posX++;
        }
        if (input[i] === '<') {
            posX--;
        }
        if (input[i] === '^') {
            posY++;
        }
        if (input[i] === 'v') {
            posY--;
        }
        if (!delivered.find((d) => d[0] === posX && d[1] === posY)) {
            delivered.push([posX, posY]);
        }
    }

    return delivered.length;
}

export function part2() {
    const input = getInput();
    const delivered = [[0, 0]];
    let posX = 0;
    let posY = 0;
    let posXr = 0;
    let posYr = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        if (input[i] === '>') {
            i % 2 === 0 ? posX++ : posXr++;
        }
        if (input[i] === '<') {
            i % 2 === 0 ? posX-- : posXr--;
        }
        if (input[i] === '^') {
            i % 2 === 0 ? posY-- : posYr--;
        }
        if (input[i] === 'v') {
            i % 2 === 0 ? posY++ : posYr++;
        }
        if (!delivered.find((d) => d[0] === posX && d[1] === posY)) {
            delivered.push([posX, posY]);
        }
        if (!delivered.find((d) => d[0] === posXr && d[1] === posYr)) {
            delivered.push([posXr, posYr]);
        }
    }

    return delivered.length;
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
