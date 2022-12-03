// deno-lint-ignore-file no-fallthrough
export const tests = { part1: 15, part2: 12 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input
        .split('\n')
        .filter((e) => e !== '')
        .map((s) => s.split(' '));
}

type OpponentInput = 'A' | 'B' | 'C';
type YourInput = 'X' | 'Y' | 'Z';
type GameElement = 'rock' | 'paper' | 'scissors';
type GameCondition = 'lost' | 'draw' | 'win';

const Opponent = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
};

const You = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
};

const Decide = {
    X: 'lost',
    Y: 'draw',
    Z: 'win',
};

enum Score {
    rock = 1,
    paper,
    scissors,
}

enum Outcome {
    lost = 0,
    draw = 3,
    win = 6,
}

function getScore(score: string): number {
    return Score[(You[score as YourInput] as GameElement) || score] || 0;
}

function decide(opponent: OpponentInput, you: YourInput): GameElement {
    const oR = Opponent[opponent];
    const oY = Decide[you];

    switch (oR) {
        case 'rock':
            switch (oY) {
                case 'lost':
                    return 'scissors';
                case 'draw':
                    return 'rock';
                case 'win':
                    return 'paper';
            }
        case 'paper':
            switch (oY) {
                case 'lost':
                    return 'rock';
                case 'draw':
                    return 'paper';
                case 'win':
                    return 'scissors';
            }
        case 'scissors':
            switch (oY) {
                case 'lost':
                    return 'paper';
                case 'draw':
                    return 'scissors';
                case 'win':
                    return 'rock';
            }
    }
    return 'rock';
}

function game(
    opponent: OpponentInput | GameElement,
    you: YourInput | GameElement,
): GameCondition {
    const oR = Opponent[opponent as keyof typeof Opponent] || opponent;
    const oY = You[you as keyof typeof You] || you;

    switch (oR) {
        case 'rock':
            switch (oY) {
                case 'rock':
                    return 'draw';
                case 'paper':
                    return 'win';
                case 'scissors':
                    return 'lost';
            }
        case 'paper':
            switch (oY) {
                case 'rock':
                    return 'lost';
                case 'paper':
                    return 'draw';
                case 'scissors':
                    return 'win';
            }
        case 'scissors':
            switch (oY) {
                case 'rock':
                    return 'win';
                case 'paper':
                    return 'lost';
                case 'scissors':
                    return 'draw';
            }
    }
    return 'lost';
}

export function part1() {
    const input = getInput();
    let score = 0;
    for (const s of input) {
        if (!s[0]) {
            continue;
        }
        score += Outcome[game(s[0] as OpponentInput, s[1] as YourInput)] +
            getScore(s[1]);
    }
    return score;
}

export function part2() {
    const input = getInput();
    let score = 0;
    for (const s of input) {
        if (!s[0]) {
            continue;
        }
        const change = decide(s[0] as OpponentInput, s[1] as YourInput);
        score += Outcome[game(s[0] as OpponentInput, change)] + getScore(change);
    }
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
