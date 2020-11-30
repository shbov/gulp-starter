"use strict";

import {
    paths
} from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production,
    netlify = !!argv.netlify;

console.log(argv);

gulp.task("views", () => {
    return gulp.src(paths.views.src)
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulpif(production, replace(paths.domain.local, paths.domain.production)))
        .pipe(gulpif(netlify, replace(paths.domain.local, paths.domain.netlify)))
        .pipe(gulp.dest(paths.views.dist))
        .pipe(browsersync.stream());
});