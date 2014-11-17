/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            jshint: '.jshintrc',
            files: ['Grunfile.js', 'lib/**/*.js']
        },
        jasmine_node: {

        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('tests', ['jshint', 'jasmine_node']);

};
