export const tests = { part1: null, part2: null };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input
        .trim()
        .split('\n')
        .filter((s) => s !== '')
        .map((n) => n.split('').map((s) => parseInt(s)));
}

export function part1() {
    const octopus = getInput();

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

    return flashed;
}

export function part2() {
    const octopus = getInput();

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

    return step;
}

if (import.meta.main) {
    settings.test = true;
    const test1 = part1();
    console.log('Test Part 1:\n', test1);
    console.assert(test1 === tests.part1, `Expected ${tests.part1}`);
    const test2 = part2();
    console.log('Test Part 2:\n', test2);
    console.assert(test2 === tests.part2, `Expected ${tests.part2}`);
    console.log();
    settings.test = false;
    console.log('Run Part 1:\n', part1());
    console.log('Run Part 2:\n', part2());
}
