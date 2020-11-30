"use strict";

import {
    paths
} from "../gulpfile.babel";
import gulp from "gulp";
import favicons from "gulp-favicons";
import debug from "gulp-debug";
import es from 'event-stream';

gulp.task("favicons", (done) => {
    es.merge(paths.favicons.map(function (obj) {
        return gulp.src(obj.src)
            .pipe(favicons({
                icons: {
                    appleIcon: true,
                    favicons: true,
                    online: false,
                    appleStartup: false,
                    android: false,
                    firefox: false,
                    yandex: false,
                    windows: false,
                    coast: false
                }
            }))
            .pipe(gulp.dest(obj.dist))
            .pipe(debug({
                "title": "Favicons"
            }));
    }));
    done();
});