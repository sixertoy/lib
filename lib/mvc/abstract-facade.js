var Lodash = require('lodash'),
    Base = require('class-extend'),
    Notifier = require('./notifier'),
    Notification = require('./notification'),

    AbstractFacade = Base.extend({

        constructor: function () {
            this._config = null;
            this._notifier = null;
        },

        initialize: function (notifier, config) {
            if (arguments.length < 1 || !(notifier instanceof Notifier.notifier)) {
                throw new Error('AbstractFacade.initialize() needs 2 arguments');
            }
            this._notifier = notifier;
            this._notifier.setFacade(this);
            this._config = Lodash.isPlainObject(config) ? config : {};
            return this;
        },

        sendNotification: function (notification) {
            var valid = (arguments.length < 1 || !(notification instanceof Notification));
            if (valid) {
                throw new Error('AbstractFacade.sendNotification() needs 1 argument');
            }
            this._notifier.sendNotification(notification);
            return this;
        },

        config: function () {
            return this._config;
        },

        notifier: function () {
            return this._notifier;
        },

        registerCommands: function () {
            return this;
        },

        registerMediators: function () {
            return this;
        },

        start: function () {
            return this;
        }

    }, {});

/*global module */
module.exports = AbstractFacade;
