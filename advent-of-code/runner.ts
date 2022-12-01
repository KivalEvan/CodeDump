// deno-lint-ignore-file no-explicit-any
import { parse } from 'https://deno.land/std@0.167.0/flags/mod.ts';

console.log('https://adventofcode.com/');

const args = parse(Deno.args, {
    string: ['d', 'y'],
    boolean: ['a', 't', 'j'],
    alias: { d: 'day', a: 'all', y: 'year', t: 'test', j: 'jump' },
});

if (!args.y && !args.a) {
    throw new Error('No arguments passed.');
}

let startYear = 2015;
let endYear = new Date().getFullYear();

if (!args.a) {
    startYear = parseInt(args.y!);
    endYear = parseInt(args.y!);
}

let startDay = 1;
let endDay = 25;

if (args.d) {
    startDay = parseInt(args.d!);
    if (!args.j) endDay = parseInt(args.d!);
}

let test = false;
if (args.t) {
    test = args.t;
}

interface Run {
    settings: {
        path: string;
        test: boolean;
    };
    tests: {
        part1: string;
        part2: boolean;
    };
    getInput: any;
    part1: any;
    part2: any;
}

for (let year = startYear; year <= endYear; year++) {
    console.log(`Advent of Code -- year ${year}`);
    for (let day = startDay; day <= endDay; day++) {
        try {
            console.log();
            const destinationPath = `./${year}/day${day.toString().padStart(2, '0')}/`;
            const run = (await import(`${destinationPath}/run.ts`)) as Run;
            if (!run) throw new Error('Run file not found.');
            console.log(`${year} -- day ${day}`);
            run.settings.path = './advent-of-code/' + destinationPath;

            if (test) {
                run.settings.test = true;
                const test1 = run.part1();
                const test2 = run.part2();
                console.log('Test 1:', test1);
                console.assert(test1 === run.tests.part1, `Expected ${run.tests.part1}`);
                console.log('Test 2:', test2);
                console.assert(test2 === run.tests.part2, `Expected ${run.tests.part2}`);
                console.log();
                run.settings.test = false;
            }
            const part1 = run.part1();
            if (part1 === undefined) throw new Error('Part 1 is not finished.');
            console.log('Part 1:', part1);

            const part2 = run.part2();
            if (part2 === undefined) throw new Error('Part 2 is not finished.');
            console.log('Part 2:', part2);
        } catch (e) {
            console.error(e);
            break;
        }
        if (new Date(year, 11, day + 1, 14) > new Date()) {
            console.log('\nWait for the next day.');
            break;
        }
        if (day === 25) {
            console.log('\nMerry Christmas.');
        }
    }
    console.log();
}
