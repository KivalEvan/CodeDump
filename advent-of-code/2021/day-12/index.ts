const isUpper = (c: string): boolean => {
    return c === c.toUpperCase();
};

const isLower = (c: string): boolean => {
    return c === c.toLowerCase();
};

export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'test.txt');
    const startTime = performance.now();

    const runTime = performance.now() - startTime;
    return [0, runTime];
};

// console.log(await part1());
