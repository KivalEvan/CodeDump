export const tests = { part1: 95437, part2: 24933642 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').map((s) => s.split(' '));
}

function getDirSize(input: string[][]) {
    const directories: { [key: string]: number } = { '/': 0 };
    let dir = '/';
    for (const s of input) {
        if (s[0] === '$') {
            if (s[1] === 'cd') {
                if (s[2] === '/') {
                    dir = '/';
                } else if (s[2] === '..') {
                    dir = dir.replace(/\w*\/$/, '');
                } else {
                    dir += s[2] + '/';
                }
            }
            continue;
        }
        if (s[0] === 'dir') {
            directories[dir + s[1] + '/'] = 0;
        }
        if (s[0] !== 'dir') {
            let temp = dir;
            while (temp) {
                directories[temp] += parseInt(s[0]);
                temp = temp.replace(/\w*\/$/, '');
            }
        }
    }
    return directories;
}

export function part1() {
    const input = getInput();
    const directories = getDirSize(input);
    return Object.values(directories)
        .filter((v) => v <= 100_000)
        .reduce((t, c) => t + c, 0);
}

export function part2() {
    const input = getInput();
    const directories = getDirSize(input);
    const MINIMUM_SIZE = 40_000_000;
    const CURRENT_SIZE = directories['/'];
    const REMOVE_SIZE = CURRENT_SIZE - MINIMUM_SIZE;
    return Object.values(directories)
        .filter((d) => d >= REMOVE_SIZE)
        .sort((a, b) => a - b)
        .at(0)!;
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
