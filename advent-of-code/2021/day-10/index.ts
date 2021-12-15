export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput
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
    for (const line of parsed) {
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

    const runTime = performance.now() - startTime;
    return [score, runTime];
};

export const part2 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput
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
    for (const line of parsed) {
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

    const scored: number[] = [];
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
    const total = scored.sort((a, b) => a - b)[Math.floor(scored.length / 2)];
    const runTime = performance.now() - startTime;
    return [total, runTime];
};
