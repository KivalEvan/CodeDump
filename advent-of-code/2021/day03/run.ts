export const tests = { part1: null, part2: null };
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

    let gammaRate: number | string = '';
    let epsilonRate = 0;

    for (let i = 0; i < input[0].length; i++) {
        const bit0 = input.filter((e) => e[i] === '0').length;
        const bit1 = input.length - bit0;
        gammaRate += bit0 > bit1 ? '0' : '1';
    }

    gammaRate = parseInt(gammaRate, 2);
    epsilonRate = ~gammaRate & 0xfff;

    const total = gammaRate * epsilonRate;
    return total;
}

export function part2() {
    const input = getInput();

    let oxygenRate = 0;
    let co2Rate = 0;

    let check = input;
    for (let i = 0; i < input[0].length; i++) {
        if (check.length === 1) {
            break;
        }
        const bit = {
            0: check.filter((e) => e[i] === '0').length,
            1: check.filter((e) => e[i] === '1').length,
        };
        if (bit[0] === bit[1]) {
            check = check.filter((e) => e[i] === '1');
        }
        if (bit[0] > bit[1]) {
            check = check.filter((e) => e[i] === '0');
        } else {
            check = check.filter((e) => e[i] === '1');
        }
    }
    oxygenRate = parseInt(check.find((e) => e[input[0].length - 1] === '1')!, 2);

    check = input;
    for (let i = 0; i < input[0].length; i++) {
        if (check.length === 1) {
            break;
        }
        const bit = {
            0: check.filter((e) => e[i] === '0').length,
            1: check.filter((e) => e[i] === '1').length,
        };
        if (bit[0] === bit[1]) {
            check = check.filter((e) => e[i] === '0');
        }
        if (bit[0] > bit[1]) {
            check = check.filter((e) => e[i] === '1');
        } else {
            check = check.filter((e) => e[i] === '0');
        }
    }
    co2Rate = parseInt(check.find((e) => e[input[0].length - 1] === '0')!, 2);
    const total = oxygenRate * co2Rate;
    return total;
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
