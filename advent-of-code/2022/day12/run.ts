export const tests = { part1: 31, part2: 29 };
export const settings = {
    path: '',
    test: false,
};

export function getInput(alternate = false) {
    const input = Deno.readTextFileSync(
        settings.path +
            (settings.test ? (alternate ? 'test2.txt' : 'test.txt') : 'input.txt'),
    ).replace('\r', '');
    return input.split('\n').map((str) =>
        str.split('').map((c) => {
            if (c === 'S') {
                return 0;
            }
            if (c === 'E') {
                return 27;
            }
            return c.charCodeAt(0) - 96;
        })
    );
}

type CoordinateWeight = { x: number; y: number; distance: number };
type FunctionStuff = (
    grid: number[][],
    position: CoordinateWeight,
    queue: CoordinateWeight[],
    height: number,
) => void;

const itRow = [-1, 0, 1, 0];
const itCol = [0, -1, 0, 1];

function goingUp(
    grid: number[][],
    position: CoordinateWeight,
    queue: CoordinateWeight[],
    height: number,
) {
    for (let i = 0; i < 4; i++) {
        const nextX = position.x + itCol[i];
        const nextY = position.y + itRow[i];
        if (nextX < 0 || nextY < 0 || nextX >= grid[0].length || nextY >= grid.length) {
            continue;
        }
        if (grid[nextY][nextX] - height <= 1) {
            queue.push({
                x: nextX,
                y: nextY,
                distance: position.distance + 1,
            });
        }
    }
}

function goingUpReverse(
    grid: number[][],
    position: CoordinateWeight,
    queue: CoordinateWeight[],
    height: number,
) {
    for (let i = 0; i < 4; i++) {
        const nextX = position.x + itCol[i];
        const nextY = position.y + itRow[i];
        if (nextX < 0 || nextY < 0 || nextX >= grid[0].length || nextY >= grid.length) {
            continue;
        }
        if (height - grid[nextY][nextX] <= 1) {
            queue.push({
                x: nextX,
                y: nextY,
                distance: position.distance + 1,
            });
        }
    }
}

function BFS(
    fn: FunctionStuff,
    grid: number[][],
    start: CoordinateWeight,
    end?: CoordinateWeight,
) {
    const queue: CoordinateWeight[] = [start];
    const visited: Set<string> = new Set();

    while (queue.length > 0) {
        const position = queue.shift()!;
        const key = `${position.x},${position.y}`;

        if (visited.has(key)) {
            continue;
        }

        visited.add(key);

        if (end) {
            if (position.x === end.x && position.y === end.y) {
                return position.distance;
            }
        } else if (grid[position.y][position.x] === 1) {
            return position.distance;
        }

        const height = grid[position.y][position.x];

        fn(grid, position, queue, height);
    }
}

export function part1() {
    const grid = getInput();

    const startRow = grid.findIndex((row) => row.some((column) => column === 0));
    const startCoordinate: CoordinateWeight = {
        x: grid[startRow].findIndex((column) => column === 0),
        y: startRow,
        distance: 0,
    };
    const endRow = grid.findIndex((row) => row.some((column) => column === 27));
    const endCoordinate: CoordinateWeight = {
        x: grid[endRow].findIndex((column) => column === 27),
        y: endRow,
        distance: 0,
    };

    return BFS(goingUp, grid, startCoordinate, endCoordinate);
}

export function part2() {
    const grid = getInput();

    const startRow = grid.findIndex((row) => row.some((column) => column === 27));
    const startCoordinate: CoordinateWeight = {
        x: grid[startRow].findIndex((column) => column === 27),
        y: startRow,
        distance: 0,
    };

    return BFS(goingUpReverse, grid, startCoordinate);
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
