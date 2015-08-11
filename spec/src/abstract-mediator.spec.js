/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var Sinon = require('sinon'),
        cwd = process.cwd() + '/src/mvc/',
        Notification = require(cwd + 'notification'),
        Notifier = require(cwd + 'notifier').notifier,
        AbstractMediator = require(cwd + 'abstract-mediator');

    describe('AbstractMediator', function () {
        Notifier.getInstance().__gc__(); // clear all statics vars
        //
        var result, mediator, Mediator, notifier, notification;
        describe('create a child instance', function () {
            it('retuns a new mediator', function () {
                Mediator = AbstractMediator.extend({}, {});
                mediator = new Mediator('noop-1');
                result = mediator.getName();
                expect(result).toEqual('noop-1');
                expect(Mediator.extend).toBeDefined();
                expect(mediator instanceof AbstractMediator).toBe(true);
                expect(Mediator.__super__ === AbstractMediator.prototype).toBe(true);
            });
        });
        describe('setNotifier', function () {
            it('throws', function () {
                Mediator = AbstractMediator.extend({}, {});
                mediator = new Mediator('noop');
                expect(function () {
                    mediator.setNotifier();
                }).toThrow('AbstractMediator.setNotifier() needs 1 argument');
                expect(function () {
                    mediator.setNotifier({});
                }).toThrow('AbstractMediator.setNotifier() needs 1 argument');
                expect(function () {
                    mediator.setNotifier({
                        prop: 'test'
                    });
                }).toThrow('AbstractMediator.setNotifier() needs 1 argument');
                expect(function () {
                    mediator.setNotifier([]);
                }).toThrow('AbstractMediator.setNotifier() needs 1 argument');
                expect(function () {
                    mediator.setNotifier(false);
                }).toThrow('AbstractMediator.setNotifier() needs 1 argument');
                expect(function () {
                    mediator.setNotifier(true);
                }).toThrow('AbstractMediator.setNotifier() needs 1 argument');
                expect(function () {
                    mediator.setNotifier('toto');
                }).toThrow('AbstractMediator.setNotifier() needs 1 argument');
            });
        });
        describe('sendNotification', function () {
            beforeEach(function () {
                notifier = Notifier.getInstance();
                Sinon.spy(notifier, 'sendNotification');
            });
            it('throws', function () {
                Mediator = AbstractMediator.extend({}, {});
                mediator = new Mediator('noop');
                expect(function () {
                    mediator.sendNotification();
                }).toThrow('AbstractMediator.sendNotification() needs 1 argument');
                expect(function () {
                    // not registered
                    notification = new Notification('noop', {});
                    mediator.sendNotification(notification);
                }).toThrow('AbstractMediator.sendNotification() needs 1 argument');
            });
            it('notifier sendNotification called', function () {
                Mediator = AbstractMediator.extend({}, {});
                mediator = new Mediator('noop');
                notifier.registerMediator(mediator.getName(), mediator);
                notification = new Notification('noop', {});
                mediator.sendNotification(notification);
                expect(notifier.sendNotification.calledOnce).toBe(true);
            });
            afterEach(function () {
                notifier.sendNotification.restore();
            });
        });
        describe('initView', function () {
            it('returns mediator', function () {
                mediator = new AbstractMediator('noop3');
                result = mediator.initView();
                expect(result).toBe(mediator);
                expect(result).toEqual(mediator);
            });
        });
        describe('getNotifier', function () {
            it('returns null is null', function () {
                mediator = new AbstractMediator('noop3');
                result = mediator.getNotifier();
                expect(result).toEqual(null);
            });
            it('returns notifier instance', function () {
                //
                notifier = Notifier.getInstance();
                mediator = new AbstractMediator('noop4');
                notifier.registerMediator(mediator.getName(), mediator);
                result = mediator.getNotifier();
                expect(result).toEqual(notifier);
            });
        });
        describe('getName', function () {
            it('retuns mediator name', function () {
                mediator = new AbstractMediator('noop5');
                result = mediator.getName();
                expect(result).toEqual('noop5');
            });
        });
    });

}());
