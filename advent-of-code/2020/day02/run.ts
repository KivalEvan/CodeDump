export const tests = { part1: 2, part2: 1 };
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
        .map((s) => {
            const c: any = s.split(':');
            c[0] = c[0].split(' ');
            c[0][0] = c[0][0].split('-').map((n: string) => parseInt(n));
            return c.flat() as [[number, number], string, string];
        });
}

export function part1() {
    const input = getInput();

    let valid = 0;

    for (const inp of input) {
        const range = inp[0];
        const letter = inp[1];
        const password = inp[2];

        let i = 0;
        for (const c of password) {
            if (letter.includes(c)) {
                i++;
            }
        }
        if (i >= range[0] && i <= range[1]) {
            valid++;
        }
    }

    return valid;
}

export function part2() {
    const input = getInput();

    let valid = 0;

    for (const inp of input) {
        const range = inp[0];
        const letter = inp[1];
        const password = inp[2];
        const arr = [password.at(range[0]), password.at(range[1])];
        if (!arr.every((c) => c === letter) && arr.some((c) => c === letter)) {
            valid++;
        }
    }

    return valid;
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
