import { Md5 } from 'https://deno.land/std/hash/md5.ts';

const key = await Deno.readTextFile('input.txt');

let i = -1;
let str;
do {
    str = new Md5().update(`${key}${++i}`).toString();
} while (str.substr(0, 6) !== '000000');

console.log(i, str);
