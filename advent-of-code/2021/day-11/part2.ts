const startTime = performance.now();
const octopus = (await Deno.readTextFile('input.txt'))
    .trim()
    .split('\r\n')
    .filter((s) => s !== '')
    .map((n) => n.split('').map((s) => parseInt(s)));

const maxX = octopus[0].length;
const maxY = octopus.length;

const safeAdd = (x: number, y: number) => {
    if (typeof octopus[y]?.[x] === 'number') {
        if (++octopus[y][x] === 10) {
            giveEnergy(x, y);
        }
    }
};

const giveEnergy = (x: number, y: number) => {
    safeAdd(x + 1, y);
    safeAdd(x - 1, y);
    safeAdd(x, y + 1);
    safeAdd(x, y - 1);
    safeAdd(x + 1, y + 1);
    safeAdd(x + 1, y - 1);
    safeAdd(x - 1, y + 1);
    safeAdd(x - 1, y - 1);
};

const nextStep = () => {
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            if (++octopus[y][x] === 10) {
                giveEnergy(x, y);
            }
        }
    }
};

let step = 0;
while (true) {
    step++;
    nextStep();
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            if (octopus[y][x] > 9) {
                octopus[y][x] = 0;
            }
        }
    }
    if (octopus.every((y) => y.every((n) => n === 0))) {
        console.log(step);
        break;
    }
}

const endTime = performance.now() - startTime;
console.log('time taken', endTime);
