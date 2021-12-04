const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput
    .split('\r\n')
    .filter((e) => e !== '')
    .map((e) => e.toLowerCase());

// this is truly big brain moment
let size = 0;
for (let i = 0, len = parsed.length; i < len; i++) {
    let pairTwice = false;
    let pairWithMiddle = false;
    for (let j = 0, l = parsed[i].length; j < l; j++) {
        if (j > 0) {
            if (parsed[i].split(parsed[i][j - 1] + parsed[i][j]).length > 2) {
                pairTwice = true;
            }
        }
        if (j > 1 && parsed[i][j - 2] === parsed[i][j]) {
            pairWithMiddle = true;
        }
    }
    if (pairTwice && pairWithMiddle) {
        size++;
    }
}

console.log(size);
