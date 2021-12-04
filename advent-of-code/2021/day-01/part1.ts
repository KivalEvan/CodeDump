const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput
    .split('\r\n')
    .filter((e) => e !== '')
    .map((e) => parseInt(e));

let current = parsed[0];
let largerThanPreviousCount = 0;
for (let i = 1, len = parsed.length; i < len; i++) {
    if (current < parsed[i]) {
        largerThanPreviousCount++;
    }
    current = parsed[i];
}

console.log(largerThanPreviousCount);
