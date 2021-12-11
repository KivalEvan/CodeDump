const startTime = performance.now();
const input = (await Deno.readTextFile('input.txt'))
    .trim()
    .split('\r\n')
    .filter((s) => s !== '')
    .map((n) => n.split('').map((s) => parseInt(s)));

const maxW = input[0].length;
const maxH = input.length;

let count = 0;
for (let h = 0; h < maxH; h++) {
    for (let w = 0; w < maxW; w++) {
        if (
            input[h][w] < (input[h - 1]?.[w] ?? 9) && // dont mind if i do
            input[h][w] < (input[h + 1]?.[w] ?? 9) &&
            input[h][w] < (input[h][w - 1] ?? 9) &&
            input[h][w] < (input[h][w + 1] ?? 9)
        ) {
            count += input[h][w] + 1;
        }
    }
}
console.log(count);

const endTime = performance.now() - startTime;
console.log('time taken', endTime);
