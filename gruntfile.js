module.exports = function(grunt) {
    grunt.initConfig({

        publicPath: 'public',

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    beautify: false,
                    compress: true
                },
                files: {
                    '<%= publicPath %>/main.min.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/handlebars/dist/handlebars.min.js',
                        'lib/namespace/namespace.js',
                        'lib/**/*.js'
                    ]
                }
            }
        },

        sass: {
            options: {
                style: 'nested'
            },
            main: {
                files: {
                    'public/main.css': 'scss/main.scss'
                }
            },
            exampleBasic: {
                files: {
                    'examples/basic/basic.css': 'examples/basic/basic.scss'
                }
            }
        },

        watch: {
            lib: {
                files: ['lib/**/*.js'],
                tasks:  ['uglify']
            },
            scss: {
                files: ['examples/**/*.scss', 'scss/**/*.scss'],
                tasks:  ['sass']
            }
        },

        /*'style-guide': {
            dist: {
                src: 'examples/basic/design',
                dest: 'examples/basic/design.json'
            }
        },*/

        connect: {
            server: {
                options: {
                    port: 1000,
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
}
