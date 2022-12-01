export const tests = { part1: null, part2: null };
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
        .map((e) => parseInt(e));
}

export const part1 = () => {
    const input = getInput();

    let current = input[0];
    let largerThanPreviousCount = 0;
    for (let i = 1, len = input.length; i < len; i++) {
        if (current < input[i]) {
            largerThanPreviousCount++;
        }
        current = input[i];
    }

    return largerThanPreviousCount;
};

export const part2 = () => {
    const input = getInput();

    let current1 = input[0];
    let current2 = input[1];
    let current3 = input[2];
    let sum = current1 + current2 + current3;
    let largerThanPreviousCount = 0;
    for (let i = 1, len = input.length - 2; i < len; i++) {
        current1 = input[i];
        current2 = input[i + 1];
        current3 = input[i + 2];
        if (sum < current1 + current2 + current3) {
            largerThanPreviousCount++;
        }
        sum = current1 + current2 + current3;
    }

    return largerThanPreviousCount;
};

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
