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
const childProcess = require('child_process');

const spawn = childProcess.spawn;
const spawnSync = childProcess.spawnSync;

const configFile = path.join(__dirname, '..', 'installer.config.json');

module.exports = function(pkg, cwd) {

  try {
    var args = ['install', pkg, '-—global'];

    if (fs.existsSync(configFile)) {
      var config = JSON.parse(fs.readFileSync(configFile), 'utf8');
      var npm_config_registry = config.npm_config_registry;
      if (npm_config_registry) {
        args.push(`--registry=${npm_config_registry}`);
      }
    }

    console.log(`${pkg} is installing for the first time with args: ${JSON.stringify(args)}`);

    var filePath = path.join(__dirname, '..', 'scripts', 'loading');
    var loading = spawn('node', [filePath], {
      stdio: [0, 1, 2]
    });

    var proc = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, {
      cwd: cwd || path.join(__dirname, '..'),
      env: process.env
    });

    if (proc.error) {
      throw proc.error;
    }

    loading.kill();

    console.log(proc.stdout.toString());
    console.log(proc.stderr.toString());

    if (proc.status) {
      console.log(`npm install exited with code ${proc.status} and signal ${proc.signal}`);
      throw (proc.error || new Error(proc.stderr));
    }

    var mod = require(pkg);
    console.log(`install ${pkg} success`);
    return mod;
  } catch (e) {
    console.log(`install ${pkg} failed with ${e}`);
  }
};
