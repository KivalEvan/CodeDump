export const tests = { part1: 7, part2: 336 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path + (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt')
    ).replace('\r', '');
    return input.split('\n').filter((e) => e !== '');
}

export function part1() {
    const input = getInput();

    let x = 0 - 3;
    let count = 0;
    for (const row of input) {
        x += 3;
        if (row[x % row.length] === '#') {
            count++;
        }
    }

    return count;
}

export function part2() {
    const input = getInput();

    const arr: number[] = [];
    const condition: [number, number][] = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];
    for (const c of condition) {
        let count = 0;
        for (let row = c[1], column = c[0], len = input.length; row < len; column += c[0], row += c[1]) {
            if (input[row][column % input[row].length] === '#') {
                count++;
            }
        }
        arr.push(count);
    }

    return arr.reduce((t, n) => t * n, 1);
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
