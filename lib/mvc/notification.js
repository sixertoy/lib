var Lodash = require('lodash'),
    Base = require('class-extend'),
    Notification = Base.extend({

        constructor: function (type, data) {
            this._type = type;
            this._data = data;
        },

        getData: function () {
            return this._data;
        },

        setData: function (value) {
            var valid = arguments.length > 0 && Lodash.isPlainObject(value);
            if (!valid) {
                throw new Error('Notification.setData() needs one argument at least');
            }
            this._data = value;
            return this;
        },

        getType: function () {
            return this._type;
        },

        setType: function (value) {
            var valid = arguments.length > 0 && Lodash.isString(value) && !Lodash.isEmpty(value);
            if (!valid) {
                throw new Error('Notification.setType() needs one argument at least');
            }
            this._type = value;
            return this;
        }

    }, {});

/*global module */
module.exports = Notification;
