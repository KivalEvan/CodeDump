const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((s) => s !== '');

let room: string[] = [];
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
        console.log(result, roomNum);
    }
}
