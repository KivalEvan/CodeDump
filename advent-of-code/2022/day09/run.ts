export const tests = { part1: 13, part2: 36 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').map((s) =>
        s.split(' ').map((n, i) => {
            if (i) return parseInt(n);
            return n;
        })
    ) as [Direction, number][];
}

type Direction = 'U' | 'D' | 'L' | 'R';

type Vector = [number, number];

function isAdjacent(head: Vector, tail: Vector) {
    return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
}

function add(head: Vector, tail: Vector) {
    if (head[0] > tail[0]) {
        tail[0]++;
    } else if (head[0] < tail[0]) {
        tail[0]--;
    }
    if (head[1] > tail[1]) {
        tail[1]++;
    } else if (head[1] < tail[1]) {
        tail[1]--;
    }
}

function adjust(head: Vector, tail: Vector) {
    if (!isAdjacent(head, tail)) {
        add(head, tail);
    }
}

function move(knots: Vector[], mark: Set<string>, direction: Direction, step: number) {
    switch (direction) {
        case 'U':
            knots[0][1]++;
            break;
        case 'D':
            knots[0][1]--;
            break;
        case 'L':
            knots[0][0]--;
            break;
        case 'R':
            knots[0][0]++;
            break;
    }
    for (let i = 0, len = knots.length - 1; i < len; i++) {
        adjust(knots[i], knots[i + 1]);
    }
    const last = knots.at(-1)!;
    mark.add(`${last[0]},${last[1]}`);
    if (--step) move(knots, mark, direction, step);
}

export function part1() {
    const input = getInput();
    const knots: Vector[] = [
        [0, 0],
        [0, 0],
    ];
    const mark = new Set<string>();
    for (const instruction of input) {
        move(knots, mark, instruction[0], instruction[1]);
    }
    return mark.size;
}

export function part2() {
    const input = getInput(true);
    const knots: Vector[] = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ];
    const mark = new Set<string>();
    for (const instruction of input) {
        move(knots, mark, instruction[0], instruction[1]);
    }
    return mark.size;
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
