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

const fs = require('fs');
const path = require('path');

const fileName = 'installer.config.json';

if (process.env && process.env.npm_config_registry) {
  var data = JSON.stringify({
    npm_config_registry: process.env.npm_config_registry
  });
  var filePath = path.join(__dirname, '..', fileName);
  fs.writeFileSync(filePath, data);
  console.log(`${filePath} write success`);
}
