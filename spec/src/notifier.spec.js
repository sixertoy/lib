/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var Path = require('path'),
        Sinon = require('sinon'),
        MVC = require(Path.join(process.cwd(), 'src', 'mvc')),
        Notifier = MVC.notifier,
        Notification = MVC.notification,
        AbstractFacade = MVC.abstractFacade,
        AbstractCommand = MVC.abstractCommand,
        AbstractMediator = MVC.abstractMediator;

    describe('Notifier', function () {
        var Command, mediator, Mediator, result, notification, Facade, facade,
            instance = Notifier.getInstance();
        instance.__gc__(); // clear all statics vars
        describe('sendNotification()', function () {
            it('throws', function () {
                expect(function () {
                    instance.sendNotification();
                }).toThrow('Notifier.sendNotification() needs 1 argument at least');
                expect(function () {
                    instance.sendNotification(null);
                }).toThrow('Notifier.sendNotification() needs 1 argument at least');
                expect(function () {
                    instance.sendNotification({});
                }).toThrow('Notifier.sendNotification() needs 1 argument at least');
            });
            it('log error', function () {
                Command = AbstractCommand.extend();
                instance.registerCommand(Command.getName(), Command);
                notification = new Notification('noop', {});
                Sinon.spy(console, 'error');
                Sinon.spy(instance, 'retrieveCommand');
                result = instance.sendNotification(notification);
                expect(instance.retrieveCommand.calledOnce).toBe(true);
                expect(console.error.calledOnce).toBe(true);
                expect(result).toBe(false);
                instance.retrieveCommand.restore();
                console.error.restore();
            });
            it('do not log error', function () {
                instance.__gc__();
                Command = AbstractCommand.extend();
                instance.registerCommand(Command.getName(), Command);
                notification = new Notification(Command.getName(), {});
                Sinon.spy(console, 'error');
                Sinon.spy(Command, 'execute');
                result = instance.sendNotification(notification);
                expect(Command.execute.calledOnce).toBe(true);
                expect(console.error.calledOnce).toBe(false);
                expect(result).toBe(instance);
                Command.execute.restore();
                console.error.restore();
            });
        });

        describe('registerMediator()', function () {
            it('throws', function () {
                expect(function () {
                    instance.registerMediator();
                }).toThrow('Notifier.registerMediator() needs 2 valid arguments');
                expect(function () {
                    instance.registerMediator('toto');
                }).toThrow('Notifier.registerMediator() needs 2 valid arguments');
                expect(function () {
                    mediator = function () {};
                    instance.registerMediator('toto', mediator);
                }).toThrow('Notifier.registerMediator() needs 2 valid arguments');
            });
            it('not throws', function () {
                instance.__gc__();
                Mediator = AbstractMediator.extend();
                mediator = new Mediator('noop');
                Sinon.stub(mediator, 'setNotifier');
                expect(function () {
                    result = instance.registerMediator(mediator.getName(), mediator);
                }).not.toThrow();
                expect(mediator.setNotifier.calledOnce).toBe(true);
                expect(result).toBe(instance);
                mediator.setNotifier.restore();
            });
            it('returns false, already registered', function () {
                Mediator = AbstractMediator.extend();
                mediator = new Mediator('noop');
                result = instance.registerMediator(mediator.getName(), mediator);
                expect(result).toBe(false);
            });
        });

        describe('retrieveMediator()', function () {
            it('throws', function () {
                expect(function () {
                    instance.retrieveMediator();
                }).toThrow('Notifier.retrieveMediator() needs 1 arguments at least');
                expect(function () {
                    instance.retrieveMediator('');
                }).toThrow('Notifier.retrieveMediator() needs 1 arguments at least');
            });
            it('returns a mediator', function () {
                Mediator = AbstractMediator.extend();
                mediator = new Mediator('noop');
                expect(function () {
                    instance.registerMediator(mediator.getName(), mediator);
                    result = instance.retrieveMediator(mediator.getName());
                }).not.toThrow();
                expect(result instanceof AbstractMediator).toBe(true);
            });
        });

        describe('getFacade()', function () {
            it('returns null', function () {
                result = instance.getFacade();
                expect(result instanceof AbstractFacade).toBe(false);
            });
        });

        describe('setFacade()', function () {
            it('throws', function () {
                expect(function () {
                    instance.setFacade();
                }).toThrow('Notifier.setFacade() needs 1 argument at least');
                expect(function () {
                    instance.setFacade(null);
                }).toThrow('Notifier.setFacade() needs 1 argument at least');
                expect(function () {
                    facade = {};
                    instance.setFacade(facade);
                }).toThrow('Notifier.setFacade() needs 1 argument at least');
                expect(function () {
                    facade = function () {};
                    instance.setFacade(facade);
                }).toThrow('Notifier.setFacade() needs 1 argument at least');
                expect(function () {
                    facade = AbstractFacade.extend();
                    instance.setFacade(facade);
                }).toThrow('Notifier.setFacade() needs 1 argument at least');
            });
            it('not throws', function () {
                Facade = AbstractFacade.extend();
                expect(function () {
                    instance.setFacade(new Facade());
                }).not.toThrow();
            });
        });

        describe('getFacade()', function () {
            it('returns a facade object', function () {
                Facade = AbstractFacade.extend();
                instance.setFacade(new Facade());
                expect(instance.getFacade() instanceof AbstractFacade).toBe(true);
            });
        });

        describe('registerCommand()', function () {
            it('throws', function () {
                expect(function () {
                    instance.registerCommand();
                }).toThrow('Notifier.registerCommand() needs 2 valid arguments');
                expect(function () {
                    instance.registerCommand('toto');
                }).toThrow('Notifier.registerCommand() needs 2 valid arguments');
                expect(function () {
                    var command = function () {};
                    instance.registerCommand('toto', command);
                }).toThrow('Notifier.registerCommand() needs 2 valid arguments');
            });
            it('not throws', function () {
                Command = AbstractCommand.extend();
                expect(function () {
                    instance.registerCommand(Command.getName(), Command);
                }).not.toThrow();
            });
            it('returns false, already registered', function () {
                Command = AbstractCommand.extend();
                result = instance.registerCommand(Command.getName(), Command);
                expect(result).toBe(false);
            });
        });

        describe('retrieveCommand()', function () {
            it('throws', function () {
                expect(function () {
                    instance.retrieveCommand();
                }).toThrow('Notifier.retrieveCommand() needs 1 arguments at least');
                expect(function () {
                    instance.retrieveCommand('');
                }).toThrow('Notifier.retrieveCommand() needs 1 arguments at least');
            });
            it('returns a command', function () {
                Command = AbstractCommand.extend({}, {});
                result = instance.retrieveCommand(Command.getName());
                expect(result.__super__ === AbstractCommand.prototype).toBe(true);
            });
        });

        describe('getInstance', function () {
            it('returns an instance', function () {
                expect(instance instanceof Notifier).toBe(true);
            });
        });

        describe('constructor', function () {
            it('throws', function () {
                expect(function () {
                    var notifier = new Notifier();
                }).toThrow('Notifier instance must be created by Notifier.getInstance()');
            });
        });
    });

}());
