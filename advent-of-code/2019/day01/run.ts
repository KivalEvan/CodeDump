export const tests = { part1: 33583, part2: 50346 };
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
        .map((s) => parseInt(s));
}

export function part1() {
    const input = getInput();
    return input.reduce((t, n) => t + Math.floor(n / 3) - 2, 0);
}

export function part2() {
    const input = getInput();
    const recursive = (n: number): number => {
        if (n === 0) {
            return 0;
        }
        return n + recursive(Math.max(Math.floor(n / 3) - 2, 0));
    };
    return input.reduce((t, n) => t - n + recursive(n), 0);
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
