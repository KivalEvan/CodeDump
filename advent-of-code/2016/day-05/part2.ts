import { Md5 } from 'https://deno.land/std/hash/md5.ts';

const key = await Deno.readTextFile('input.txt');

let i = -1;
let str;
const password = new Array(8).fill('0');
const used: string[] = [];
let index = 0;
do {
    str = new Md5().update(`${key}${++i}`).toString();
    if (
        str.substring(0, 5) === '00000' &&
        str.substring(5, 6).match(/[0-7]/) &&
        !used.includes(str.substring(5, 6))
    ) {
        index++;
        password[parseInt(str.substring(5, 6))] = str.substring(6, 7);
        used.push(str.substring(5, 6));
        console.log(i, str, password.join(''));
    }
} while (index !== 8);
