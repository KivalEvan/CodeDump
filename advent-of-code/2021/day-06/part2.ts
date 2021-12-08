const startTime = performance.now();
const input = (await Deno.readTextFile('input.txt'))
    .trim()
    .split(',')
    .map((n) => parseInt(n));

const count: { [key: number]: number } = {
    0: input.filter((n) => n === 0).length,
    1: input.filter((n) => n === 1).length,
    2: input.filter((n) => n === 2).length,
    3: input.filter((n) => n === 3).length,
    4: input.filter((n) => n === 4).length,
    5: input.filter((n) => n === 5).length,
    6: input.filter((n) => n === 6).length,
    7: 0,
    8: 0,
};

for (let day = 0; day < 256; day++) {
    count[(7 + day) % 9] += count[day % 9];
}

console.log(Object.values(count).reduce((t, n) => t + n, 0));
const endTime = performance.now() - startTime;
console.log(endTime);
