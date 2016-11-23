'use strict';

var Rx = require('rx');
var asterGenerate = require('aster-generate');
var writeFile = Rx.Observable.fromNodeCallback(require('fs').writeFile);
var createPath = Rx.Observable.fromNodeCallback(require('mkdirp'));

var path = require('path');
var pathJoin = path.join;
var dirName = path.dirname;

function defaultDestinator(options) {
	return function (files) {
		files = options.generate(files);

		return files
			.flatMap(function (file) {
				var filePath = pathJoin(options.path, file.path);

				return createPath(dirName(filePath)).map(function () {
					return {
						path: filePath,
						contents: file.contents
					};
				});
			})
			.flatMap(function (file) {
				return writeFile(file.path, file.contents);
			})
			.zip(files, function (result, file) { return file });
	};
}

module.exports = function (path, options) {
	if (path === Object(path)) {
		options = path
	}
	options = options || {};

	var generator = options.generator || asterGenerate;
	var generate = typeof generator === 'function' ? generator(options) : generator;

	options.generate = generate
	options.path = path

	var destinator = options.destinator || defaultDestinator
	var dest = typeof destinator === 'function' ? destinator(options) : destinator

	return dest
};
