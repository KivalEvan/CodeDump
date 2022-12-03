export const tests = { part1: null, part2: null };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input;
}

export function part1() {
    const input = getInput();

    const numAry = input[0].split(',').map((n) => parseInt(n));

    const bingo: { [key: number]: any[] } = {};

    for (let i = 1; i <= (input.length - 1) / 5; i++) {
        bingo[i] = [];
        for (let j = 0; j < 5; j++) {
            bingo[i].push(
                input[(i - 1) * 5 + j + 1]
                    .trim()
                    .split(/\s+/)
                    .map((n) => {
                        return { number: parseInt(n), picked: false };
                    }),
            );
        }
    }

    const check = () => {
        for (let n = 0, len = numAry.length; n < len; n++) {
            for (let i = 1; i <= (input.length - 1) / 5; i++) {
                for (let j = 0; j < 5; j++) {
                    const found = bingo[i][j].find((b: any) => b.number === numAry[n]);
                    if (found) {
                        found.picked = true;
                    }
                    if (bingo[i][j].every((b: any) => b.picked)) {
                        const boardNum = numAry[n];
                        const boardSum = bingo[i]
                            .flat()
                            .filter((b: any) => !b.picked)
                            .map((b: any) => b.number)
                            .reduce((t, num) => t + num);
                        // console.log(boardNum, boardSum);
                        // console.log(boardNum * boardSum);
                        // console.log('bingo');
                        return boardNum * boardSum;
                    }
                    if (
                        bingo[i][0][j].picked &&
                        bingo[i][1][j].picked &&
                        bingo[i][2][j].picked &&
                        bingo[i][3][j].picked &&
                        bingo[i][4][j].picked
                    ) {
                        const boardNum = numAry[n];
                        const boardSum = bingo[i]
                            .flat()
                            .filter((b: any) => !b.picked)
                            .map((b: any) => b.number)
                            .reduce((t, num) => t + num);
                        // console.log(boardNum, boardSum);
                        // console.log(boardNum * boardSum);
                        // console.log('bingo');
                        return boardNum * boardSum;
                    }
                }
            }
        }
    };

    const score = check();

    return score;
}

export function part2() {
    const input = getInput();

    const numAry = input[0].split(',').map((n) => parseInt(n));

    const bingo: { [key: number]: any[] } = {};

    for (let i = 1; i <= (input.length - 1) / 5; i++) {
        bingo[i] = [];
        for (let j = 0; j < 5; j++) {
            bingo[i].push(
                input[(i - 1) * 5 + j + 1]
                    .trim()
                    .split(/\s+/)
                    .map((n) => {
                        return { number: parseInt(n), picked: false };
                    }),
            );
        }
    }

    const check = () => {
        const won: number[] = [];
        let lastToCall = 0;
        for (let n = 0, len = numAry.length; n < len; n++) {
            for (let i = 1; i <= (input.length - 1) / 5; i++) {
                if (won.includes(i)) {
                    continue;
                }
                for (let j = 0; j < 5; j++) {
                    const found = bingo[i][j].find((b: any) => b.number === numAry[n]);
                    if (found) {
                        found.picked = true;
                    }
                    if (bingo[i][j].every((b: any) => b.picked)) {
                        won.push(i);
                        lastToCall = numAry[n];
                        break;
                    }
                    if (
                        bingo[i][0][j].picked &&
                        bingo[i][1][j].picked &&
                        bingo[i][2][j].picked &&
                        bingo[i][3][j].picked &&
                        bingo[i][4][j].picked
                    ) {
                        won.push(i);
                        lastToCall = numAry[n];
                        break;
                    }
                }
            }
        }
        const boardSum = bingo[won[won.length - 1]]
            .flat()
            .filter((b: any) => !b.picked)
            .map((b: any) => b.number)
            .reduce((t, num) => t + num);
        // console.log(lastToCall, boardSum);
        // console.log(lastToCall * boardSum);
        // console.log('bingo');
        return lastToCall * boardSum;
    };

    const score = check();

    return score;
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
