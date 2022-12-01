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

    const template = parsed[0];
    const element: { [key: string]: number } = {};
    const insertion: { [key: string]: string } = {};
    const pair: { [key: string]: number } = {};
    for (const s of parsed.filter((n) => n.includes('->'))) {
        const [from, to] = s.split(' -> ');
        insertion[from] = to;
        pair[from] = 0;
        element[to] = 0;
    }

    const recursion = (s: string, depth: number) => {
        if (depth-- === 0) {
            return;
        }
        const toAdd = insertion[s];
        pair[s[0] + toAdd] += pair[s];
        pair[toAdd + s[1]] += pair[s];
        pair[s] = 0;
    };
    for (let i = 0; i < template.length - 1; i++) {
        pair[template.slice(i, i + 2)]++;
    }
    console.log(pair);
    for (let i = 0; i < template.length - 1; i++) {
        recursion(template.slice(i, i + 2), 1);
    }
    console.log(pair);

    // count element
    for (let i = 0; i < template.length; i++) {
        element[template[i]] += 1;
    }
    for (const p in pair) {
        element[insertion[p]] += pair[p];
    }

    const quantify = Math.max(...Object.values(element)) - Math.min(...Object.values(element));
    return quantify;
}

export function part2() {
    const input = getInput();
    return;
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
