export const tests = { part1: 7, part2: 19 };
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

function getDestination(input: string, length: number) {
    let i = 0;
    let skip = false;
    while (!skip) {
        skip = true;
        const str = input.substring(i, i++ + length);
        const set = new Set<string>();
        for (const c of str) {
            if (set.has(c)) {
                skip = false;
                break;
            }
            set.add(c);
        }
        if (skip) break;
    }
    return i + length - 1;
}

export function part1() {
    const input = getInput();
    return getDestination(input, 4);
}

export function part2() {
    const input = getInput();
    return getDestination(input, 14);
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
