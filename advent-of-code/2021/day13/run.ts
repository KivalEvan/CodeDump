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
        .filter((s) => s !== '');
}

export function part1() {
    const parsed = getInput();

    const point = parsed.filter((n) => n.includes(',')).map((n) =>
        n.split(',').map((m) => parseInt(m))
    );
    let maxX = Math.max(...point.map((n) => n[0])) + 1;
    let maxY = Math.max(...point.map((n) => n[1])) + 1;
    const instruction = parsed.filter((n) => !n.includes(',')).map((s) =>
        s.match(/\w=\d+/)![0].split('=')
    );

    const plot: boolean[][] = [];
    for (let y = 0; y < maxY; y++) {
        plot.push(new Array(maxX).fill(false));
    }
    point.forEach((p) => (plot[p[1]][p[0]] = true));

    let first = true;
    for (const ins of instruction) {
        if (ins[0] === 'x') {
            const newSize = parseInt(ins[1]);
            for (let y = 0; y < maxY; y++) {
                for (let x = 1; x < maxX - newSize; x++) {
                    if (plot[y][newSize + x]) {
                        plot[y][newSize - x] = plot[y][newSize + x];
                    }
                }
            }
            maxX = newSize;
        }
        if (ins[0] === 'y') {
            const newSize = parseInt(ins[1]);
            for (let y = 1; y < maxY - newSize; y++) {
                for (let x = 0; x < maxX; x++) {
                    if (plot[newSize + y][x]) {
                        plot[newSize - y][x] = plot[newSize + y][x];
                    }
                }
            }
            maxY = newSize;
        }
        if (first) {
            first = false;
            let count = 0;
            for (let y = 0; y < maxY; y++) {
                for (let x = 0; x < maxX; x++) {
                    if (plot[y][x]) {
                        count++;
                    }
                }
            }
            return count;
        }
    }
    return 0;
}

export function part2() {
    const parsed = getInput();

    const point = parsed.filter((n) => n.includes(',')).map((n) =>
        n.split(',').map((m) => parseInt(m))
    );
    let maxX = Math.max(...point.map((n) => n[0])) + 1;
    let maxY = Math.max(...point.map((n) => n[1])) + 1;
    const instruction = parsed.filter((n) => !n.includes(',')).map((s) =>
        s.match(/\w=\d+/)![0].split('=')
    );

    const plot: boolean[][] = [];
    for (let y = 0; y < maxY; y++) {
        plot.push(new Array(maxX).fill(false));
    }
    point.forEach((p) => (plot[p[1]][p[0]] = true));

    for (const ins of instruction) {
        if (ins[0] === 'x') {
            const newSize = parseInt(ins[1]);
            for (let y = 0; y < maxY; y++) {
                for (let x = 1; x < maxX - newSize; x++) {
                    if (plot[y][newSize + x]) {
                        plot[y][newSize - x] = plot[y][newSize + x];
                    }
                }
            }
            maxX = newSize;
        }
        if (ins[0] === 'y') {
            const newSize = parseInt(ins[1]);
            for (let y = 1; y < maxY - newSize; y++) {
                for (let x = 0; x < maxX; x++) {
                    if (plot[newSize + y][x]) {
                        plot[newSize - y][x] = plot[newSize + y][x];
                    }
                }
            }
            maxY = newSize;
        }
    }
    const text: string[] = [];
    for (let y = 0; y < maxY; y++) {
        let str = '';
        for (let x = 0; x < maxX; x++) {
            str += plot[y][x] ? '#' : ' ';
        }
        text.push(str);
    }
    return text;
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
