var SingletonEnforcer = function () {},
    Lodash = require('lodash'),
    Base = require('class-extend'),
    Notification = require('./notification'),
    AbstractFacade = require('./abstract-facade'),
    AbstractCommand = require('./abstract-command'),
    AbstractMediator = require('./abstract-mediator'),

    Notifier = Base.extend({

        constructor: function (enforcer) {
            if (enforcer instanceof SingletonEnforcer) {
                this._commands = {};
                this._facade = null;
                this._mediators = {};
            } else {
                throw new Error('Notifier instance must be created by Notifier.getInstance()');
            }
        },

        sendNotification: function (notification) {
            var command, type, data,
                valid = (arguments.length < 1 || Lodash.isEmpty(notification) || !(notification instanceof Notification));
            if (valid) {
                throw new Error('Notifier.sendNotification() needs 1 argument at least');
            }
            type = notification.getType();
            data = notification.getData();
            command = this.retrieveCommand(type);
            if (command) {
                command.execute(data);
                return this;
            } else {
                console.error('Unable to find command for type ' + type);
                return false;
            }
        },

        setFacade: function (facade) {
            var valid = (arguments.length < 1 || Lodash.isEmpty(facade) || !(facade instanceof AbstractFacade));
            if (valid) {
                throw new Error('Notifier.setFacade() needs 1 argument at least');
            }
            this._facade = facade;
            return this;
        },

        getFacade: function () {
            return this._facade;
        },

        /**
         *
         *
         *
         */
        registerCommand: function (key, Command) {
            var valid = (arguments.length < 2 || !Lodash.isString(key) || Lodash.isEmpty(key) || Command.__super__ !== AbstractCommand.prototype);
            if (valid) {
                throw new Error('Notifier.registerCommand() needs 2 valid arguments');
            }
            if (!this.retrieveCommand(key)) {
                Command.setNotifier(this);
                this._commands[key] = Command;
                return this;
            } else {
                return false;
            }
        },

        registerMediator: function (key, mediator) {
            var valid = (arguments.length < 2 || !Lodash.isString(key) || Lodash.isEmpty(key) || Lodash.isEmpty(mediator) || !(mediator instanceof AbstractMediator));
            if (valid) {
                throw new Error('Notifier.registerMediator() needs 2 valid arguments');
            }
            if (!this.retrieveMediator(key)) {
                mediator.setNotifier(this);
                this._mediators[key] = mediator;
                return this;
            } else {
                return false;
            }
        },

        retrieveCommand: function (name) {
            if (arguments.length < 1 || !Lodash.isString(name) || Lodash.isEmpty(name)) {
                throw new Error('Notifier.retrieveCommand() needs 1 arguments at least');
            }
            if (this._commands.hasOwnProperty(name)) {
                return this._commands[name];
            }
            return false;
        },

        retrieveMediator: function (name) {
            if (arguments.length < 1 || !Lodash.isString(name) || Lodash.isEmpty(name)) {
                throw new Error('Notifier.retrieveMediator() needs 1 arguments at least');
            }
            if (this._mediators.hasOwnProperty(name)) {
                return this._mediators[name];
            }
            return false;
        },
        __gc__: function () {
            this._facade = null;
            this._commands = {};
            this._mediators = {};
        }

    }, {
        instance: null,
        getInstance: function () {
            if (Notifier.instance === null) {
                var enforcer = new SingletonEnforcer();
                Notifier.instance = new Notifier(enforcer);
            }
            return Notifier.instance;
        }
    });

// fix circular dependencies
// @see http://requirejs.org/docs/api.html#circular
exports.notifier = Notifier;
