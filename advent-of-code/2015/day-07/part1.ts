const fileInput = await Deno.readTextFile('input.txt');
const parsed = fileInput
    .split('\r\n')
    .filter((e) => e !== '')
    .map((e) => e.split(' '));

const uint16 = (n: number) => n & 0xffff;

const circuit: { [key: string]: number } = {};
for (let i = 0; i < parsed.length; i++) {
    let x, y;
    if (parsed[i][0].match(/NOT/)) {
        if (
            parsed[i][1].match(/[a-z]+/) &&
            typeof circuit[parsed[i][1]] === 'undefined'
        ) {
            circuit[parsed[i][1]] = 0x0000;
        }
        circuit[parsed[i][3]] = uint16(
            parsed[i][1].match(/[a-z]+/)
                ? ~circuit[parsed[i][1]]
                : ~parseInt(parsed[i][1])
        );
    } else if (parsed[i][1].match(/AND/)) {
        if (
            parsed[i][0].match(/[a-z]+/) &&
            typeof circuit[parsed[i][0]] === 'undefined'
        ) {
            circuit[parsed[i][0]] = 0x0000;
        }
        if (
            parsed[i][2].match(/[a-z]+/) &&
            typeof circuit[parsed[i][2]] === 'undefined'
        ) {
            circuit[parsed[i][2]] = 0x0000;
        }
        x = uint16(
            parsed[i][0].match(/[a-z]+/)
                ? circuit[parsed[i][0]]
                : parseInt(parsed[i][0])
        );
        y = uint16(
            parsed[i][2].match(/[a-z]+/)
                ? circuit[parsed[i][2]]
                : parseInt(parsed[i][2])
        );
        circuit[parsed[i][4]] = uint16(x & y);
    } else if (parsed[i][1].match(/OR/)) {
        if (
            parsed[i][0].match(/[a-z]+/) &&
            typeof circuit[parsed[i][0]] === 'undefined'
        ) {
            circuit[parsed[i][0]] = 0x0000;
        }
        if (
            parsed[i][2].match(/[a-z]+/) &&
            typeof circuit[parsed[i][2]] === 'undefined'
        ) {
            circuit[parsed[i][2]] = 0x0000;
        }
        x = uint16(
            parsed[i][0].match(/[a-z]+/)
                ? circuit[parsed[i][0]]
                : parseInt(parsed[i][0])
        );
        y = uint16(
            parsed[i][2].match(/[a-z]+/)
                ? circuit[parsed[i][2]]
                : parseInt(parsed[i][2])
        );
        circuit[parsed[i][4]] = uint16(x | y);
    } else if (parsed[i][1].match(/LSHIFT/)) {
        if (
            parsed[i][0].match(/[a-z]+/) &&
            typeof circuit[parsed[i][0]] === 'undefined'
        ) {
            circuit[parsed[i][0]] = 0x0000;
        }
        x = parsed[i][0].match(/[a-z]+/)
            ? circuit[parsed[i][0]]
            : parseInt(parsed[i][0]);
        circuit[parsed[i][4]] = uint16(x << parseInt(parsed[i][2]));
    } else if (parsed[i][1].match(/RSHIFT/)) {
        if (
            parsed[i][0].match(/[a-z]+/) &&
            typeof circuit[parsed[i][0]] === 'undefined'
        ) {
            circuit[parsed[i][0]] = 0x0000;
        }
        x = parsed[i][0].match(/[a-z]+/)
            ? circuit[parsed[i][0]]
            : parseInt(parsed[i][0]);
        circuit[parsed[i][4]] = uint16(x >> parseInt(parsed[i][2]));
    } else {
        if (
            parsed[i][0].match(/[a-z]+/) &&
            typeof circuit[parsed[i][0]] === 'undefined'
        ) {
            circuit[parsed[i][0]] = 0x0000;
        }
        circuit[parsed[i][2]] = uint16(
            parsed[i][0].match(/[a-z]+/)
                ? circuit[parsed[i][0]]
                : parseInt(parsed[i][0])
        );
    }
}

console.log(circuit);
console.log(circuit.a);
