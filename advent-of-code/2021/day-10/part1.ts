const startTime = performance.now();
const input = (await Deno.readTextFile('input.txt'))
    .trim()
    .split('\r\n')
    .filter((s) => s !== '');

const scoring: { [key: string]: number } = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

const closing: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};

let score = 0;
for (const line of input) {
    const stack: string[] = [];
    for (const char of line) {
        if (char === ')' || char === ']' || char === '}' || char === '>') {
            const c = stack.pop()!;
            if (closing[c] !== char) {
                // console.error(`Expected ${closing[c]}, but found ${char}`);
                score += scoring[char];
                break;
            }
            continue;
        }
        stack.push(char);
    }
}
console.log(score);

const endTime = performance.now() - startTime;
console.log('time taken', endTime);
