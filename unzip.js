#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')
const pkg = require('./package')
const zip = require('@tybys/cross-zip')

if (argv.help || (Object.keys(argv).length === 1 && argv._.length === 0)) {
  fs.createReadStream(path.join(__dirname, './unzip-usage.txt')).pipe(process.stdout)
} else if (argv.version) {
  console.log(pkg.version)
} else {
  const inPath = argv._[0]
  let outPath = argv._[1]

  // TODO: zip file may not have '.zip' extension
  if (!outPath) outPath = inPath.replace('.zip', '')

  zip.unzip(inPath, outPath)
}
