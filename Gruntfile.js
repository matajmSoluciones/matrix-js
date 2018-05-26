module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            all: {
                src: "dist/matrix.js",
                dest: "dist/matrix.min.js"
            }
        },
        browserify: {
            matrix: {
                src: "src/client.js",
                dest: "dist/matrix.js"
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['browserify', 'uglify']);
};