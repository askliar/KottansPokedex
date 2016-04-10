module.exports = function def(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          './build/assets/main.css': './styles/main.sass',
        },
      },
    },

    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: {
          './build/index.html': './views/index.jade',
        },
      },
    },

    watch: {
      grunt: {
        files: ['./Gruntfile.js'],
      },
      jade: {
        files: ['./views/*.jade', './blocks/**/*.jade'],
        tasks: ['jade'],
      },
      sass: {
        files: ['./styles/*.sass', './blocks/**/*.sass'],
        tasks: ['sass', 'cssmin'],
      },
      babelify: {
        files: ['./scripts/**/*.js', './blocks/**/*.js', './scipts/**/*.jsx'],
        tasks: ['browserify', 'uglify'],
      },
      uglify: {
        files: ['./build/assets/main.js'],
        tasks: ['uglify'],
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['./index.html', './libs/**', './assets/**', './font/**']
    },

    copy: {
      main: {
        expand: true,
        cwd: './',
        src: ['./node_modules/material-design-lite/material.min.css',
              './libs/materialize-css/css/materialize.min.css',
              './libs/bootstrap/bootstrap-grid.min.css',
              './node_modules/jquery/dist/jquery.min.js',
              './node_modules/material-design-lite/material.min.js',
              './libs/materialize-css/js/materialize.min.js'],
        dest: 'build/libs/',
        flatten: true,
        filter: 'isFile',
      },
      fonts: {
        expand: true,
        cwd: './',
        src: ['./libs/materialize-css/font/roboto/*'],
        dest: 'build/font/roboto/',
        flatten: true,
        filter: 'isFile',
      },
    },

    uglify: {
      options: {
        manage: false,
      },
      uglify: {
        files: [{
          './build/assets/main.min.js': ['./build/assets/main.js'],
        }],
      },
    },

    cssmin: {
      minify: {
        files: [{
          expand: true,
          cwd: 'build/assets/',
          src: 'main.css',
          dest: 'build/assets/',
          ext: '.min.css',
        }],
      },
    },

    eslint: {
      options: {
        format: require('eslint-tap'),
        configFile: '.eslintrc',
      },
      target: ['./scripts/**/*.js', './blocks/**/*.js', './scipts/components/*.jsx'],
    },

    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              presets: ['es2015', 'react'],
            }],
          ],
          browserifyOptions: {
            debug: true,
          },
          exclude: '',
        },
        files: {
          './build/assets/main.js': ['./scripts/**/*.js', './blocks/**/*.js', './scipts/components/*.jsx'],
        },
      },
    },

    clean: ['./build/libs']
  });

  grunt.registerTask('default', ['jade', 'sass', 'browserify', 'eslint', 'cssmin', 'uglify', 'clean', 'copy', 'watch']);
  grunt.registerTask('compile', ['jade', 'sass', 'browserify', 'eslint']);
  grunt.registerTask('deploy', ['gh-pages']);
  grunt.registerTask('minimize', ['cssmin', 'uglify']);

  grunt.task.run('notify_hooks');
};
