/*jslint indent: 4 */
/*global require, module, Date */
(function () {

    'use strict';

    var lodash = require('lodash'),
        defaults = {
            ticks: null,
            stoppedAt: null,
            startedAt: null
        };

    function Clock() {
        this.options = {
            ticks: []
        };
        lodash.assign(this.options, defaults);
    }
    lodash.extend(Clock.prototype, {
        isRunning: function () {
            return (this.options.ticks.length > 0);
        },
        start: function () {
            this.options.stoppedAt = null;
            this.options.startedAt = Date.now();
            this.ticks.push(this.options.startedAt);
            return this.options.stoppedAt;
        },
        stop: function () {
            this.options.ticks = [];
            this.options.stoppedAt = Date.now();
            return (this.options.stoppedAt - this.options.startedAt);
        },
        tick: function () {
            this.options.ticks.push(Date.now());
            return (this.options.ticks[(this.options.ticks.length - 1)] - this.options.startedAt);
        },
        last: function () {
            return (this.options.ticks[(this.optionsticks.length - 1)] - this.options.startedAt);
        },
        elapsed: function () {
            return (Date.now() - this.options.startedAt);
        },
        clear: function () {
            this.options.ticks = [];
            this.options.stoppedAt = null;
            this.options.startedAt = null;
        },
        stopAndClear: function (seconds) {
            var time = this.stop();
            this.clear();
            if (seconds) {
                return (time / 1000);
            } else {
                return time;
            }
        }
    });

    module.exports = Clock;

}());
