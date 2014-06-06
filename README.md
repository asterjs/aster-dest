# aster-dest
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> File writer for aster.

## Usage

This module is part of [aster](https://npmjs.org/package/aster) and is available via `aster.dest`.

You use it in build scripts whenever you want to generate and write out processed files into folder:

```javascript
var aster = require('aster');

aster.src([
  '**/*.js',
  '!node_modules/**'
])
.map(plugin1(optionsForPlugin1))
.map(plugin2(optionsForPlugin2))
// ...
.map(aster.dest('dist', {sourceMap: true}))
.subscribe(aster.runner);
```

## API

### dest(path, options)
Type: [`Rx.Observable`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md)`<{path: string, contents: string}>`

#### path
Type: `String`

Destination folder.

#### options
Type: `Object`

[aster-generate](https://github.com/asterjs/aster-generate)/[escodegen](https://github.com/Constellation/escodegen) code generation options.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-dest
[npm-image]: https://badge.fury.io/js/aster-dest.png

[travis-url]: http://travis-ci.org/asterjs/aster-dest
[travis-image]: https://secure.travis-ci.org/asterjs/aster-dest.png?branch=master
