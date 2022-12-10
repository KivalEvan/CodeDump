export const tests = { part1: 13140, part2: undefined };
export const settings = {
    path: '',
    test: false,
};

type Instruction = ['noop'] | ['addx', number];

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input
        .replace(/addx/g, '\naddx')
        .split('\n')
        .map((s) =>
            s.split(' ').map((n, i) => {
                if (i) {
                    return parseInt(n);
                }
                return n;
            })
        ) as Instruction[];
}

export function part1() {
    const input = getInput();
    let x = 1,
        cycle = 0,
        sum = 0,
        toAdd: number | null = null;
    for (const instruction of input) {
        cycle++;
        if (toAdd !== null) {
            x += toAdd;
            toAdd = null;
        }
        switch (instruction[0]) {
            case 'addx':
                toAdd = instruction[1];
        }
        if (!((cycle + 20) % 40)) {
            sum += cycle * x;
        }
    }
    return sum;
}

export function part2() {
    const input = getInput();
    let x = 0,
        cycle = 0,
        str = '\n',
        toAdd: number | null = null;
    const draw = () => {
        return x > cycle || x + 2 < cycle ? '.' : '#';
    };
    for (const instruction of input) {
        if (toAdd !== null) {
            x += toAdd;
            toAdd = null;
        }
        switch (instruction[0]) {
            case 'addx':
                toAdd = instruction[1];
            /* falls through */
            default:
                str += draw();
        }
        cycle = ++cycle % 40;
        if (!cycle) {
            str += '\n';
        }
    }
    return str;
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
