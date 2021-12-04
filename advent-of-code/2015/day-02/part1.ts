const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput
    .split('\r\n')
    .filter((e) => e !== '')
    .map((e) => e.split('x').map((x) => parseInt(x)));

let size = 0;
for (let i = 0, len = parsed.length; i < len; i++) {
    const lw = parsed[i][0] * parsed[i][1];
    const wh = parsed[i][1] * parsed[i][2];
    const hl = parsed[i][2] * parsed[i][0];
    size += 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl);
}

console.log(size);
