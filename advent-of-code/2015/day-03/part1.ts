const fileInput = await Deno.readTextFile('input.txt');

const delivered = [[0, 0]];
let posX = 0;
let posY = 0;
for (let i = 0, len = fileInput.length; i < len; i++) {
    if (fileInput[i] === '>') {
        posX++;
    }
    if (fileInput[i] === '<') {
        posX--;
    }
    if (fileInput[i] === '^') {
        posY++;
    }
    if (fileInput[i] === 'v') {
        posY--;
    }
    if (!delivered.find((d) => d[0] === posX && d[1] === posY)) {
        delivered.push([posX, posY]);
    }
}

console.log(delivered.length);
