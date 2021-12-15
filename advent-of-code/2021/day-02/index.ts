export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput
        .split('\r\n')
        .filter((e) => e !== '')
        .map((e) => e.split(' '));

    let horizontal = 0;
    let depth = 0;
    for (let i = 0, len = parsed.length; i < len; i++) {
        if (parsed[i][0] === 'forward') {
            horizontal += parseInt(parsed[i][1]);
        }
        if (parsed[i][0] === 'down') {
            depth += parseInt(parsed[i][1]);
        }
        if (parsed[i][0] === 'up') {
            depth -= parseInt(parsed[i][1]);
        }
    }

    const total = horizontal * depth;
    const runTime = performance.now() - startTime;
    return [total, runTime];
};

export const part2 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput
        .split('\r\n')
        .filter((e) => e !== '')
        .map((e) => e.split(' '));

    let horizontal = 0;
    let aim = 0;
    let depth = 0;
    for (let i = 0, len = parsed.length; i < len; i++) {
        if (parsed[i][0] === 'forward') {
            horizontal += parseInt(parsed[i][1]);
            depth += aim * parseInt(parsed[i][1]);
        }
        if (parsed[i][0] === 'down') {
            aim += parseInt(parsed[i][1]);
        }
        if (parsed[i][0] === 'up') {
            aim -= parseInt(parsed[i][1]);
        }
    }

    const total = horizontal * depth;
    const runTime = performance.now() - startTime;
    return [total, runTime];
};
