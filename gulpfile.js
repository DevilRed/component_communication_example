'use strict';
var gulp = require('gulp');
var templateCache      = require('gulp-angular-templatecache');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var spritesmith = require('gulp.spritesmith');
var sourcemaps = require('gulp-sourcemaps');
var watchify    = require('watchify');
var buffer      = require('vinyl-buffer');
var gutil       = require('gulp-util');
var rimraf      =  require('rimraf');

var env = process.env.NODE_ENV || 'development';

var path = {
    root: './',
    app: './app/',
    js_src: ['./app/js/app.module.js'],
    js_dest: './app/public/',
    js_outputFile: 'bundle.js',
    mapsDir: './app/maps/'
};

gulp.task('browser-sync', function (){
    browserSync.init({
        // server: "app", port: 9000
        server: path.app, port: 9000
    });
});
// linting
/**
 * this task follows the options defined in .jshintrc file, to see more explanation about the options: https://github.com/jshint/jshint/blob/master/examples/.jshintrc
 */
gulp.task('lint', function (){
    return gulp.src([path.app + 'js/components/**/*.js', path.app + 'js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// SASS PATHS
var sassPaths = [
  path.root + 'node_modules/foundation-sites/scss',
  path.root + 'node_modules/motion-ui/src'
];
// setting sass development
gulp.task('sass', function (){
    return gulp.src(path.app + 'scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: sassPaths,
            outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.app + 'css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('templates', function (){
    gulp.src(path.app + 'js/components/**/*.html')
        .pipe(templateCache({
            root: path.app + 'js/',
            module: 'buyItNow.templates',
            standalone: true
        }))
        .pipe(gulp.dest(path.app + 'js'))
        .pipe(browserSync.reload({stream: true}));
});

// browserify v2
watchify.args.debug = true;
var bundler = watchify(browserify(path.js_src, watchify.args));
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(source(path.js_outputFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({
            mangle: false,// When you minify the javascript, with an option called mangle turned on, then the variable names get mangled, this is the issue for minification angularJS code
            output: {
                beautify: false,// to uglify content
                comments: false// to strip comments
            }
        }))// production only
            .on('error', gutil.log)
        .pipe(gulpif(env === 'development', sourcemaps.write(path.mapsDir)))// sourcemaps are written in production only
        .pipe(gulp.dest(path.js_dest))
        .pipe(browserSync.stream({once: true}));
}

gulp.task('bundle', function () {
    return bundle();
});

gulp.task('clean', function (){
    rimraf('app/public/', function (err){
        if(err)
            console.log(err);
        console.log('successfully deleted');
    });
});

// spritesmith
gulp.task('sprite', function (){
    var spriteData = gulp.src(path.app + 'img/sprites/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            imgPath: '../img/sprite.png'//has to be from css starting point
        }));
    spriteData.img.pipe(gulp.dest(path.app + 'img'));// from gulpfile starting point
    spriteData.css.pipe(gulp.dest(path.app + 'scss'));
});

// watch for changes
gulp.task('watch', ['browser-sync'], function (){
    gulp.watch([ path.app + 'js/components/**/*.html' ], ['templates']);
    gulp.watch([path.app + 'scss/*.scss'], ['sass']);
     gulp.watch([path.app + 'js/**/*.js'], ['bundle']);
});


gulp.task('default', ['watch']);


/*
    project structure:
    - main folder (.bowerrc, .gitignore, bower.json, gulpfile.js, package.json)
        - app (index.html)
            - css
            - js
                - components (app.module.js, app.routes.js, templates.js)
                    - requiredFunctionality
            - scss
        - node_modules
 */
/*
 TDD can be described as:
    * write a "single" unit test describing an aspect of the program
    * run the test, which should fail because the program lacks that feature
    * write "just enough" code, the simplest possible, to make the test pass
    * "refactor" the code until it conforms to the simplicity criteria
        - the code contains no duplication
        - single responsibility, open to an extension closed to a modification
    * repeat, "accumulating" unit tests over time
 */
/*
 to use browserify for production:
- NODE_ENV=production gulp js
- NODE_ENV=production gulp build
- NODE_ENV=production gulp

 for inject in the html has to be (where is to be injected):
<!-- inject:js -->
<!-- endinject -->



KARMA CONFIGURATION
source: https://code.ciphertrick.com/2015/08/03/angularjs-unit-testing-tutorial-karma-jasmine/
- run: "karma init" from windows cmd to generate karma.conf.js file
- run: "karma start" to start testing


* Install Karma
    npm install -g karma --save-dev
* Install Jasmine
    npm install karma-jasmine jasmine-core --save-dev
* Install ngMock, ngMock allows you to inject and mock angular services to help you test your application.
    npm install angular-mocks --save-dev
* Browsers, install browser launcher on which you want karma to run your tests. We need to install at least one browser. I’ll use PhantomJs.
    npm install karma-phantomjs-launcher --save-dev


minimal karma.conf.js content example:
// Karma configuration
// Generated on Sat Jul 25 2015 19:12:21 GMT+0530 (India Standard Time)
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/app.js',  //use wildcards in real apps
      'tests/tests.js' //use wildcards in real apps
    ],
    // list of files to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
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
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}





TESTING PATTERN

There are a few ways to write your tests to keep it simple and organised, I’ll show you the pattern I follow.

* Describe your object type. eg: Controller, Filters, Factory, etc.
* Inject/load app module
* Describe your specific object name.
* Load mock modules as required
* Initialize your object.
* Describe specific method (for controllers and services)
* Write your tests, expectations.



*/