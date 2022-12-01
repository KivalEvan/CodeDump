import {
    copySync,
    ensureDirSync,
    ensureFileSync,
    existsSync,
} from 'https://deno.land/std@0.150.0/fs/mod.ts';

for (let year = 2015; year <= new Date().getFullYear(); year++) {
    for (let day = 1; day <= 25; day++) {
        ensureDirSync(`./${year}/day${day > 9 ? day : `0${day}`}`);
        ensureFileSync(`./${year}/day${day > 9 ? day : `0${day}`}/input.txt`);
        ensureFileSync(`./${year}/day${day > 9 ? day : `0${day}`}/test.txt`);
        ensureFileSync(`./${year}/day${day > 9 ? day : `0${day}`}/test2.txt`);
        // if (existsSync(`./${year}/day${day > 9 ? day : `0${day}`}/run.ts`)) {
        //     Deno.renameSync(
        //         `./${year}/day${day > 9 ? day : `0${day}`}/run.ts`,
        //         `./${year}/day${day > 9 ? day : `0${day}`}/main.ts`
        //     );
        // }
        if (!existsSync(`./${year}/day${day > 9 ? day : `0${day}`}/run.ts`)) {
            copySync(
                './template.ts',
                `./${year}/day${day > 9 ? day : `0${day}`}/run.ts`,
            );
        }
    }
}
