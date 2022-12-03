export const tests = { part1: 1514, part2: null };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').filter((s) => s !== '');
}

export function part1() {
    const input = getInput();
    let sum = 0;
    const check = (l: string) => {
        const parsed = l.split('-');
        const encrypted = parsed.filter((s) => !s.match(/\d+/)).join('');
        const checksum = parsed.find((s) => s.match(/\d+/))?.match(/[a-z]+/)![0];
        const letter: { [key: string]: number } = {};

        for (const s of encrypted) {
            letter[s] = typeof letter[s] !== 'undefined' ? ++letter[s] : 1;
        }

        const entry = Object.entries(letter)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .sort((a, b) => b[1] - a[1]);
        const filtered = entry.filter((e) => e[1] >= entry[4][1]);

        for (const c of checksum!) {
            if (!filtered.map((f) => f[0]).includes(c)) {
                return;
            }
        }
        if (filtered.length === 5) {
            sum += parseInt(parsed.find((s) => s.match(/\d+/))!.match(/\d+/)![0]);
            return;
        }
        const filtered2 = filtered.map((f) => f[0]).join('');
        let checksumIndex = 0;
        for (const f of filtered2) {
            if (f === checksum![checksumIndex]) {
                checksumIndex++;
            }
        }
        if (checksumIndex === 5) {
            sum += parseInt(parsed.find((s) => s.match(/\d+/))!.match(/\d+/)![0]);
            return;
        }
    };

    for (const line of input) {
        check(line);
    }

    return sum;
}

export function part2() {
    const input = getInput();
    const room: string[] = [];
    const check = (l: string) => {
        const parsed = l.split('-');
        const encrypted = parsed.filter((s) => !s.match(/\d+/)).join('');
        const checksum = parsed.find((s) => s.match(/\d+/))?.match(/[a-z]+/)![0];
        const letter: { [key: string]: number } = {};

        for (const s of encrypted) {
            letter[s] = typeof letter[s] !== 'undefined' ? ++letter[s] : 1;
        }

        const entry = Object.entries(letter)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .sort((a, b) => b[1] - a[1]);
        const filtered = entry.filter((e) => e[1] >= entry[4][1]);

        for (const c of checksum!) {
            if (!filtered.map((f) => f[0]).includes(c)) {
                return;
            }
        }
        if (filtered.length === 5) {
            room.push(l);
            return;
        }
        const filtered2 = filtered.map((f) => f[0]).join('');
        let checksumIndex = 0;
        for (const f of filtered2) {
            if (f === checksum![checksumIndex]) {
                checksumIndex++;
            }
        }
        if (checksumIndex === 5) {
            room.push(l);
            return;
        }
    };

    for (const line of input) {
        check(line);
    }

    const caesarCipher = (str: string, shift: number) => {
        let result = '';
        let charCode = 0;

        for (let i = 0; i < str.length; i++) {
            if (str[i] === ' ') {
                str.charCodeAt(i);
                result += str[i];
                continue;
            }
            charCode = ((str.charCodeAt(i) - 97 + shift) % 26) + 97;
            result += String.fromCharCode(charCode);
        }
        return result;
    };

    for (const r of room) {
        const parsed = r.split('-');
        const encrypted = parsed.filter((s) => !s.match(/\d+/)).join(' ');
        const roomNum = parseInt(parsed.find((s) => s.match(/\d+/))?.match(/\d+/)![0]!);
        const result = caesarCipher(encrypted, roomNum);
        if (result.includes('north')) {
            return roomNum;
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
