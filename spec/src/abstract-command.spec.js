/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var cwd = process.cwd() + '/src/mvc/',
        Notifier = require(cwd + 'notifier').notifier,
        AbstractCommand = require(cwd + 'abstract-command');

    describe('AbstractCommand', function () {
        var command, Command, notifier;
        describe('constructor', function () {
            it('returns instance of command', function () {
                Command = AbstractCommand.extend();
                command = new Command();
                expect(command instanceof Command).toBe(true);
            });
        });
        describe('setNotifier', function () {
            it('throws', function () {
                expect(function () {
                    Command = AbstractCommand.extend();
                    notifier = Notifier.getInstance();
                    Command.setNotifier();
                }).toThrow();
            });
            it('not throws', function () {
                expect(function () {
                    Command = AbstractCommand.extend();
                    notifier = Notifier.getInstance();
                    notifier.registerCommand(Command.getName(), Command);
                }).not.toThrow();
            });
        });
        describe('getNotifier', function () {
            it('notifier is setted', function () {
                Command = AbstractCommand.extend();
                notifier = Notifier.getInstance();
                notifier.registerCommand(Command.getName(), Command);
                expect(Command.getNotifier()).toEqual(notifier);
            });
        });
        describe('getName', function () {
            it('returns string', function () {
                Command = AbstractCommand.extend();
                notifier = Notifier.getInstance();
                var name = Command.getName();
                expect(name).toBe('abstract-command');
            });
        });
    });

}());
