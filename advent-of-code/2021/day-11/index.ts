export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const octopus = fileInput
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

    let flashed = 0;
    for (let step = 0; step < 100; step++) {
        nextStep();
        // find whoever boutta flashed
        for (let y = 0; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                if (octopus[y][x] > 9) {
                    octopus[y][x] = 0;
                    flashed++;
                }
            }
        }
    }

    const runTime = performance.now() - startTime;
    return [flashed, runTime];
};

export const part2 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const octopus = fileInput
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
            break;
        }
    }

    const runTime = performance.now() - startTime;
    return [step, runTime];
};
