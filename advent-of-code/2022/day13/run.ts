// import { green, red, yellow } from 'https://deno.land/std@0.167.0/fmt/colors.ts';

export const tests = { part1: 13, part2: 140 };
export const settings = {
    path: '',
    test: false,
};

type Signal = number | number[];

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n\n').map((str) =>
        str.split('\n').map((n) => JSON.parse(n))
    ) as Signal[][];
}

const isArray = Array.isArray;

function prettyPrint(ary: Signal): string {
    return isArray(ary)
        ? `[${
            ary.reduce(
                (p, c) => p + (isArray(c) ? prettyPrint(c) : c.toString()) + ',',
                '',
            ).replace(/,$/, '')
        }]`
        : ary.toString();
}

// deno-lint-ignore no-explicit-any
// function print(...args: any) {
// just so i can yeet this away
// console.log(...args);
// }

function checkPair(lhs: Signal, rhs: Signal): -1 | 0 | 1 {
    let recurseResult = 0;
    // print(''.padStart(recursion * 2, ' ') + `- Compare ${prettyPrint(lhs)} vs ${prettyPrint(rhs)}`);
    if (typeof lhs === 'number' && typeof rhs === 'number') {
        if (lhs < rhs) {
            // print(
            //     ''.padStart((recursion + 1) * 2, ' ') +
            //         green('- Left side is smaller, so inputs are in the right order')
            // );
            return 1;
        }
        if (lhs > rhs) {
            // print(
            //     ''.padStart((recursion + 1) * 2, ' ') +
            //         red('- Right side is smaller, so inputs are not in the right order')
            // );
            return -1;
        }
        return 0;
    }
    if (isArray(lhs) && !isArray(rhs)) {
        // print(
        //     ''.padStart((recursion + 1) * 2, ' ') +
        //         yellow(`- Mixed types; convert right to ${prettyPrint([rhs])} and retry comparison`)
        // );
        return checkPair(lhs, [rhs]);
    }
    if (!isArray(lhs) && isArray(rhs)) {
        // print(
        //     ''.padStart((recursion + 1) * 2, ' ') +
        //         yellow(`- Mixed types; convert left to ${prettyPrint([lhs])} and retry comparison`)
        // );
        return checkPair([lhs], rhs);
    }
    if (isArray(lhs) && isArray(rhs)) {
        for (const l in lhs) {
            if (!(rhs.length - parseInt(l))) {
                // print(
                //     ''.padStart((recursion + 1) * 2, ' ') +
                //         red('- Right side ran out of items, so inputs are not in the right order')
                // );
                return -1;
            }
            recurseResult = checkPair(lhs[l], rhs[l]);
            if (recurseResult === -1) {
                return -1;
            }
            if (recurseResult === 1) {
                return 1;
            }
        }
        if (lhs.length < rhs.length) {
            // print(
            //     ''.padStart((recursion + 1) * 2, ' ') +
            //         green('- Left side ran out of items, so inputs are in the right order')
            // );
            return 1;
        }
        return 0;
    }
    // print(red('!! RETURNED WITHOUT GOING THROUGH LOOP'));
    return -1;
}

export function part1() {
    const input = getInput();
    let sum = 0;
    for (const i in input) {
        const [left, right] = input[i];
        // print(`\n== PAIR ${parseInt(i) + 1} ==`);
        if (checkPair(left, right) > -1) {
            sum += parseInt(i) + 1;
        }
    }

    return sum;
} // not 3512

export function part2() {
    const input = getInput()
        .concat([[[[2] as Signal] as Signal, [[6] as Signal] as Signal]]) // dont ask why
        .flat()
        .sort(checkPair)
        .reverse()
        .map((s) => prettyPrint(s));
    return (input.findIndex((s) => s === '[[2]]') + 1) *
        (input.findIndex((s) => s === '[[6]]') + 1);
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
