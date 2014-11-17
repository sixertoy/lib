/*global module, require, process */
(function () {

    'use strict';

    var FS = require('fs'),
        Path = require('path'),
        console = require('console');

    module.exports = function (path) {

        var base = process.cwd();
        console.debug(base);

    };

}());
