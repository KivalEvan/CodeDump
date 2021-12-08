const startTime = performance.now();
const input = (await Deno.readTextFile('input.txt'))
    .trim()
    .split(',')
    .map((n) => parseInt(n));

const maxH = Math.max(...input);

let min = Number.MAX_SAFE_INTEGER;
for (let h = maxH; h >= 0; h--) {
    min = Math.min(
        min,
        input.reduce((t, c) => t + Math.abs(c - h), 0)
    );
}
console.log(min);

const endTime = performance.now() - startTime;
console.log('time taken', endTime);
