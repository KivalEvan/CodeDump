const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput.split('\r\n').filter((e) => e !== '');

let gammaRate: number | string = '';
let epsilonRate = 0;

for (let i = 0; i < parsed[0].length; i++) {
    const bit: { [key: string]: number } = {
        0: 0,
        1: 0,
    };
    for (let j = 0, len = parsed.length; j < len; j++) {
        bit[parsed[j][i]]++;
    }
    if (bit[0] > bit[1]) {
        gammaRate += '0';
    } else {
        gammaRate += '1';
    }
}

gammaRate = parseInt(gammaRate, 2);
epsilonRate = ~gammaRate & 0xfff;

console.log(gammaRate, epsilonRate);
console.log(gammaRate * epsilonRate);
