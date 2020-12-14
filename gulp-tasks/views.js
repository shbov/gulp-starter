"use strict";

import {
    paths
} from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";
import pug from "gulp-pug";

const argv = yargs.argv,
    production = !!argv.production,
    netlify = !!argv.netlify;

gulp.task("views", () => {
    return gulp.src(paths.views.src)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulpif(netlify, replace(paths.domain.local, paths.domain.netlify)))
        .pipe(gulpif(production, replace(paths.domain.local, paths.domain.production)))
        .pipe(gulp.dest(paths.views.dist))
        .pipe(browsersync.stream());
});