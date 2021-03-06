export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput
        .split('\r\n')
        .filter((e) => e !== '')
        .map((e) => parseInt(e));

    let current = parsed[0];
    let largerThanPreviousCount = 0;
    for (let i = 1, len = parsed.length; i < len; i++) {
        if (current < parsed[i]) {
            largerThanPreviousCount++;
        }
        current = parsed[i];
    }

    const runTime = performance.now() - startTime;
    return [largerThanPreviousCount, runTime];
};

export const part2 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput
        .split('\r\n')
        .filter((e) => e !== '')
        .map((e) => parseInt(e));

    let current1 = parsed[0];
    let current2 = parsed[1];
    let current3 = parsed[2];
    let sum = current1 + current2 + current3;
    let largerThanPreviousCount = 0;
    for (let i = 1, len = parsed.length - 2; i < len; i++) {
        current1 = parsed[i];
        current2 = parsed[i + 1];
        current3 = parsed[i + 2];
        if (sum < current1 + current2 + current3) {
            largerThanPreviousCount++;
        }
        sum = current1 + current2 + current3;
    }

    const runTime = performance.now() - startTime;
    return [largerThanPreviousCount, runTime];
};
