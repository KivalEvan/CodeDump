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

for (const line of input) {
    possible +=
        line[0] + line[1] > line[2] &&
        line[0] + line[2] > line[1] &&
        line[1] + line[2] > line[0]
            ? 1
            : 0;
}

console.log(possible);
