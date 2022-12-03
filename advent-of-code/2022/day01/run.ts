export const tests = { part1: 24000, part2: 45000 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n');
}

export function part1() {
    const input = getInput();
    const max = [];
    let current = 0;
    for (const entry of input) {
        if (entry) {
            current += parseInt(entry);
        } else {
            max.push(current);
            current = 0;
        }
    }
    return Math.max(...max);
}

export function part2() {
    const input = getInput();
    const max = [];
    let current = 0;
    for (const entry of input) {
        if (entry) {
            current += parseInt(entry);
        } else {
            max.push(current);
            current = 0;
        }
    }
    max.sort((a, b) => b - a);
    return max[0] + max[1] + max[2];
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
