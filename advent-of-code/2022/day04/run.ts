export const tests = { part1: 2, part2: 4 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').map((n) =>
        n.split(',').map((s) => s.split('-').map((x) => parseInt(x)))
    );
}

export function part1() {
    const input = getInput();
    let total = 0;
    for (const it of input) {
        const [left, right] = it;
        if (
            (left[0] <= right[0] && left[1] >= right[1]) ||
            (right[0] <= left[0] && right[1] >= left[1])
        ) {
            total++;
        }
    }
    return total;
}

export function part2() {
    const input = getInput();
    let total = 0;
    for (const it of input) {
        const [left, right] = it;
        if (
            (left[0] <= right[0] && left[1] >= right[1]) ||
            (right[0] <= left[0] && right[1] >= left[1]) ||
            (left[0] >= right[0] && left[0] <= right[1]) ||
            (left[1] >= right[0] && left[1] <= right[1])
        ) {
            total++;
        }
    }
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
