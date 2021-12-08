const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((e) => e !== '')
    .map((s) => parseInt(s));

const recursive = (n: number): number => {
    if (n === 0) {
        return 0;
    }
    return n + recursive(Math.max(Math.floor(n / 3) - 2, 0));
};
console.log(input.reduce((t, n) => t - n + recursive(n), 0));
