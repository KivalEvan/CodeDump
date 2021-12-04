const fileInput = await Deno.readTextFile('input.txt');

let floor = 0;
for (let i = 0, index = null, len = fileInput.length; i < len; i++) {
    if (fileInput[i] === '(') {
        floor++;
    }
    if (fileInput[i] === ')') {
        floor--;
    }
    if (index === null && floor < 0) {
        index = i + 1;
        console.log(index);
    }
}
