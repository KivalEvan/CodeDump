const fileInput = await Deno.readTextFile('input.txt');

const delivered = [[0, 0]];
let posX = 0;
let posY = 0;
let posXr = 0;
let posYr = 0;
for (let i = 0, len = fileInput.length; i < len; i++) {
    if (fileInput[i] === '>') {
        i % 2 === 0 ? posX++ : posXr++;
    }
    if (fileInput[i] === '<') {
        i % 2 === 0 ? posX-- : posXr--;
    }
    if (fileInput[i] === '^') {
        i % 2 === 0 ? posY-- : posYr--;
    }
    if (fileInput[i] === 'v') {
        i % 2 === 0 ? posY++ : posYr++;
    }
    if (!delivered.find((d) => d[0] === posX && d[1] === posY)) {
        delivered.push([posX, posY]);
    }
    if (!delivered.find((d) => d[0] === posXr && d[1] === posYr)) {
        delivered.push([posXr, posYr]);
    }
}

console.log(delivered.length);
