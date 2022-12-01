export const tests = { part1: -3, part2: 5 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path + (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt')
    ).replace('\r', '');
    return input;
}

export function part1() {
    const input = getInput();
    let floor = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        if (input[i] === '(') {
            floor++;
        }
        if (input[i] === ')') {
            floor--;
        }
    }

    return floor;
}

export function part2() {
    const input = getInput(true);
    let floor = 0;
    for (let i = 0, index = null, len = input.length; i < len; i++) {
        if (input[i] === '(') {
            floor++;
        }
        if (input[i] === ')') {
            floor--;
        }
        if (index === null && floor < 0) {
            index = i + 1;
            return index;
        }
    }
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
