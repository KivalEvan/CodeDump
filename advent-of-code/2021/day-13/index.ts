export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput
        .trim()
        .split('\r\n')
        .filter((s) => s !== '');

    const point = parsed
        .filter((n) => n.includes(','))
        .map((n) => n.split(',').map((m) => parseInt(m)));
    let maxX = Math.max(...point.map((n) => n[0])) + 1;
    let maxY = Math.max(...point.map((n) => n[1])) + 1;
    const instruction = parsed
        .filter((n) => !n.includes(','))
        .map((s) => s.match(/\w=\d+/)![0].split('='));

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
            const runTime = performance.now() - startTime;
            return [count, runTime];
        }
    }
    const runTime = performance.now() - startTime;
    return [0, runTime];
};

export const part2 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput
        .trim()
        .split('\r\n')
        .filter((s) => s !== '');

    const point = parsed
        .filter((n) => n.includes(','))
        .map((n) => n.split(',').map((m) => parseInt(m)));
    let maxX = Math.max(...point.map((n) => n[0])) + 1;
    let maxY = Math.max(...point.map((n) => n[1])) + 1;
    const instruction = parsed
        .filter((n) => !n.includes(','))
        .map((s) => s.match(/\w=\d+/)![0].split('='));

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
    let text: string[] = [];
    for (let y = 0; y < maxY; y++) {
        let str = '';
        for (let x = 0; x < maxX; x++) {
            str += plot[y][x] ? '#' : ' ';
        }
        text.push(str);
    }
    const runTime = performance.now() - startTime;
    return [text, runTime];
};
