import { Md5 } from 'https://deno.land/std/hash/md5.ts';

const key = await Deno.readTextFile('input.txt');

let i = -1;
let str;
let password = '';
let index = 0;
do {
    str = new Md5().update(`${key}${++i}`).toString();
    if (str.substring(0, 5) === '00000') {
        index++;
        password += str.substring(5, 6);
        console.log(i, str, password);
    }
} while (index !== 8);
