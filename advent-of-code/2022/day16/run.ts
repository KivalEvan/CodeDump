export const tests = { part1: 1651, part2: null };
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
        .map((str) => str.split('; '))
        .reduce((p: { [key: string]: { flow: number; tunnel: string[] } }, c) => {
            const a = c[0].slice(6).split(' has flow rate=');
            p[a[0]] = {
                flow: parseInt(a[1]),
                tunnel: c[1]
                    .slice(c[1].indexOf('valve'))
                    .replace(/valves? /, '')
                    .split(', '),
            };
            return p;
        }, {});
}

export function part1() {
    const input = getInput();
    // console.log(input);
    return;
}

export function part2() {
    const input = getInput();
    return;
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
