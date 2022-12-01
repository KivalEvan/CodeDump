export const tests = { part1: 0, part2: 6 };
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
        .filter((s) => s !== '')
        .map((s) =>
            s
                .trim()
                .split(/\s+/)
                .map((n) => parseInt(n))
        );
}

export function part1() {
    const input = getInput();
    let possible = 0;

    for (const line of input) {
        possible += line[0] + line[1] > line[2] && line[0] + line[2] > line[1] && line[1] + line[2] > line[0] ? 1 : 0;
    }

    return possible;
}

export function part2() {
    const input = getInput(true);
    let possible = 0;

    for (let i = 0, len = input.length / 3; i < len; i++) {
        for (let j = 0; j < 3; j++) {
            possible +=
                input[i * 3 + 0][j] + input[i * 3 + 1][j] > input[i * 3 + 2][j] &&
                input[i * 3 + 0][j] + input[i * 3 + 2][j] > input[i * 3 + 1][j] &&
                input[i * 3 + 1][j] + input[i * 3 + 2][j] > input[i * 3 + 0][j]
                    ? 1
                    : 0;
        }
    }

    return possible;
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
