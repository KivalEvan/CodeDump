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
        .split('\n')
        .filter((e) => e !== '')
        .map((e) => e.split(' '));
}

export function part1() {
    const input = getInput();
    const uint16 = (n: number) => n & 0xffff;

    const circuit: { [key: string]: number } = {};
    for (let i = 0; i < input.length; i++) {
        let x, y;
        if (input[i][0].match(/NOT/)) {
            if (input[i][1].match(/[a-z]+/) && typeof circuit[input[i][1]] === 'undefined') {
                circuit[input[i][1]] = 0x0000;
            }
            circuit[input[i][3]] = uint16(input[i][1].match(/[a-z]+/) ? ~circuit[input[i][1]] : ~parseInt(input[i][1]));
        } else if (input[i][1].match(/AND/)) {
            if (input[i][0].match(/[a-z]+/) && typeof circuit[input[i][0]] === 'undefined') {
                circuit[input[i][0]] = 0x0000;
            }
            if (input[i][2].match(/[a-z]+/) && typeof circuit[input[i][2]] === 'undefined') {
                circuit[input[i][2]] = 0x0000;
            }
            x = uint16(input[i][0].match(/[a-z]+/) ? circuit[input[i][0]] : parseInt(input[i][0]));
            y = uint16(input[i][2].match(/[a-z]+/) ? circuit[input[i][2]] : parseInt(input[i][2]));
            circuit[input[i][4]] = uint16(x & y);
        } else if (input[i][1].match(/OR/)) {
            if (input[i][0].match(/[a-z]+/) && typeof circuit[input[i][0]] === 'undefined') {
                circuit[input[i][0]] = 0x0000;
            }
            if (input[i][2].match(/[a-z]+/) && typeof circuit[input[i][2]] === 'undefined') {
                circuit[input[i][2]] = 0x0000;
            }
            x = uint16(input[i][0].match(/[a-z]+/) ? circuit[input[i][0]] : parseInt(input[i][0]));
            y = uint16(input[i][2].match(/[a-z]+/) ? circuit[input[i][2]] : parseInt(input[i][2]));
            circuit[input[i][4]] = uint16(x | y);
        } else if (input[i][1].match(/LSHIFT/)) {
            if (input[i][0].match(/[a-z]+/) && typeof circuit[input[i][0]] === 'undefined') {
                circuit[input[i][0]] = 0x0000;
            }
            x = input[i][0].match(/[a-z]+/) ? circuit[input[i][0]] : parseInt(input[i][0]);
            circuit[input[i][4]] = uint16(x << parseInt(input[i][2]));
        } else if (input[i][1].match(/RSHIFT/)) {
            if (input[i][0].match(/[a-z]+/) && typeof circuit[input[i][0]] === 'undefined') {
                circuit[input[i][0]] = 0x0000;
            }
            x = input[i][0].match(/[a-z]+/) ? circuit[input[i][0]] : parseInt(input[i][0]);
            circuit[input[i][4]] = uint16(x >> parseInt(input[i][2]));
        } else {
            if (input[i][0].match(/[a-z]+/) && typeof circuit[input[i][0]] === 'undefined') {
                circuit[input[i][0]] = 0x0000;
            }
            circuit[input[i][2]] = uint16(input[i][0].match(/[a-z]+/) ? circuit[input[i][0]] : parseInt(input[i][0]));
        }
    }

    // console.log(circuit);
    // console.log(circuit.a);

    return;
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
