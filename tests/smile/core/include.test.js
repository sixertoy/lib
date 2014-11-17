/*jslint plusplus: true, indent: 4 */
/*global module, require, console, jasmine, describe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var include = require('./../../../lib/smile/core/include');

    describe('smile/core/include', function () {

        describe('constructor', function () {

            it('Should be a function', function () {
                expect(include).toEqual(jasmine.any(Function));
            });

            it('Should return a relative path string', function () {
                var result = include('lib/smile/core/include', true);
                expect(result).toEqual(jasmine.any(String));
            });

            it('Should return an object', function () {
                var result = include('lib/smile/core/include');
                expect(result).toEqual(jasmine.any(Function));
            });

            it('Should throw an error', function () {
                expect(function () {
                    include('path/to/non/existent');
                }).toThrow();
            });

        });

    });

}());
