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

export function part1() {
    const input = getInput();
    let i = 0;
    for (let skip = true, len = input.length; i < len - 4 && skip; i++) {
        skip = false;
        const str = input.substring(i, i + 4);
        const key: { [key: string]: number } = {};
        for (const c of str) {
            key[c] ??= 0;
            key[c]++;
        }
        for (const k in key) {
            if (key[k] > 1) {
                skip = true;
                continue;
            }
        }
    }
    return i + 3;
}

export function part2() {
    const input = getInput();
    let i = 0;
    for (let skip = true, len = input.length; i < len - 14 && skip; i++) {
        skip = false;
        const str = input.substring(i, i + 14);
        const key: { [key: string]: number } = {};
        for (const c of str) {
            key[c] ??= 0;
            key[c]++;
        }
        for (const k in key) {
            if (key[k] > 1) {
                skip = true;
                break;
            }
        }
    }
    return i + 13;
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
