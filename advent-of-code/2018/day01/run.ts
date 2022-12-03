export const tests = { part1: 0, part2: 14 };
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
    let frequency = 0;
    for (const f of input) {
        if (f[0] === '+') {
            frequency += parseInt(f.slice(1));
        }
        if (f[0] === '-') {
            frequency -= parseInt(f.slice(1));
        }
    }

    return frequency;
}

export function part2() {
    const input = getInput(true);
    let frequency = 0;
    const seen = [];
    let find;
    while (typeof find !== 'number') {
        for (const f of input) {
            if (f[0] === '+') {
                frequency += parseInt(f.slice(1));
            }
            if (f[0] === '-') {
                frequency -= parseInt(f.slice(1));
            }
            find = seen.find((e) => e === frequency);
            if (typeof find === 'number') {
                return find;
            }
            seen.push(frequency);
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
