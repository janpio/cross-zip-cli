@janpio/cross-zip-cli
=============

[![npm][npm-image]][npm-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/@janpio/cross-zip-cli.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@janpio/cross-zip-cli
[travis-url]: https://travis-ci.org/jprichardson/cross-zip-cli
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

Zip/Unzip directories cross platform from the CLI (without including the base directory). Great for npm scripts. Built on [@tybys/cross-zip](https://github.com/toyobayashi/cross-zip). Fork of [cross-zip-cli](https://github.com/jprichardson/cross-zip-cli)

## Why?

This is really useful for zipping/unzipping in your npm scripts that should run on cross-platform.


## Install

```
npm install -g cross-zip-cli
```

## Usage

### cross-zip

```
cross-zip [options] inputDir [zipFile]

  Zips a directory.

Examples:

  cross-zip /tmp/data
  cross-zip /tmp/data /tmp/data-reports.zip

Options:

  --help This message that you're viewing.
  --version The version.
```

### cross-unzip

```

  cross-unzip [options] zipFile outputDir

    Unzips a file.

  Examples:

    cross-unzip /tmp/data-reports.zip /tmp/data

  Options:

    --help This message that you're viewing.
    --version The version.

```

## Related
- Built on [@tybys/cross-zip](https://github.com/toyobayashi/cross-zip): npm module this is built on.
- [cross-zip-cli](https://github.com/jprichardson/cross-zip-cli): package this fork is based on.
- [cross-zip][cross-zip]: npm module the parent is based on.

## License

[MIT](LICENSE.md)


[cross-zip]: https://github.com/feross/cross-zip
