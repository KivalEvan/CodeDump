export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput.split('\r\n').filter((e) => e !== '');

    let gammaRate: number | string = '';
    let epsilonRate = 0;

    for (let i = 0; i < parsed[0].length; i++) {
        const bit0 = parsed.filter((e) => e[i] === '0').length;
        const bit1 = parsed.length - bit0;
        gammaRate += bit0 > bit1 ? '0' : '1';
    }

    gammaRate = parseInt(gammaRate, 2);
    epsilonRate = ~gammaRate & 0xfff;

    const total = gammaRate * epsilonRate;
    const runTime = performance.now() - startTime;
    return [total, runTime];
};

export const part2 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput.split('\r\n').filter((e) => e !== '');

    let oxygenRate: number;
    let co2Rate: number;

    let check = parsed;
    for (let i = 0; i < parsed[0].length; i++) {
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
    oxygenRate = parseInt(check.find((e) => e[parsed[0].length - 1] === '1')!, 2);

    check = parsed;
    for (let i = 0; i < parsed[0].length; i++) {
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
    co2Rate = parseInt(check.find((e) => e[parsed[0].length - 1] === '0')!, 2);
    const total = oxygenRate * co2Rate;
    const runTime = performance.now() - startTime;
    return [total, runTime];
};
