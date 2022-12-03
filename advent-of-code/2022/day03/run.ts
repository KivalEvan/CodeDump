export const tests = { part1: 157, part2: 70 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n');
}

function getPriority(s: string) {
    const cc = s.charCodeAt(0);
    return cc < 91 ? cc - 38 : cc - 96;
}

export function part1() {
    const input = getInput();
    let sum = 0;
    for (const s of input) {
        const kL = new Set<string>();
        const kR = new Set<string>();
        const l = s.slice(0, s.length / 2),
            r = s.slice(s.length / 2);
        for (const i of l) {
            kL.add(i);
        }
        for (const i of r) {
            kR.add(i);
        }
        for (const i of kL.values()) {
            if (kR.has(i)) {
                sum += getPriority(i);
                break;
            }
        }
    }
    return sum;
}

export function part2() {
    const input = getInput();
    let sum = 0;
    let it = 0;
    let kL = [new Set<string>(), new Set<string>(), new Set<string>()];
    let kR = [new Set<string>(), new Set<string>(), new Set<string>()];
    const findCommon = (k: Set<string>[]): number => {
        const [a, b, c] = k;
        const d = new Set<string>();
        for (const i of a) {
            if (b.has(i)) {
                d.add(i);
            }
        }
        for (const i of c) {
            if (d.has(i)) {
                return getPriority(i);
            }
        }
        return 0;
    };
    for (const s of input) {
        for (const i of s) {
            if (it < 3) {
                kL[it].add(i);
            }
            if (it > 2) {
                kR[it % 3].add(i);
            }
        }
        it++;
        if (it === 6) {
            sum += findCommon(kL);
            sum += findCommon(kR);
            it = 0;
            kL = [new Set<string>(), new Set<string>(), new Set<string>()];
            kR = [new Set<string>(), new Set<string>(), new Set<string>()];
        }
    }
    return sum;
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
