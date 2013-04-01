/*global module:false*/
module.exports = function(grunt) {

// vars
var dist = 'dist',
    dev = 'dev',
    jsName = 'main',
    distAssets = dist+'/assets/',
    devAssets = dev+'/assets/',
    jsFile = 'js/'+jsName+'.js';
    distJs = distAssets+jsFile,
    devJs = devAssets+jsFile;

  // Loading in tasks
  grunt.loadNpmTasks('grunt-contrib');

 // Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    dist: {
      files: [
          {
          src: [devJs],
          dest: distJs
          }
        ]
    }
  },

   connect: {
    server: {
      options: {
        port: 9000,
        base: dist,
        keepalive: true
      }
    }
  },

 compass: {
    dist: {
        options: {
        sassDir: devAssets+'sass',
        cssDir: distAssets+'css'
      }
    }
  },

  watch: {
    assets: {
      files: [devAssets+'**/*','**/*.html'],
      tasks: ['uglify','compass']
    }
  },

   imagemin: {
      dist: {
        options: {
        optimizationLevel: 7
        },
        files: [
          {
          src: [devAssets+'img/*'],
          dest: distAssets+'img'
          }
        ]
      }
    },

    htmlmin: {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      expand: true,
      cwd: 'dev',
      src: ['**/*.html'],
      dest: 'dist/'
  }
}


});

// alias tasks everything in the array gets run by simply typing grunt
grunt.registerTask('default', ['compass','uglify','htmlmin','watch']);

}