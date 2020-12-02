"use strict";

import {
    paths
} from "../gulpfile.babel";
import gulp from "gulp";
import newer from "gulp-newer";
import debug from "gulp-debug";
import browsersync from "browser-sync";

gulp.task("images-copy", () => {
    return gulp.src(paths.images.src)
        .pipe(newer(paths.images.dist))
        .pipe(gulp.dest(paths.images.dist))
        .pipe(debug({
            "title": "Images"
        }))
        .pipe(browsersync.stream());
});