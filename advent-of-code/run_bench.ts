// deno-lint-ignore-file no-explicit-any
import { parse } from 'https://deno.land/std@0.167.0/flags/mod.ts';

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
    for (let day = startDay; day <= endDay; day++) {
        try {
            const destinationPath = `./${year}/day${day.toString().padStart(2, '0')}/`;
            const run = (await import(`${destinationPath}/run.ts`)) as Run;
            if (!run) throw new Error('Run file not found.');
            run.settings.path = './advent-of-code/' + destinationPath;

            if (test) {
                run.settings.test = true;
                Deno.bench(`[${year} > Day ${day}] Test 1`, () => {
                    run.part1();
                });
                Deno.bench(`[${year} > Day ${day}] Test 2`, () => {
                    run.part2();
                });
                run.settings.test = false;
            }
            Deno.bench(`[${year} > Day ${day}] Part 1`, () => {
                run.part1();
            });
            Deno.bench(`[${year} > Day ${day}] Part 2`, () => {
                run.part2();
            });
        } catch (e) {
            console.error(e);
            break;
        }
        if (new Date(year, 11, day + 1, 13) > new Date()) {
            break;
        }
    }
}
