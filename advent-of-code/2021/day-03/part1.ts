const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput.split('\r\n').filter((e) => e !== '');

let gammaRate: number | string = '';
let epsilonRate = 0;

for (let i = 0; i < parsed[0].length; i++) {
    const bit0 = parsed.filter((e) => e[i] === '0').length;
    const bit1 = parsed.length - bit0;
    gammaRate += bit0 > bit1 ? '0' : '1';
}

gammaRate = parseInt(gammaRate, 2);
epsilonRate = ~gammaRate & 0xfff;

console.log(gammaRate, epsilonRate);
console.log(gammaRate * epsilonRate);
