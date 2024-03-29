// deno-lint-ignore-file no-explicit-any
import { parse } from 'https://deno.land/std@0.190.0/flags/mod.ts';
import { resolve } from 'https://deno.land/std@0.190.0/path/mod.ts';

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

let perfStart = performance.now();
let perfEnd = performance.now();
for (let year = startYear; year <= endYear; year++) {
    console.log(`Advent of Code -- year ${year}`);
    for (let day = startDay; day <= endDay; day++) {
        try {
            console.log();
            const destinationPath = resolve(`./${year}/day${day.toString().padStart(2, '0')}`);
            const run = (await import(`${destinationPath}/run.ts`)) as Run;
            if (!run) throw new Error('Run file not found.');
            console.log(`----\\________\n${year} -- day ${day}`);
            run.settings.path = destinationPath + '/';

            if (test) {
                run.settings.test = true;

                perfStart = performance.now();
                const test1 = run.part1();
                perfEnd = performance.now();
                console.log('Test 1:', test1);
                if (run.tests.part1) {
                    console.assert(
                        test1 === run.tests.part1,
                        `Expected ${run.tests.part1}`,
                    );
                }
                console.log(
                    ' -- Time taken (ms):',
                    Math.round((perfEnd - perfStart) * 100) / 100,
                );

                perfStart = performance.now();
                const test2 = run.part2();
                perfEnd = performance.now();
                console.log('Test 2:', test2);
                if (run.tests.part2) {
                    console.assert(
                        test2 === run.tests.part2,
                        `Expected ${run.tests.part2}`,
                    );
                }
                console.log(
                    ' -- Time taken (ms):',
                    Math.round((perfEnd - perfStart) * 100) / 100,
                );

                console.log();
                run.settings.test = false;
            }
            perfStart = performance.now();
            const part1 = run.part1();
            perfEnd = performance.now();
            if (part1 === undefined) throw new Error('Part 1 is not finished.');
            console.log('Part 1:', part1);
            console.log(
                ' -- Time taken (ms):',
                Math.round((perfEnd - perfStart) * 100) / 100,
            );

            perfStart = performance.now();
            const part2 = run.part2();
            perfEnd = performance.now();
            if (part2 === undefined) throw new Error('Part 2 is not finished.');
            console.log('Part 2:', part2);
            console.log(
                ' -- Time taken (ms):',
                Math.round((perfEnd - perfStart) * 100) / 100,
            );
        } catch (e) {
            console.error(e);
            break;
        }
        if (new Date(year, 11, day + 1, 13) > new Date()) {
            console.log(`\nWait for the next day.`);
            break;
        }
        if (day === 25) {
            console.log('\nMerry Christmas.');
        }
    }
    console.log();
}
