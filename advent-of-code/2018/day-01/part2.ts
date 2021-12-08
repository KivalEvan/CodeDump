const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((e) => e !== '');

let frequency = 0;
let seen: number[] = [];
let find;
while (typeof find !== 'number') {
    for (const f of input) {
        if (f[0] === '+') {
            frequency += parseInt(f.slice(1));
        }
        if (f[0] === '-') {
            frequency -= parseInt(f.slice(1));
        }
        find = seen.find((e) => e === frequency);
        if (typeof find === 'number') {
            console.log(find);
            break;
        }
        seen.push(frequency);
    }
}
