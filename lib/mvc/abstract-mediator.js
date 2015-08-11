var Lodash = require('lodash'),
    Base = require('class-extend'),
    Notifier = require('./notifier'),
    Notification = require('./notification'),

    AbstractMediator = Base.extend({

        constructor: function (name) {
            this._name = name;
            this._notifier = null;
        },

        getNotifier: function () {
            return this._notifier;
        },

        setNotifier: function (notifier) {
            var valid = (arguments.length < 1 || Lodash.isEmpty(notifier) || !(notifier instanceof Notifier.notifier));
            if (valid) {
                throw new Error('AbstractMediator.setNotifier() needs 1 argument');
            }
            this._notifier = notifier;
            return this;
        },

        sendNotification: function (notification) {
            var valid = (arguments.length < 1 || Lodash.isEmpty(notification) || !(notification instanceof Notification) || !(this._notifier instanceof Notifier.notifier));
            if (valid) {
                throw new Error('AbstractMediator.sendNotification() needs 1 argument');
            }
            this._notifier.sendNotification(notification);
            return this;
        },

        getName: function () {
            return this._name;
        },

        initView: function () {
            return this;
        }

    }, {});

/*global module */
module.exports = AbstractMediator;
