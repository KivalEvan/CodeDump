const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((s) => s !== '');

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

console.log(key);
