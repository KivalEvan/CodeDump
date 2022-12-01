export const tests = { part1: 3, part2: 3 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path + (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt')
    ).replace('\r', '');
    return input
        .split('\n')
        .filter((e) => e !== '')
        .map((s) =>
            s
                .split(' ')
                .filter((e) => !e.match(/#\d+/) && e !== '@')
                .map((e) =>
                    e
                        .replace(':', '')
                        .split(/x|,/)
                        .map((n) => parseInt(n))
                )
        );
}

export function part1() {
    const input = getInput();
    const sizeX = Math.max(...input.map((s) => s[0][0] + s[1][0]));
    const point: { [key: number]: number } = {};

    for (const line of input) {
        for (let x = 0; x < line[1][0]; x++) {
            for (let y = 0; y < line[1][1]; y++) {
                const pos = (line[0][1] + y) * sizeX + line[0][0] + x;
                point[pos] = point[pos] ? ++point[pos] : 1;
            }
        }
    }

    return Object.values(point).filter((n) => n >= 2).length;
}

export function part2() {
    const input = getInput();
    const sizeX = Math.max(...input.map((s) => s[1][0] + s[2][0]));
    const point: { [key: number]: number } = {};

    for (const line of input) {
        for (let x = 0; x < line[2][0]; x++) {
            for (let y = 0; y < line[2][1]; y++) {
                const pos = (line[1][1] + y) * sizeX + line[1][0] + x;
                point[pos] = point[pos] ? ++point[pos] : 1;
            }
        }
    }

    for (const line of input) {
        let overlapped = false;
        for (let x = 0; x < line[2][0]; x++) {
            for (let y = 0; y < line[2][1]; y++) {
                const pos = (line[1][1] + y) * sizeX + line[1][0] + x;
                if (point[pos] > 1) {
                    overlapped = true;
                }
            }
        }
        if (!overlapped) {
            console.log(line);
        }
    }
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
