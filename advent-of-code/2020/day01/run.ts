export const tests = { part1: 514579, part2: 241861950 };
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
        .map((e) => parseInt(e));
}

export function part1() {
    const input = getInput();

    for (let i = 0, len = input.length; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (input[i] + input[j] === 2020) {
                return input[i] * input[j];
            }
        }
    }

    return null;
}

export function part2() {
    const input = getInput();

    for (let i = 0, len = input.length; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            for (let k = j + 1; k < len; k++) {
                if (input[i] + input[j] + input[k] === 2020) {
                    return input[i] * input[j] * input[k];
                }
            }
        }
    }

    return null;
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
