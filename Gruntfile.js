/*global module */
module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Grunfile.js', 'lib/**/*.js']
        },
        jasmine_node: {
            options: {
                match: '.',
                forceExit: false,
                extensions: 'js',
                specNameMatcher: 'spec',
                includeStackTrace: false,
                jUnit: {
                    report: true,
                    savePath: './build/reports/jasmine/',
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ['tests/']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('tests', ['jshint', 'jasmine_node']);

};
