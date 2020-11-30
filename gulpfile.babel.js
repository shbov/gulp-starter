"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
    paths = {
        views: {
            src: [
                "./src/views/**/*.html",
                "./src/views/pages/*.html"
            ],
            dist: "./dist/",
            watch: [
                "./src/blocks/**/*.html",
                "./src/views/**/*.html"
            ]
        },
        styles: {
            src: "./src/styles/main.{scss,sass}",
            dist: "./dist/styles/",
            watch: [
                "./src/blocks/**/*.{scss,sass}",
                "./src/styles/**/*.{scss,sass}"
            ]
        },
        scripts: {
            src: "./src/js/index.js",
            dist: "./dist/js/",
            watch: [
                "./src/blocks/**/*.js",
                "./src/js/**/*.js"
            ]
        },
        images: {
            src: [
                "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
                "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            dist: "./dist/img/",
            watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}"
        },
        fonts: {
            src: "./src/fonts/**/*.{woff,woff2}",
            dist: "./dist/fonts/",
            watch: "./src/fonts/**/*.{woff,woff2}"
        },
        favicons: [{
                src: "./src/img/favicon/favicon.{jpg,jpeg,png,gif}",
                dist: "./dist/img/favicons/",
            },
            // {
            //     src: "./src/img/favicon/favicon-2.{jpg,jpeg,png,gif}",
            //     dist: "./dist/img/favicons/favicon-2/",
            // }
        ],
        domain: {
            local: "http://localhost:4000/",
            netlify: "https://meyou-demo.netlify.app/",
            production: "https://1.meyou.ru/demo/",
        }
    };

requireDir("./gulp-tasks/");

export {
    paths
};

export const development = gulp.series("clean", "smart-grid",
    gulp.parallel(["views", "styles", "scripts", "images", "fonts", "favicons"]),
    gulp.parallel("serve"));

export const prod = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "fonts", "favicons"]));

export default development;