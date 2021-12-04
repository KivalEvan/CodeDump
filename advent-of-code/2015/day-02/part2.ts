const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput
    .split('\r\n')
    .filter((e) => e !== '')
    .map((e) =>
        e
            .split('x')
            .map((x) => parseInt(x))
            .sort((a, b) => a - b)
    );
let length = 0;
for (let i = 0, len = parsed.length; i < len; i++) {
    const shortest1 = parsed[i][0];
    const shortest2 = parsed[i][1];
    const wrap = shortest1 + shortest1 + shortest2 + shortest2;
    const bow = parsed[i][0] * parsed[i][1] * parsed[i][2];
    length += wrap + bow;
}

console.log(length);
