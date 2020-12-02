"use strict";

import {
    paths
} from "../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production,
    netlify = !!argv.netlify;

gulp.task("json", () => {
    return gulp.src(paths.json.src)
        .pipe(gulp.dest(paths.json.dist))
        .pipe(browsersync.stream());
});