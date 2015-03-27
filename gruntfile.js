module.exports = function(grunt) {
    grunt.initConfig({

        handlebars: {
            compile: {
                src: 'client/**/*.handlebars',
                dest: 'client/handlebars-templates.js'
            }
        },

        uglify: {
            dist: {
                options: {
                    beautify: false,
                    compress: true
                },
                files: {
                    'client.min.js': [
                        'node_modules/handlebars/dist/handlebars.min.js',
                        'client/namespace/namespace.js',
                        'client/**/*.js'
                    ]
                }
            }
        },

        sass: {
            options: {
                style: 'nested'
            },
            dist: {
                files: {
                    'client.min.css': 'client/scss/main.scss'
                }
            }
        },

        watch: {
            js: {
                files: ['client/**/*.handlebars', 'client/**/*.js'],
                tasks:  ['handlebars', 'uglify']
            },
            scss: {
                files: ['client/**/*.scss'],
                tasks:  ['sass']
            }
        },

        connect: {
            server: {
                options: {
                    port: 1000,
                    keepalive: true
                }
            }
        },

        'style-guide': {
            dist: {
                src: 'tests/fixtures',
                dest: 'tests/result/result.json'
            }
        }
    });

    grunt.registerMultiTask('style-guide', '', function () {
        var StyleGuide = require('./index');
        var done = this.async();
        var styleGuide = new StyleGuide(this.data.src);
        styleGuide.saveJson(this.data.dest);
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['handlebars', 'uglify', 'sass']);
};