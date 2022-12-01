export const tests = { part1: 'easter', part2: 'advent' };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path + (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt')
    ).replace('\r', '');
    return input.split('\n').filter((s) => s !== '');
}

export function part1() {
    const input = getInput();
    let output = '';
    for (let i = 0, len = input[0].length; i < len; i++) {
        const letter: { [key: string]: number } = {};
        for (const line of input) {
            letter[line[i]] = typeof letter[line[i]] !== 'undefined' ? ++letter[line[i]] : 1;
        }
        output += Object.entries(letter).sort((a, b) => b[1] - a[1])[0][0];
    }
    return output;
}

export function part2() {
    const input = getInput();
    let output = '';
    for (let i = 0, len = input[0].length; i < len; i++) {
        const letter: { [key: string]: number } = {};
        for (const line of input) {
            letter[line[i]] = typeof letter[line[i]] !== 'undefined' ? ++letter[line[i]] : 1;
        }
        output += Object.entries(letter).sort((a, b) => b[1] - a[1])[Object.values(letter).length - 1][0];
    }
    return output;
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
