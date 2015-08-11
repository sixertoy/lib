/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var Sinon = require('sinon'),
        cwd = process.cwd() + '/src/mvc/',
        Notification = require(cwd + 'notification'),
        Notifier = require(cwd + 'notifier').notifier,
        AbstractFacade = require(cwd + 'abstract-facade');

    describe('AbstractFacade', function () {
        var notification, Facade, facade, result, config, notifier;
        describe('constructor', function () {
            it('not throws', function () {
                expect(function () {
                    Facade = AbstractFacade.extend();
                    facade = new Facade();
                }).not.toThrow();
            });
        });
        describe('initialize', function () {
            it('throws', function () {
                expect(function () {
                    Facade = AbstractFacade.extend();
                    facade = new Facade();
                    facade.initialize();
                }).toThrow('AbstractFacade.initialize() needs 2 arguments');
                expect(function () {
                    Facade = AbstractFacade.extend();
                    facade = new Facade();
                    facade.initialize(null);
                }).toThrow('AbstractFacade.initialize() needs 2 arguments');
                expect(function () {
                    Facade = AbstractFacade.extend();
                    facade = new Facade();
                    facade.initialize({});
                }).toThrow('AbstractFacade.initialize() needs 2 arguments');
            });
            it('not throws', function () {
                expect(function () {
                    notifier = Notifier.getInstance();
                    Facade = AbstractFacade.extend();
                    facade = new Facade();
                    facade.initialize(notifier);
                }).not.toThrow();
            });
            it('called once', function () {
                notifier = Notifier.getInstance();
                Sinon.spy(notifier, 'setFacade');
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                expect(notifier.setFacade.calledOnce).toBe(true);
                notifier.setFacade.restore();
            });
        });
        describe('config', function () {
            it('set config', function () {
                notifier = Notifier.getInstance();
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                expect(facade._config).toEqual({});
                facade.initialize(notifier, {
                    prop: 'toto'
                });
                expect(facade._config).toEqual({
                    prop: 'toto'
                });
                facade.initialize(notifier, 'toto');
                expect(facade._config).toEqual({});
            });
        });
        describe('notifier', function () {
            it('set notifier', function () {
                notifier = Notifier.getInstance();
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                expect(facade._notifier).toBe(notifier);
                expect(facade._notifier).toEqual(notifier);
            });
        });
        describe('registerCommands', function () {
            it('returns facade', function () {
                notifier = Notifier.getInstance();
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                expect(facade.registerCommands()).toBe(facade);
                expect(facade.registerCommands()).toEqual(facade);
            });
        });
        describe('registerMediators', function () {
            it('returns facade', function () {
                notifier = Notifier.getInstance();
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                expect(facade.registerMediators()).toBe(facade);
                expect(facade.registerMediators()).toEqual(facade);
            });
        });
        describe('config', function () {
            it('returns config', function () {
                notifier = Notifier.getInstance();
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                expect(facade.config()).toEqual({});
                facade.initialize(notifier, 'toto');
                expect(facade.config()).toEqual({});
                facade.initialize(notifier, {
                    prop: 'toto'
                });
                expect(facade.config()).toEqual({
                    prop: 'toto'
                });
            });
        });
        describe('notifier', function () {
            it('returns notifier', function () {
                notifier = Notifier.getInstance();
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                expect(facade.notifier()).toBe(notifier);
                expect(facade.notifier()).toEqual(notifier);
            });
        });
        describe('start', function () {
            it('returns facade', function () {
                notifier = Notifier.getInstance();
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                expect(facade.start()).toBe(facade);
                expect(facade.start()).toEqual(facade);
            });
        });
        describe('sendNotification', function () {
            it('throws', function () {
                Facade = AbstractFacade.extend();
                facade = new Facade('noop');
                expect(function () {
                    facade.sendNotification();
                }).toThrow('AbstractFacade.sendNotification() needs 1 argument');
            });
            it('notifier sendNotification called', function () {
                notifier = Notifier.getInstance();
                Sinon.spy(notifier, 'sendNotification');
                //
                Facade = AbstractFacade.extend();
                facade = new Facade();
                facade.initialize(notifier);
                notification = new Notification('noop', {});
                facade.sendNotification(notification);
                expect(notifier.sendNotification.calledOnce).toBe(true);
                notifier.sendNotification.restore();
            });
        });
    });

}());
