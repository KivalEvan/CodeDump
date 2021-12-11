const startTime = performance.now();
const input = (await Deno.readTextFile('input.txt'))
    .trim()
    .split('\r\n')
    .filter((s) => s !== '');

const scoring: { [key: string]: number } = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};

const closing: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};

const incomplete: string[] = [];
for (const line of input) {
    const stack: string[] = [];
    let nope = false;
    for (const char of line) {
        if (char === ')' || char === ']' || char === '}' || char === '>') {
            const c = stack.pop()!;
            if (closing[c] !== char) {
                nope = true;
                break;
            }
            continue;
        }
        stack.push(char);
    }
    if (!nope) {
        incomplete.push(line);
    }
}

let scored: number[] = [];
for (const line of incomplete) {
    const stack: string[] = [];
    for (const char of line) {
        if (char === ')' || char === ']' || char === '}' || char === '>') {
            stack.pop();
            continue;
        }
        stack.push(char);
    }
    scored.push(
        stack
            .map((c) => scoring[closing[c]])
            .reverse()
            .reduce((t, n) => t * 5 + n, 0)
    );
}
console.log(scored.sort((a, b) => a - b)[Math.floor(scored.length / 2)]);

const endTime = performance.now() - startTime;
console.log('time taken', endTime);
