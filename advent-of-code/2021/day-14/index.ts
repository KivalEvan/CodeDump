export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'test.txt');
    const startTime = performance.now();

    const parsed = fileInput
        .trim()
        .split('\r\n')
        .filter((s) => s !== '');

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

    const quantify =
        Math.max(...Object.values(element)) - Math.min(...Object.values(element));
    const runTime = performance.now() - startTime;
    return [quantify, runTime];
};

console.log(await part1());
