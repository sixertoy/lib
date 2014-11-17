/*jslint plusplus: true, indent: 4 */
/*global module, require, console, jasmine, describe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var smnolde = require('../../lib/smile');

    describe('smile', function () {

        describe('Exposed modules', function () {

            it('Should "smile.include" be a function', function () {
                expect(smnolde.include).toEqual(jasmine.any(Function));
            });

        });

    });

}());
