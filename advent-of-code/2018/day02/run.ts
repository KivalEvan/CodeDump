export const tests = { part1: 12, part2: 'fgij' };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').filter((e) => e !== '');
}

export function part1() {
    const input = getInput();
    let count2 = 0;
    let count3 = 0;
    for (const box of input) {
        const letter: { [key: string]: number } = {};
        for (const l of box) {
            letter[l] = letter[l] ? ++letter[l] : 1;
        }
        if (Object.values(letter).find((l) => l === 2)) {
            count2++;
        }
        if (Object.values(letter).find((l) => l === 3)) {
            count3++;
        }
    }

    return count2 * count3;
}

export function part2() {
    const input = getInput(true);
    const maxSize = input[0].length;
    const boxList = [];
    for (const box of input) {
        const letter: { [key: string]: number } = {};
        for (const l of box) {
            letter[l] = letter[l] ? ++letter[l] : 1;
        }
        if (
            Object.values(letter).find((l) => l === 2) ||
            Object.values(letter).find((l) => l === 3)
        ) {
            boxList.push(box);
        }
    }

    for (let i = 0, len = boxList.length; i < len; i++) {
        for (let j = i + 1, incorrect = 0; j < len; j++) {
            let letter = '';
            for (let k = 0; k < maxSize && incorrect < 2; k++) {
                if (boxList[i][k] !== boxList[j][k]) {
                    incorrect++;
                } else {
                    letter += boxList[i][k];
                }
            }
            if (incorrect < 2) {
                return letter;
            }
            incorrect = 0;
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
