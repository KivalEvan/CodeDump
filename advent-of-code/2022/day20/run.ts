export const tests = { part1: 3, part2: null };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
        (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').map((n) => {
        return { number: parseInt(n) };
    }).filter((n) => !isNaN(n.number));
}

function loopAround(n: number, max: number) {
    return (n === 0 ? max - 1 : n < 0 ? n + max - 1 : n > max ? n - max : n);
}

function sum(n: {number:number}[], arr: number[]) {
    const max = n.length;
    return arr.reduce((p, v) => p + n[v % max].number, 0)
}

export function part1() {
    const input = getInput();
    const mix = [...input];

    input.forEach((n) => {
        if (n.number) {
            const idx = mix.findIndex((m) => n === m);
            mix.splice(idx, 1);
            mix.splice(loopAround(idx + n.number, input.length), 0, n);
        }
    });

    const idx0 = mix.findIndex(n => !n.number)
    return sum(mix, [1000, 2000, 3000].map(n => n + idx0));
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
