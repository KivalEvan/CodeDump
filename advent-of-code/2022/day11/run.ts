export const tests = { part1: 10605, part2: 2713310158 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n\n').map((str, _) => {
        const parsed = str.split('\n').map((s) => s.trim());
        const op = parsed[2].split(':')[1].trim().split(' ')[3];
        const itself = parseInt(parsed[2].split(':')[1].trim().split(' ')[4]);
        const obj = {
            items: parsed[1]
                .split(':')[1]
                .trim()
                .split(', ')
                .map((n) => parseInt(n)),
            divideBy: parseInt(parsed[3].split(' ').at(-1)!),
            modulo: 1,
            trueMonkee: parseInt(parsed[4].at(-1)!),
            falseMonkee: parseInt(parsed[5].at(-1)!),
            inspecc: function (x: number, divide: boolean) {
                const result = op === '*'
                    ? x * (!isNaN(itself) ? itself : x)
                    : x + (!isNaN(itself) ? itself : x);
                return (divide ? Math.floor(result / 3) : result) % this.modulo;
            },
            yeet: function (x: number) {
                return !(x % this.divideBy) ? this.trueMonkee : this.falseMonkee;
            },
            inspected: 0,
        };
        return obj;
    });
}

export function part1() {
    const monkee = getInput();
    const modulo = Object.values(monkee).reduce((p, c) => p * c.divideBy, 1);
    for (const m of monkee) {
        m.modulo = modulo;
    }
    for (let round = 0; round < 20; round++) {
        for (const id in monkee) {
            let item = monkee[id].items.shift();
            while (item) {
                monkee[id].inspected++;
                item = monkee[id].inspecc(item, true);
                monkee[monkee[id].yeet(item)].items.push(item);
                item = monkee[id].items.shift();
            }
        }
    }

    return Object.values(monkee)
        .sort((a, b) => b.inspected - a.inspected)
        .slice(0, 2)
        .reduce((p, c) => p * c.inspected, 1);
}

export function part2() {
    const monkee = getInput();
    const modulo = Object.values(monkee).reduce((p, c) => p * c.divideBy, 1);
    for (const m of monkee) {
        m.modulo = modulo;
    }
    for (let round = 0; round < 10000; round++) {
        for (const id in monkee) {
            let item = monkee[id].items.shift();
            while (item) {
                item = monkee[id].inspecc(item, false);
                monkee[monkee[id].yeet(item)].items.push(item);
                monkee[id].inspected++;
                item = monkee[id].items.shift();
            }
        }
    }

    // console.log(monkee.map((m) => m.inspected));

    return Object.values(monkee)
        .sort((a, b) => b.inspected - a.inspected)
        .slice(0, 2)
        .map((a) => a.inspected)
        .reduce((p, c) => p * c, 1);
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
