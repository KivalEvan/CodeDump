const fileInput = await Deno.readTextFile('input.txt');

let floor = 0;
for (let i = 0, len = fileInput.length; i < len; i++) {
    if (fileInput[i] === '(') {
        floor++;
    }
    if (fileInput[i] === ')') {
        floor--;
    }
}

console.log(floor);
