module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    var ports = {
        server: 8000,
        livereload: 35353
    };

    grunt.initConfig({
        ports: ports,
        typescript: {
            build: {
                src: ['app/**/*.ts', '!app/lib/**/*.ts'],
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: ports.server,
                    base: './app/'
                }
            }
        },
        open: {
            serve: {
                path: 'http://localhost:<%= ports.server %>/default.html'
            }
        },
        watch: {
            src: {
                files: ['app/**/*.ts'],
                tasks: ['typescript:build'],
                options: {
                    livereload: ports.livereload
                }
            },
            views: {
                files: ['app/**/*.fap', 'app/**/*.fayde'],
                options: {
                    livereload: ports.livereload
                }
            }
        }
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('serve', ['typescript:build', 'connect', 'open', 'watch'])
};