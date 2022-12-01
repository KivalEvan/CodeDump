export const tests = { part1: 2, part2: 2 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path + (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt')
    ).replace('\r', '');
    return input
        .split('\n')
        .filter((e) => e !== '')
        .map((e) => e.toLowerCase());
}

export function part1() {
    const input = getInput();
    let size = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        let vowel = 0;
        let double = false;
        for (let j = 0, l = input[i].length; j < l; j++) {
            if (input[i][j].match(/[aeiou]/)) {
                vowel++;
            }
            if (j > 0 && input[i][j - 1] === input[i][j]) {
                double = true;
            }
        }
        if (vowel >= 3 && double && !input[i].match(/((ab)|(cd)|(pq)|(xy))/)) {
            size++;
        }
    }

    return size;
}

export function part2() {
    const input = getInput(true);
    // this is truly big brain moment
    let size = 0;
    for (let i = 0, len = input.length; i < len; i++) {
        let pairTwice = false;
        let pairWithMiddle = false;
        for (let j = 0, l = input[i].length; j < l; j++) {
            if (j > 0) {
                if (input[i].split(input[i][j - 1] + input[i][j]).length > 2) {
                    pairTwice = true;
                }
            }
            if (j > 1 && input[i][j - 2] === input[i][j]) {
                pairWithMiddle = true;
            }
        }
        if (pairTwice && pairWithMiddle) {
            size++;
        }
    }

    return size;
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
