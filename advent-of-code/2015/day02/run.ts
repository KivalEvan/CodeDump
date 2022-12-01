export const tests = { part1: 43, part2: 14 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path + (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt')
    ).replace('\r', '');
    return input
        .split('\n')
        .filter((e) => e !== '')
        .map((e) => e.split('x').map((x) => parseInt(x)));
}

export function part1() {
    const input = getInput();
    let size = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        const lw = input[i][0] * input[i][1];
        const wh = input[i][1] * input[i][2];
        const hl = input[i][2] * input[i][0];
        size += 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl);
    }

    return size;
}

export function part2() {
    const input = getInput().map((e) => e.sort((a, b) => a - b));
    let length = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        const shortest1 = input[i][0];
        const shortest2 = input[i][1];
        const wrap = shortest1 + shortest1 + shortest2 + shortest2;
        const bow = input[i][0] * input[i][1] * input[i][2];
        length += wrap + bow;
    }

    return length;
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
