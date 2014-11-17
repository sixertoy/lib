/*jslint indent: 4 */
/*global require, module, process */
(function () {

    'use strict';

    var FS = require('fs'),
        Path = require('path');

    /**
     * Synchronous method for include
     * From root path
     *
     * @params path [string] path/to/module_to_include
     * @return string
     */
    module.exports = function (path, bool) {
        // privates methods
        // not exposed
        var core = {
                // returns current process working directory
                cwd: function () {
                    return process.cwd();
                },
                // returns current module filename
                // wich call include
                caller: function () {
                    return module.parent.filename;
                },
                // returns current module dirname
                // wich call include
                dirname: function () {
                    return Path.dirname(this.caller());
                }
            },
            stats,
            relative = Path.relative(core.dirname(), core.cwd()),
            pathstring = Path.join(relative, path);
        try {
            stats = FS.existsSync(pathstring);
            return (bool ? pathstring : require(pathstring));
        } catch (e) {
            throw new Error('Unable to locate module' + Path.basename(pathstring) + ', required by ' + core.caller() + '.');
        }
    };

}());
