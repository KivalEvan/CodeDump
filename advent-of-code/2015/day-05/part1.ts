const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput
    .split('\r\n')
    .filter((e) => e !== '')
    .map((e) => e.toLowerCase());

let size = 0;
for (let i = 0, len = parsed.length; i < len; i++) {
    let vowel = 0;
    let double = false;
    for (let j = 0, l = parsed[i].length; j < l; j++) {
        if (parsed[i][j].match(/[aeiou]/)) {
            vowel++;
        }
        if (j > 0 && parsed[i][j - 1] === parsed[i][j]) {
            double = true;
        }
    }
    if (vowel >= 3 && double && !parsed[i].match(/((ab)|(cd)|(pq)|(xy))/)) {
        size++;
    }
}

console.log(size);
