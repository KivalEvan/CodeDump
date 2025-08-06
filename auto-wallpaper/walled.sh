#!/bin/bash
cd /home/kival/Code/GitRepository/CodeDump/auto-wallpaper/
deno run --allow-read --allow-write --allow-net --allow-run --allow-env --env-file=.env main.ts
