const startTime = performance.now();
const input = (await Deno.readTextFile('input.txt'))
    .trim()
    .split('\r\n')
    .filter((s) => s !== '')
    .map((n) => n.split('|').map((s) => s.trim().split(' ')));

let count = 0;
for (const line of input) {
    for (const d of line[1]) {
        if (d.length === 2) {
            count++;
        }
        if (d.length === 3) {
            count++;
        }
        if (d.length === 4) {
            count++;
        }
        if (d.length === 7) {
            count++;
        }
    }
}
console.log(count);

const endTime = performance.now() - startTime;
console.log('time taken', endTime);
