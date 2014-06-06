'use strict';

var Rx = require('rx');
var asterGenerate = require('aster-generate');
var writeFile = Rx.Observable.fromNodeCallback(require('fs').writeFile);
var createPath = Rx.Observable.fromNodeCallback(require('mkdirp'));

var path = require('path');
var pathJoin = path.join;
var dirName = path.dirname;

module.exports = function (path, options) {
	var generate = asterGenerate(options);

	return function (files) {
		files = generate(files);

		return files
			.flatMap(function (file) {
				var filePath = pathJoin(path, file.path);

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
};
