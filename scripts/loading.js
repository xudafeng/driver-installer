#!/usr/bin/env node
/* ================================================================
 * node-installer by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Mar 07 2016 11:34:19 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var EOL = require('os').EOL;

var frames = ['/', '-', '|', '\\', '-', '|'];

var timer;
var frame = 0;

setInterval(() => {
  if (process.stdout.clearLine) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`  ${frames[frame % frames.length]}     loading...`);
    frame++;
  }
}, 100);

console.log(EOL);
