var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require("gulp-sass"),
    webpack = require("webpack");

var config = {
    production: !!gutil.env.production
};

var webpackConfig = {
    devtool: "cheap-module-source-map",
    context: __dirname + "/src",
    entry: "./client.js",
    plugins: [],
    output: {
        filename: "client.js",
        path: __dirname + "/dist",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            }
        ],
    }
};


gulp.task("default", ["build-dev"]);
gulp.task("build", ["sass", "icons", "images", "webpack:build"]);
gulp.task("build-dev", ["webpack:build-dev", "sass", "icons", "images"], function() {
  gulp.watch("src/**/*.js", ["webpack:build-dev"]);
  gulp.watch("src/scss/*.scss", ["sass"]);
  gulp.watch("src/images/*.scss", ["images"]);
});


gulp.task('sass', function() {
    return gulp.src('src/scss/stylesheet.scss')
    .pipe(sass({includePaths: ["node_modules/bootstrap-sass/assets/stylesheets", "node_modules/font-awesome/scss"]}))
    .pipe(gulp.dest('dist'));
});

gulp.task("webpack:build-dev", function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack:build", function(callback) {
    var prodConfig = Object.create(webpackConfig);
    prodConfig.plugins = prodConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
    webpack(prodConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("icons", function () {
    return gulp.src("./node_modules/font-awesome/fonts/*.*")
        .pipe(gulp.dest("./dist/fonts"));
});

gulp.task("images", function () {
    return gulp.src("./src/images/**/*.*")
        .pipe(gulp.dest("./dist/img"));
});
