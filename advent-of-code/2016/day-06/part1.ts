const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((s) => s !== '');

for (let i = 0, len = input[0].length; i < len; i++) {
    const letter: { [key: string]: number } = {};
    for (const line of input) {
        letter[line[i]] =
            typeof letter[line[i]] !== 'undefined' ? ++letter[line[i]] : 1;
    }
    console.log(Object.entries(letter).sort((a, b) => b[1] - a[1])[0]);
}
