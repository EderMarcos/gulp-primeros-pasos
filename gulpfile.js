var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    merge = require('gulp-merge-json');

// Une dos archivos javascript
gulp.task('demo', function() {
    gulp.src('js/source/*.js')
        .pipe(concat('todo.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/dist/'))
})

// Unir 2 archivos JSON https://www.npmjs.com/package/gulp-merge-json
gulp.task('json', function() {
    gulp.src('json/*.json')
        // .pipe(merge({
        //     fileName: 'dist.json',
        //     edit: (config, file) => {
        //         // console.log(config);
        //         console.log(file);
        //         // console.log(config.declaration);
        //         return config;
        //     },
        // }))
        .pipe(merge({
            fileName: 'dist.json',
            customizer: (objA, objB) => {
                // Example: Concat arrays but only keep unique values
                if (Array.isArray(objA) && Array.isArray(objB)) {
                    return objA.concat(objB).filter((item, index, array) => (
                        array.indexOf(item) === index
                    ));
                }

                return undefined;
            },
        }))
        .pipe(gulp.dest('json/dist'));
})