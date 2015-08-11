/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var Sinon = require('sinon'),
        cwd = process.cwd() + '/src/mvc/',
        AbstractView = require(cwd + 'abstract-view');

    describe('AbstractView', function () {
        var View, view, result, scope, config;
        describe('constructor', function () {
            it('not throws', function () {
                expect(function () {
                    View = AbstractView.extend();
                    view = new View();
                }).not.toThrow();
            });
            it('define isDefault + _isDisabled', function () {
                View = AbstractView.extend();
                view = new View();
                expect(view._isDefault).toBe(false);
                expect(view._isDisabled).toBe(false);
                view = new View(false);
                expect(view._isDefault).toBe(false);
                expect(view._isDisabled).toBe(false);
                view = new View(true);
                expect(view._isDefault).toBe(true);
                expect(view._isDisabled).toBe(false);
                view = new View(false, false);
                expect(view._isDefault).toBe(false);
                expect(view._isDisabled).toBe(false);
                view = new View(false, true);
                expect(view._isDefault).toBe(false);
                expect(view._isDisabled).toBe(true);
            });
        });
        describe('remove', function () {
            it('returns view object', function () {
                View = AbstractView.extend();
                view = new View();
                result = view.remove();
                expect(result).toBe(view);
                expect(result).toEqual(view);
            });
        });
        describe('render', function () {
            it('returns view object', function () {
                View = AbstractView.extend();
                view = new View();
                result = view.render();
                expect(result).toBe(view);
                expect(result).toEqual(view);
            });
        });
        describe('addListener', function () {
            it('throws', function () {
                View = AbstractView.extend();
                view = new View();
                expect(function () {
                    view.addListener();
                }).toThrow();
                expect(function () {
                    scope = null;
                    view.addListener(scope);
                }).toThrow();
                expect(function () {
                    scope = {};
                    view.addListener(scope);
                }).toThrow();
                expect(function () {
                    scope = {
                        noViewChangeFunction: function () {}
                    };
                    view.addListener(scope);
                }).toThrow();
                expect(function () {
                    scope = {
                        onViewChange: 'toto'
                    };
                    view.addListener(scope);
                }).toThrow();
                expect(function () {
                    scope = {
                        onViewChange: {}
                    };
                    view.addListener(scope);
                }).toThrow();
                expect(function () {
                    scope = {
                        onViewChange: []
                    };
                    view.addListener(scope);
                }).toThrow();
            });
            it('not throws', function () {
                expect(function () {
                    scope = {
                        onViewChange: function () {}
                    };
                    View = AbstractView.extend();
                    view = new View();
                    view.addListener(scope);
                }).not.toThrow();
            });
            it('returns view object', function () {
                scope = {
                    onViewChange: function () {}
                };
                View = AbstractView.extend();
                view = new View();
                result = view.addListener(scope);
                expect(result).toBe(view);
                expect(result).toEqual(view);
            });
            it('EventEmitter.addListener called once', function () {
                View = AbstractView.extend();
                view = new View();
                Sinon.spy(view._signal, 'addListener');
                result = view.addListener(scope);
                expect(view._signal.addListener.calledOnce).toBe(true);
                view._signal.addListener.restore();
            });
        });
        describe('removeListener', function () {
            it('never throw', function () {
                View = AbstractView.extend();
                view = new View();
                expect(function () {
                    view.removeListener();
                }).not.toThrow();
                expect(function () {
                    view.removeListener({});
                }).not.toThrow();
                expect(function () {
                    view._eventScope = null;
                    view.removeListener({});
                }).not.toThrow();
            });
            it('reset eventScope', function () {
                View = AbstractView.extend();
                view = new View();
                scope = {
                    onViewChange: function () {}
                };
                view.addListener(scope);
                view.removeListener();
                expect(view._eventScope).toBe(null);
            });
            it('EventEmitter.removeListener called once', function () {
                View = AbstractView.extend();
                view = new View();
                Sinon.spy(view._signal, 'removeListener');
                scope = {
                    onViewChange: function () {}
                };
                view.addListener(scope);
                view.removeListener();
                expect(view._signal.removeListener.calledOnce).toBe(true);
                view._signal.removeListener.restore();
            });
            it('returns view object', function () {
                scope = {
                    onViewChange: function () {}
                };
                View = AbstractView.extend();
                view = new View();
                result = view.removeListener();
                expect(result).toBe(view);
                expect(result).toEqual(view);
            });
        });
        describe('EventEmitter', function () {
            it('emit event', function () {
                scope = {
                    onViewChange: function () {}
                };
                Sinon.spy(scope, 'onViewChange');
                View = AbstractView.extend();
                view = new View();
                view.addListener(scope);
                view._signal.emit('mvc.view-change');
                expect(scope.onViewChange.calledOnce).toBe(true);
                scope.onViewChange.restore();
            });
            it('emit event with arg toto', function () {
                scope = {
                    onViewChange: function () {}
                };
                Sinon.spy(scope, 'onViewChange');
                View = AbstractView.extend();
                view = new View();
                view.addListener(scope);
                view._signal.emit('mvc.view-change', 'toto');
                expect(scope.onViewChange.calledOnce).toBe(true);
                expect(scope.onViewChange.getCall(0).args[0]).toEqual('toto');
                scope.onViewChange.restore();
            });
            it('emit event with 2 arg', function () {
                scope = {
                    onViewChange: function () {}
                };
                Sinon.spy(scope, 'onViewChange');
                View = AbstractView.extend();
                view = new View();
                view.addListener(scope);
                view._signal.emit('mvc.view-change', 'toto', 'tata');
                expect(scope.onViewChange.calledOnce).toBe(true);
                expect(scope.onViewChange.getCall(0).args.length).toEqual(2);
                scope.onViewChange.restore();
            });
        });
        describe('initView', function () {
            it('throws', function () {
                expect(function () {
                    View = AbstractView.extend();
                    view = new View();
                    view.initView();
                }).toThrow();
                expect(function () {
                    View = AbstractView.extend();
                    view = new View();
                    view.initView([]);
                }).toThrow();
                expect(function () {
                    View = AbstractView.extend();
                    view = new View();
                    view.initView(['titi']);
                }).toThrow();
            });
            it('not throws', function () {
                expect(function () {
                    View = AbstractView.extend();
                    view = new View();
                    view.initView({
                        prop: 'toto'
                    });
                }).not.toThrow();
                expect(function () {
                    View = AbstractView.extend();
                    view = new View();
                    view.initView({});
                }).not.toThrow();
            });
            it('config setted', function () {
                config = {
                    prop: 'toto'
                };
                View = AbstractView.extend();
                view = new View();
                view.initView(config);
                expect(view._config).toEqual(config);
            });
            it('returns view object', function () {
                config = {
                    prop: 'toto'
                };
                View = AbstractView.extend();
                view = new View();
                result = view.initView(config);
                expect(result).toBe(view);
                expect(result).toEqual(view);
            });
        });
    });

}());
