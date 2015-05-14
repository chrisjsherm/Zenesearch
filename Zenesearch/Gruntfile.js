module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/**/*.css',
                        '**.html',
                        'scripts/**/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: 'localhost:58404'
                }
            }
        },

        copy: {
            vendorJS: {
                expand: true,
                cwd: 'bower_components/',
                src: ['**/*.js'],
                dest: 'scripts/',
            }
        },

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['scripts/**/*.js'],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        sass: {
            options: {
                includePaths: ['bower_components/foundation/scss']
            },
            dist: {
                options: {
                    outputStyle: 'nested'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },

        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['copy']);
    grunt.registerTask('default', ['browserSync:dev', 'watch']);
}