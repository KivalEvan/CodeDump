export const part1 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();

    const parsed = fileInput.split('\r\n').filter((e) => e !== '');

    const numAry = parsed[0].split(',').map((n) => parseInt(n));

    const bingo: { [key: number]: any[] } = {};

    for (let i = 1; i <= (parsed.length - 1) / 5; i++) {
        bingo[i] = [];
        for (let j = 0; j < 5; j++) {
            bingo[i].push(
                parsed[(i - 1) * 5 + j + 1]
                    .trim()
                    .split(/\s+/)
                    .map((n) => {
                        return { number: parseInt(n), picked: false };
                    })
            );
        }
    }

    const check = () => {
        for (let n = 0, len = numAry.length; n < len; n++) {
            for (let i = 1; i <= (parsed.length - 1) / 5; i++) {
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

    const runTime = performance.now() - startTime;
    return [score, runTime];
};

export const part2 = async (path = '') => {
    const fileInput = await Deno.readTextFile(path + 'input.txt');
    const startTime = performance.now();
    const parsed = fileInput.split('\r\n').filter((e) => e !== '');

    const numAry = parsed[0].split(',').map((n) => parseInt(n));

    const bingo: { [key: number]: any[] } = {};

    for (let i = 1; i <= (parsed.length - 1) / 5; i++) {
        bingo[i] = [];
        for (let j = 0; j < 5; j++) {
            bingo[i].push(
                parsed[(i - 1) * 5 + j + 1]
                    .trim()
                    .split(/\s+/)
                    .map((n) => {
                        return { number: parseInt(n), picked: false };
                    })
            );
        }
    }

    const check = () => {
        const won: number[] = [];
        let lastToCall = 0;
        for (let n = 0, len = numAry.length; n < len; n++) {
            for (let i = 1; i <= (parsed.length - 1) / 5; i++) {
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

    const runTime = performance.now() - startTime;
    return [score, runTime];
};
