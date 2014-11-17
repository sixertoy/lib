/*jslint indent: 4 */
/*global require, module */
(function () {

    'use strict';

    var lodash = require('lodash'),
        defaults = {
            value: null
        };

    /**
     *
     */
    function Byte(val) {
        this.options = {
            value: val
        };
        lodash.assign(this.options, defaults);
    }
    lodash.extend(Byte.prototype, {
        toKilobytes: function () {
            return (this.options.value / 1024);
        },
        toMegabytes: function () {
            return (this.options.value / 1048576);
        },
        toGigabytes: function () {
            return (this.options.value / 1073741824);
        }
    });

    module.exports = Byte;

}());
