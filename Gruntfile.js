module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            all: {
                src: [
                    'src/app/modules/**/*Module.js',
                    'src/app/modules/**/*.js',
                    'src/app/app.js',
                    'src/app/routes.js'
                ],
                dest: 'grunt_temp/jgefroh_website_2015_UNCAT.js',
                options: {
                    process: function(src, filePath) {
                        if (filePath.indexOf("routes.js") > -1) {
                            return src;
                        }
                        var folderPath = filePath.substring(0, filePath.lastIndexOf('/')) + "/";
                        var appFolderPath = new RegExp("src/app/");
                        folderPath = folderPath.replace(appFolderPath, "");
                        var patternWithSingleQuotes = "templateUrl:[\\s]*'";
                        var patternWithDoubleQuotes = 'templateUrl:[\\s]*"';
                        var templateUrlRegExpWithSingleQuotes = new RegExp(patternWithSingleQuotes, 'g');
                        var templateUrlRegExpWithDoubleQuotes = new RegExp(patternWithDoubleQuotes, 'g');
                        if (src.match(templateUrlRegExpWithDoubleQuotes) || src.match(templateUrlRegExpWithSingleQuotes)) {
                            console.info("Replacing templateUrl in file " + filePath + "...");
                        }
                        var srcWithPath = src.replace(templateUrlRegExpWithSingleQuotes, "templateUrl: '" + folderPath);
                        srcWithPath = srcWithPath.replace(templateUrlRegExpWithDoubleQuotes, 'templateUrl: "' + folderPath);
                        return srcWithPath;
                    }
                }
            }
        },
        uglify: {
            prod: {
                src: 'grunt_temp/jgefroh_website_2015_UNCAT.js',
                dest: 'prod_dist/app/jgefroh_website_2015.min.js'
            },
            dev: {
                src: 'grunt_temp/jgefroh_website_2015_UNCAT.js',
                dest: 'src/app/jgefroh_website_2015.min.js'
            }
        },
        clean: {
            options: {
              'no-write': false,
              force: true

            },
            prod: ['prod_dist/**/*', 'grunt_temp/**/*', 'prod_dist/app']
        },
        copy: {
            prod: {
                files: [
                    {expand: true, cwd: 'src/', src: ['app/**/*.html'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'src/', src: ['app/**/*.json'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'src/', src: ['app/data/*'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'src/', src: ['app/resources/**/*'], dest: 'prod_dist/'}
                ]
            }
        },
        watch: {
            scripts: {
                files: ['src/app/**/*.json', 'src/app/**/*.js', 'src/app/**/*.html', 'src/app/**/*.css', '!**/*.min.js'],
                tasks: ['dev'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
         server: {
             options: {
                 port: 9999,
                 hostname: 'localhost',
                 base: 'src/app/',
                 keepalive: false,
                 open: true,
                 livereload: true,
                 middleware: function (connect, options) {
                     var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                     return [
                         // Include the proxy first
                         proxy,
                         // Serve static files.
                         connect.static('src/app'),
                         // Make empty directories browsable.
                         connect.directory('src/app')
                     ];
                 }
             },
          }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect'); //test
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.registerTask('default', 'dev');
    grunt.registerTask('prod', ['concat', 'uglify:prod', 'copy:prod']);
    grunt.registerTask('dev', ['concat', 'uglify:dev']);
    grunt.registerTask('server', ['clean', 'configureProxies:server', 'connect:server', 'watch']);
};
