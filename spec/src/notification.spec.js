/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var cwd = process.cwd() + '/src/mvc/',
        Notification = require(cwd + 'notification');

    describe('Notification', function () {
        var target, result,
            instance = new Notification();
        describe('setData()', function () {
            describe('getData()', function () {
                it('returns null', function () {
                    expect(instance.getData()).toBe(undefined);
                });
            });
            it('throws', function () {
                expect(function () {
                    instance.setData();
                }).toThrow();
                expect(function () {
                    instance.setData([]);
                }).toThrow();
                expect(function () {
                    instance.setData(false);
                }).toThrow();
                expect(function () {
                    instance.setData('toto');
                }).toThrow();
                expect(function () {
                    instance.setData(1234);
                }).toThrow();
            });
            it('not throws', function () {
                expect(function () {
                    target = {};
                    instance.setData(target);
                }).not.toThrow();
                expect(function () {
                    target = {
                        prop: 1234
                    };
                    instance.setData(target);
                }).not.toThrow();
            });
            describe('getData()', function () {
                it('returns {prop:1234}', function () {
                    result = instance.getData();
                    expect(result).toEqual(target);
                });
            });
        });
        describe('setType()', function () {
            describe('getType()', function () {
                it('returns null', function () {
                    expect(instance.getType()).toBe(undefined);
                });
            });
            it('throws', function () {
                expect(function () {
                    instance.setType();
                }).toThrow();
                expect(function () {
                    instance.setType([]);
                }).toThrow();
                expect(function () {
                    instance.setType(false);
                }).toThrow();
                expect(function () {
                    instance.setType({});
                }).toThrow();
                expect(function () {
                    instance.setType(1234);
                }).toThrow();
            });
            it('not throws', function () {
                expect(function () {
                    target = 'type';
                    instance.setType(target);
                }).not.toThrow();
            });
            describe('getType()', function () {
                it('returns type', function () {
                    result = instance.getType();
                    expect(result).toEqual(target);
                });
            });
        });
    });

}());
