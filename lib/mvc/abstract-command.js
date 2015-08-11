var NAME = 'abstract-command',
    Base = require('class-extend'),
    Notifier = require('./notifier'),

    AbstractCommand = Base.extend({

        constructor: function () {}

    }, {

        _notifier: null,

        getNotifier: function () {
            return AbstractCommand._notifier;
        },

        setNotifier: function(notifier){
            if(arguments.length < 1 || !(notifier instanceof Notifier.notifier)){
                throw new Error('AbstractCommand.setNotifier() needs 1 argument');
            }
            AbstractCommand._notifier = notifier;
            return AbstractCommand._notifier;
        },

        getName: function(){
            return NAME;
        },

        // registerMacro: function(){},

        execute: function () {}

    });

/*global module */
module.exports = AbstractCommand;
