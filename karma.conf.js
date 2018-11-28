// Karma configuration
// Generated on Thu Feb 02 2017 17:09:45 GMT-0400 (SA Western Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // CUSTOM CONFIGURATION:
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // using karma-browserify package and adding browserify according to https://github.com/nikku/karma-browserify
    frameworks: ['browserify', 'jasmine'],


    // list of files / patterns to load in the browser, files to load by the testing
    // the order here is important, Angular and all of its related code are placed up top, then the application files, and finally the test files
    files: [
      // load npm libraries first for testing purposes
      {pattern: 'node_modules/angular/angular.min.js', watch: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', watch: false},
      // load module
      'app/js/app.module.js',
      // 'app/js/*.js',
      // 'app/js/components/**/*.js', //use wildcards in real apps
      // load test files
      'tests/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // files to be processed by browserify
    preprocessors: {
        'app/js/*.js': [ 'browserify']
    },
    browserify: {
      debug: true// The debug flag will help us debug the tests using source maps
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // browsers in which we will test
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
