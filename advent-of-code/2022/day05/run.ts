export const tests = { part1: 'CMZ', part2: 'MCD' };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    const temp = input.split('\n');
    const result: { stack: { [key: number]: string[] }; command: number[][] } = {
        stack: {},
        command: [],
    };
    let it = 0;
    for (const s of temp) {
        if (!s) break;
        for (let i = 1; i <= 9; i++) {
            if (!result.stack[i]) {
                result.stack[i] = [];
            }
            result.stack[i].push(s.substring((i - 1) * 4 + 1, i * 4 - 2));
        }
        it++;
    }
    for (let i = 0; i <= it; i++) {
        temp.shift();
    }
    result.command = temp.map((s) =>
        s
            .split(' ')
            .map((s) => parseInt(s))
            .filter((s) => Number.isInteger(s))
    );
    for (let i = 1; i <= 9; i++) {
        result.stack[i].pop();
        result.stack[i] = result.stack[i].filter((s) => s !== ' ').toReversed();
    }
    return result;
}

export function part1() {
    const input = getInput();
    let result = '';
    for (const c of input.command) {
        for (let i = 0; i < c[0]; i++) {
            input.stack[c[2]].push(input.stack[c[1]].pop()!);
        }
    }
    for (const v of Object.values(input.stack)) {
        result += v.pop();
    }
    return result;
}

export function part2() {
    const input = getInput();
    let result = '';
    for (const c of input.command) {
        let temp = [];
        for (let i = 0; i < c[0]; i++) {
            temp.push(input.stack[c[1]].pop()!);
        }
        input.stack[c[2]].push(...temp.reverse());
    }
    for (const v of Object.values(input.stack)) {
        result += v.pop();
    }
    return result;
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
