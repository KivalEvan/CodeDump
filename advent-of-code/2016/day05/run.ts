import { crypto } from 'https://deno.land/std@0.167.0/crypto/mod.ts';
export const tests = { part1: '18f47a30', part2: '05ace8e3' };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path + (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt')
    ).replace('\r', '');
    return input;
}

const encoder = new TextEncoder();

const createMd5Hash = (data: string) => {
    const md5Value = new Uint8Array(crypto.subtle.digestSync('MD5', encoder.encode(data)));
    // convert from bin to hex
    const response = Array.from(md5Value)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return response;
};

export function part1() {
    const input = getInput();
    let i = -1;
    let str;
    let password = '';
    let index = 0;
    do {
        str = createMd5Hash(`${input}${++i}`);
        if (str.substring(0, 5) === '00000') {
            index++;
            password += str.substring(5, 6);
            // console.log(i, str, password);
        }
    } while (index !== 8);

    return password;
}

export function part2() {
    const input = getInput();
    let i = -1;
    let str;
    const password = new Array(8).fill('0');
    const used: string[] = [];
    let index = 0;
    do {
        str = createMd5Hash(`${input}${++i}`);
        if (
            str.substring(0, 5) === '00000' &&
            str.substring(5, 6).match(/[0-7]/) &&
            !used.includes(str.substring(5, 6))
        ) {
            index++;
            password[parseInt(str.substring(5, 6))] = str.substring(6, 7);
            used.push(str.substring(5, 6));
            // console.log(i, str, password.join(''));
        }
    } while (index !== 8);

    return password.join('');
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
