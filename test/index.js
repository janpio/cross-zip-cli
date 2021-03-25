const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const spawn = require('cross-spawn')
const test = require('tape')

test('zip / unzip', function (t) {
  t.plan(9)

  const zip = path.join(__dirname, '../zip.js')
  const unzip = path.join(__dirname, '../unzip.js')

  const testDir = path.join(os.tmpdir(), 'cross-zip-cli')
  fs.emptyDirSync(testDir)
  let dirToZip = createFixtures(testDir)
  const zipFile = dirToZip + '.zip'

  // zip it
  const zipResults = spawn.sync(zip, [dirToZip, zipFile])
  t.strictEqual(zipResults.status, 0, 'zip return code 0')
  t.strictEqual(zipResults.stdout.toString('utf8').trim(), '', 'no text to display')
  t.true(fs.existsSync(zipFile), 'zip file created')

  // unzip it
  fs.removeSync(dirToZip)

  const unzipResults = spawn.sync(unzip, [zipFile, dirToZip])
  t.strictEqual(unzipResults.status, 0, 'unzip return code 0')
  t.strictEqual(unzipResults.stdout.toString('utf8').trim(), '', 'no text to display')
  t.true(fs.existsSync(dirToZip), 'unzip dir created')

  // may need to change this silliness
  if (process.platform !== 'win32') {
    dirToZip = path.join(dirToZip, 'gonna-zip-this')
  }

  fs.readdirSync(dirToZip).forEach(file => {
    console.log(file)
  })

  t.strictEqual(fs.readFileSync(path.join(dirToZip, 'f1.txt'), 'utf8'), 'hello1', 'contents of file 1')
  t.strictEqual(fs.readFileSync(path.join(dirToZip, 'f2.txt'), 'utf8'), 'hello2', 'contents of file 2')
  t.strictEqual(fs.readFileSync(path.join(dirToZip, 'subdir', 'f3.txt'), 'utf8'), 'hello3', 'contents of file 3')

  t.end()
})

test('zip / unzip (without params)', function (t) {
  t.plan(9)

  const zip = path.join(__dirname, '../zip.js')
  const unzip = path.join(__dirname, '../unzip.js')

  const testDir = path.join(os.tmpdir(), 'cross-zip-cli')
  fs.emptyDirSync(testDir)
  let dirToZip = createFixtures(testDir)
  const zipFile = dirToZip + '.zip'

  // zip it
  const zipResults = spawn.sync(zip, [dirToZip])
  t.strictEqual(zipResults.status, 0, 'zip return code 0')
  t.strictEqual(zipResults.stdout.toString('utf8').trim(), '', 'no text to display')
  t.true(fs.existsSync(zipFile), 'zip file created')

  // unzip it
  fs.removeSync(dirToZip)

  const unzipResults = spawn.sync(unzip, [zipFile])
  t.strictEqual(unzipResults.status, 0, 'unzip return code 0')
  t.strictEqual(unzipResults.stdout.toString('utf8').trim(), '', 'no text to display')
  t.true(fs.existsSync(dirToZip), 'unzip dir created')

  // may need to change this silliness
  if (process.platform !== 'win32') {
    dirToZip = path.join(dirToZip, 'gonna-zip-this')
  }

  fs.readdirSync(dirToZip).forEach(file => {
    console.log(file)
  })

  t.strictEqual(fs.readFileSync(path.join(dirToZip, 'f1.txt'), 'utf8'), 'hello1', 'contents of file 1')
  t.strictEqual(fs.readFileSync(path.join(dirToZip, 'f2.txt'), 'utf8'), 'hello2', 'contents of file 2')
  t.strictEqual(fs.readFileSync(path.join(dirToZip, 'subdir', 'f3.txt'), 'utf8'), 'hello3', 'contents of file 3')

  t.end()
})

function createFixtures (testDir) {
  const zipDir = path.join(testDir, 'gonna-zip-this')

  fs.outputFileSync(path.join(zipDir, 'f1.txt'), 'hello1')
  fs.outputFileSync(path.join(zipDir, 'f2.txt'), 'hello2')
  fs.outputFileSync(path.join(zipDir, 'subdir', 'f3.txt'), 'hello3')

  return zipDir
}
