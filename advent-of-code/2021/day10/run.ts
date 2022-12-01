export const tests = { part1: null, part2: null };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path + (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt')
    ).replace('\r', '');
    return input
        .trim()
        .split('\n')
        .filter((s) => s !== '');
}

export function part1() {
    const parsed = getInput();

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

    return score;
}

export function part2() {
    const parsed = getInput();

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
    return total;
}

if (import.meta.main) {
    settings.test = true;
    const test1 = part1();
    console.log('Test Part 1:\n', test1);
    console.assert(test1 === tests.part1, `Expected ${tests.part1}`);
    const test2 = part2();
    console.log('Test Part 2:\n', test2);
    console.assert(test2 === tests.part2, `Expected ${tests.part2}`);
    console.log();
    settings.test = false;
    console.log('Run Part 1:\n', part1());
    console.log('Run Part 2:\n', part2());
}
