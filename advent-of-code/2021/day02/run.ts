export const tests = { part1: null, part2: null };
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
        .map((e) => e.split(' '));
}

export function part1() {
    const input = getInput();

    let horizontal = 0;
    let depth = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        if (input[i][0] === 'forward') {
            horizontal += parseInt(input[i][1]);
        }
        if (input[i][0] === 'down') {
            depth += parseInt(input[i][1]);
        }
        if (input[i][0] === 'up') {
            depth -= parseInt(input[i][1]);
        }
    }

    const total = horizontal * depth;
    return total;
}

export function part2() {
    const input = getInput();

    let horizontal = 0;
    let aim = 0;
    let depth = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        if (input[i][0] === 'forward') {
            horizontal += parseInt(input[i][1]);
            depth += aim * parseInt(input[i][1]);
        }
        if (input[i][0] === 'down') {
            aim += parseInt(input[i][1]);
        }
        if (input[i][0] === 'up') {
            aim -= parseInt(input[i][1]);
        }
    }

    const total = horizontal * depth;
    return total;
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
