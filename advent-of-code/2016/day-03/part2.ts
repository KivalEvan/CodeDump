const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((s) => s !== '')
    .map((s) =>
        s
            .trim()
            .split(/\s+/)
            .map((n) => parseInt(n))
    );

let possible = 0;

for (let i = 0, len = input.length / 3; i < len; i++) {
    for (let j = 0; j < 3; j++) {
        possible +=
            input[i * 3 + 0][j] + input[i * 3 + 1][j] > input[i * 3 + 2][j] &&
            input[i * 3 + 0][j] + input[i * 3 + 2][j] > input[i * 3 + 1][j] &&
            input[i * 3 + 1][j] + input[i * 3 + 2][j] > input[i * 3 + 0][j]
                ? 1
                : 0;
    }
}

console.log(possible);
