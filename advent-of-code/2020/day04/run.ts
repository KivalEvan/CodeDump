export const tests = { part1: 2, part2: 2 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n\n').filter((e) => e !== '');
}

export function part1() {
    const input = getInput();

    let count = 0;

    const entry = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    for (const inp of input) {
        if (entry.every((e) => new RegExp(`${e}:`).test(inp))) {
            count++;
        }
    }

    return count;
}

export function part2() {
    const input = getInput();

    let count = 0;

    const entry = [
        '^byr:(19[2-9][0-9]|200[0-2])$',
        '^iyr:(201[0-9]|2020)$',
        '^eyr:(202[0-9]|2030)$',
        '^hgt:((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)$',
        '^hcl:#[0-9a-f]{6}$',
        '^ecl:(amb|blu|brn|gry|grn|hzl|oth)$',
        '^pid:[0-9]{9}$',
    ];

    for (const inp of input) {
        const i = inp.split(/\s+/);
        if (entry.every((e) => i.some((s) => new RegExp(e).test(s)))) {
            count++;
        }
    }

    return count;
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
