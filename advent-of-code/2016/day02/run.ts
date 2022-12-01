export const tests = { part1: '1985', part2: '5DB3' };
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
    const keypad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];

    let key = '';
    for (const line of input) {
        const position = [1, 1];
        for (const s of line) {
            switch (s) {
                case 'U':
                    position[0] = Math.max(--position[0], 0);
                    break;
                case 'D':
                    position[0] = Math.min(++position[0], 2);
                    break;
                case 'L':
                    position[1] = Math.max(--position[1], 0);
                    break;
                case 'R':
                    position[1] = Math.min(++position[1], 2);
                    break;
            }
        }
        key += keypad[position[0]][position[1]].toString();
    }

    return key;
}

export function part2() {
    const input = getInput();
    const keypad = [
        [null, null, 1, null, null],
        [null, 2, 3, 4, null],
        [5, 6, 7, 8, 9],
        [null, 'A', 'B', 'C', null],
        [null, null, 'D', null, null],
    ];

    let key = '';
    const position = [2, 0];
    for (const line of input) {
        for (const s of line) {
            switch (s) {
                case 'U':
                    if (position[0] - 1 >= 0 && keypad[position[0] - 1][position[1]] != null) {
                        position[0]--;
                    }
                    break;
                case 'D':
                    if (position[0] + 1 <= 4 && keypad[position[0] + 1][position[1]] != null) {
                        position[0]++;
                    }
                    break;
                case 'L':
                    if (position[1] - 1 >= 0 && keypad[position[0]][position[1] - 1] != null) {
                        position[1]--;
                    }
                    break;
                case 'R':
                    if (position[1] + 1 <= 4 && keypad[position[0]][position[1] + 1] != null) {
                        position[1]++;
                    }
                    break;
            }
        }
        key += keypad[position[0]][position[1]]!.toString();
    }

    return key;
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
