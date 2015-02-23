module.exports = function(grunt) {

    grunt.initConfig({

        'style-guide': {
            dist: {
                src: 'design',
                dest: 'design.json'
            }
        }

    });

    grunt.loadTasks('../../grunt-style-guide/');
};

