const input = (await Deno.readTextFile('input.txt'))
    .split('\r\n')
    .filter((e) => e !== '');

let maxSize = input[0].length;
const boxList = [];
for (const box of input) {
    const letter: { [key: string]: number } = {};
    for (const l of box) {
        letter[l] = letter[l] ? ++letter[l] : 1;
    }
    if (
        Object.values(letter).find((l) => l === 2) ||
        Object.values(letter).find((l) => l === 3)
    ) {
        boxList.push(box);
    }
}

for (let i = 0, len = boxList.length; i < len; i++) {
    for (let j = i + 1, incorrect = 0; j < len; j++) {
        let letter = '';
        for (let k = 0; k < maxSize && incorrect < 2; k++) {
            if (boxList[i][k] !== boxList[j][k]) {
                incorrect++;
            } else {
                letter += boxList[i][k];
            }
        }
        if (incorrect < 2) {
            console.log(letter);
        }
        incorrect = 0;
    }
}
