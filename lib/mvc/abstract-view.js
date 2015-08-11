var Lodash = require('lodash'),
    Base = require('class-extend'),
    EventEmitter = require('events').EventEmitter,

    AbstractView = Base.extend({

        constructor: function (isDefault, isDisabled) {
            this._config = {};
            this._viewClass = '';
            this._container = '';
            this._buttonBase = '';
            this._eventScope = null;
            this._signal = new EventEmitter();
            this._isDefault = isDefault || false;
            this._changeEvent = 'mvc.view-change';
            this._isDisabled = isDisabled || false;
        },

        remove: function () {
            return this;
        },
        render: function () {
            return this;
        },

        addListener: function (scope) {
            var hasFunction = scope.hasOwnProperty('onViewChange');
            if (arguments.length < 1 || Lodash.isEmpty(scope) || !Lodash.isPlainObject(scope) || !hasFunction || typeof scope.onViewChange !== 'function') {
                throw new Error('AbstractView.addListener() needs 1 argument');
            }
            this._eventScope = scope;
            this._signal.addListener(this._changeEvent, scope.onViewChange.bind(scope));
            return this;
        },

        removeListener: function () {
            if (this._eventScope) {
                this._signal.removeListener(this._changeEvent, this._eventScope.onViewChange);
                this._eventScope = null;
            }
            return this;
        },

        initView: function (config) {
            if (arguments.length < 1 || !Lodash.isPlainObject(config)) {
                throw new Error('AbstractView.initView() needs 1 argument');
            }
            this._config = config;
            return this;
        }

    }, {});

/*global module */
module.exports = AbstractView;
