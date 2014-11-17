/*global module */
(function () {

    'use strict';

    function Timestamp(val) {
        this.value = val;
    }

    Timestamp.prototype.toSeconds = function () {
        return (this.value / 1000);
    };

    module.exports = Timestamp;

}());
