const fish = (await Deno.readTextFile('input.txt'))
    .trim()
    .split(',')
    .map((n) => parseInt(n));

for (let day = 0; day < 80; day++) {
    for (let f = 0, len = fish.length; f < len; f++) {
        if (--fish[f] < 0) {
            fish[f] = 6;
            fish.push(8);
        }
    }
}

console.log(fish.length);
