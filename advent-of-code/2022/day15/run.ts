export const tests = { part1: 26, part2: 56000011 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').map((str) =>
        str.split(':').map((s) =>
            s
                .trim()
                .slice(s.indexOf('x'))
                .replace(/(x|y)?=?/g, '')
                .split(', ')
                .map(Number)
        )
    ) as [number, number][][];
}

export function part1() {
    const input = getInput();
    const mark = new Set<number>();
    const AT_Y = settings.test ? 10 : 2_000_000;
    for (const [sensor, beacon] of input) {
        const distance = Math.abs(beacon[0] - sensor[0]) +
            Math.abs(beacon[1] - sensor[1]);

        for (let y = 0; y < distance; y++) {
            if (sensor[1] - y === AT_Y) {
                for (let x = 0; x <= distance - y; x++) {
                    mark.add(sensor[0] + x);
                    mark.add(sensor[0] - x);
                }
                break;
            }
            if (sensor[1] + y === AT_Y) {
                for (let x = 0; x <= distance - y; x++) {
                    mark.add(sensor[0] + x);
                    mark.add(sensor[0] - x);
                }
                break;
            }
        }
    }
    const b = input.map((x) => x[1]).find((x) => x[1] === AT_Y);
    mark.delete(b![0]);
    // console.log(new Set(Array.from(mark).sort((a, b) => a - b)));
    return mark.size;
}

export function part2() {
    const input = getInput();
    const mark = new Set<number>();
    const MIN = 0;
    const MAX = 4_000_000;
    const coordinate = [0, 0];

    for (const [sensor, beacon] of input) {
        const distance = Math.abs(beacon[0] - sensor[0]) +
            Math.abs(beacon[1] - sensor[1]);

        for (let y = 0; y < distance; y++) {
            // if (sensor[1] - y === AT_Y) {
            //     for (let x = 0; x <= distance - y; x++) {
            //         mark.add(sensor[0] + x);
            //         mark.add(sensor[0] - x);
            //     }
            //     break;
            // }
            // if (sensor[1] + y === AT_Y) {
            //     for (let x = 0; x <= distance - y; x++) {
            //         mark.add(sensor[0] + x);
            //         mark.add(sensor[0] - x);
            //     }
            //     break;
            // }
        }
    }
    return coordinate[0] * MAX + coordinate[1];
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
