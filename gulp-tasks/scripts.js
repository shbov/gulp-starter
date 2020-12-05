"use strict";

import {
    paths
} from "../gulpfile.babel";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
import replace from "gulp-replace";

const webpackConfig = require("../webpack.config.js"),
    argv = yargs.argv,
    production = !!argv.production,
    netlify = !!argv.netlify;

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

gulp.task("scripts", () => {
    return gulp.src(paths.scripts.src)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulpif(netlify, replace(paths.domain.local, paths.domain.netlify)))
        .pipe(gulpif(production, replace(paths.domain.local, paths.domain.production)))
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(debug({
            "title": "JS files"
        }))
        .pipe(browsersync.stream());
});