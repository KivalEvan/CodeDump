const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((e) => e !== '');

let count2 = 0;
let count3 = 0;
for (const box of input) {
    const letter: { [key: string]: number } = {};
    for (const l of box) {
        letter[l] = letter[l] ? ++letter[l] : 1;
    }
    if (Object.values(letter).find((l) => l === 2)) {
        count2++;
    }
    if (Object.values(letter).find((l) => l === 3)) {
        count3++;
    }
}

console.log(count2 * count3);
