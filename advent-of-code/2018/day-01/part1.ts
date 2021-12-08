const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((e) => e !== '');

let frequency = 0;
for (const f of input) {
    if (f[0] === '+') {
        frequency += parseInt(f.slice(1));
    }
    if (f[0] === '-') {
        frequency -= parseInt(f.slice(1));
    }
    console.log(f.slice(1));
}

console.log(frequency);
