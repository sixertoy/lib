/*jslint plusplus: true, indent: 4 */
/*global module, require, console, jasmine, describe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var lib = require('smile-lib'),
        smile = require('./../../lib/smile');

    describe('smile', function () {

        describe('Exposed modules', function () {

            it('Should "smile.include" be a function', function () {
                expect(lib.include).toEqual(jasmine.any(Function));
                expect(smile.include).toEqual(jasmine.any(Function));
            });

        });

    });

}());
