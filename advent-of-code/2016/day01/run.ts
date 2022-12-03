export const tests = { part1: 12, part2: 4 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split(', ');
}

export function part1() {
    const input = getInput();
    let direction: 'up' | 'down' | 'left' | 'right' = 'up';
    const changeDirection: { [key: string]: any } = {
        L: {
            up: 'left',
            down: 'right',
            left: 'down',
            right: 'up',
        },
        R: {
            up: 'right',
            down: 'left',
            left: 'up',
            right: 'down',
        },
    };
    const position = [0, 0];
    const move = (step: number) => {
        if (direction === 'up') {
            position[0] += step;
        }
        if (direction === 'down') {
            position[0] -= step;
        }
        if (direction === 'left') {
            position[1] -= step;
        }
        if (direction === 'right') {
            position[1] += step;
        }
    };

    for (let i = 0; i < input.length; i++) {
        direction = changeDirection[input[i][0]][direction];
        move(parseInt(input[i].slice(1)));
    }

    return Math.abs(position[0]) + Math.abs(position[1]);
}

export function part2() {
    const input = getInput(true);
    let direction: 'up' | 'down' | 'left' | 'right' = 'up';
    const changeDirection: { [key: string]: any } = {
        L: {
            up: 'left',
            down: 'right',
            left: 'down',
            right: 'up',
        },
        R: {
            up: 'right',
            down: 'left',
            left: 'up',
            right: 'down',
        },
    };
    const visited: [number, number][] = [];
    const position: [number, number] = [0, 0];
    const move = (step: number) => {
        for (let s = 0; s < step; s++) {
            if (direction === 'up') {
                position[0]++;
            }
            if (direction === 'down') {
                position[0]--;
            }
            if (direction === 'left') {
                position[1]--;
            }
            if (direction === 'right') {
                position[1]++;
            }
            if (visited.find((n) => n[0] === position[0] && n[1] === position[1])) {
                return position[0] + Math.abs(position[1]);
            }
            visited.push([...position]);
        }
        return null;
    };

    for (let i = 0; i < input.length; i++) {
        direction = changeDirection[input[i][0]][direction];
        const n = move(parseInt(input[i].slice(1)));
        if (n) return n;
    }
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
