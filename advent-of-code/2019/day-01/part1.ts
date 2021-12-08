const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((e) => e !== '')
    .map((s) => parseInt(s));

console.log(input.reduce((t, n) => t + Math.floor(n / 3) - 2, 0));
