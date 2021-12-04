const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput.split('\r\n').filter((e) => e !== '');

let oxygenRate: number;
let co2Rate: number;

let check = parsed;
for (let i = 0; i < parsed[0].length; i++) {
    if (check.length === 1) {
        break;
    }
    const bit = {
        0: check.filter((e) => e[i] === '0').length,
        1: check.filter((e) => e[i] === '1').length,
    };
    if (bit[0] === bit[1]) {
        check = check.filter((e) => e[i] === '1');
    }
    if (bit[0] > bit[1]) {
        check = check.filter((e) => e[i] === '0');
    } else {
        check = check.filter((e) => e[i] === '1');
    }
}
oxygenRate = parseInt(check.find((e) => e[parsed[0].length - 1] === '1')!, 2);

check = parsed;
for (let i = 0; i < parsed[0].length; i++) {
    if (check.length === 1) {
        break;
    }
    let bit = {
        0: check.filter((e) => e[i] === '0').length,
        1: check.filter((e) => e[i] === '1').length,
    };
    if (bit[0] === bit[1]) {
        check = check.filter((e) => e[i] === '0');
    }
    if (bit[0] > bit[1]) {
        check = check.filter((e) => e[i] === '1');
    } else {
        check = check.filter((e) => e[i] === '0');
    }
}
co2Rate = parseInt(check.find((e) => e[parsed[0].length - 1] === '0')!, 2);

console.log(oxygenRate, co2Rate);
console.log(oxygenRate * co2Rate);
