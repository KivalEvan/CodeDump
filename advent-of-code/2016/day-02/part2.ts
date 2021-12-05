const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((s) => s !== '');

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
                if (
                    position[0] - 1 >= 0 &&
                    keypad[position[0] - 1][position[1]] != null
                ) {
                    position[0]--;
                }
                break;
            case 'D':
                if (
                    position[0] + 1 <= 4 &&
                    keypad[position[0] + 1][position[1]] != null
                ) {
                    position[0]++;
                }
                break;
            case 'L':
                if (
                    position[1] - 1 >= 0 &&
                    keypad[position[0]][position[1] - 1] != null
                ) {
                    position[1]--;
                }
                break;
            case 'R':
                if (
                    position[1] + 1 <= 4 &&
                    keypad[position[0]][position[1] + 1] != null
                ) {
                    position[1]++;
                }
                break;
        }
    }
    key += keypad[position[0]][position[1]]!.toString();
}

console.log(key);
