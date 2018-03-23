import { task, src, dest } from 'gulp';
const rename = require('gulp-rename');
const del = require('del');
const gulpClean = require('gulp-clean');

const paths = {
    srouce: './dist',
    targetHtml:'/templates',
    targetStatic:'/static',
    target: 'E:/001_javaproject/service-nplat-yz/service-front-bank/src/main/resources'
};

task('copy-Resources', ['clean','copy-html','copy-other-file'],function(){
    console.log('copy resources succeed.');
});
task('clean', clean);
task('copy-html',copyHtml);
task('copy-other-file',copyOtherFile);

function copyOtherFile(){
    console.log('copyOtherFile...start');
    src([
        `${paths.srouce}/*`,
        `${paths.srouce}/**/*`,
        `!${paths.srouce}/index.html`
    ])
    .pipe(dest(paths.target+paths.targetStatic))
    console.log('copyOtherFile...end');
}

function copyHtml(){
    console.log('copyHtml...start');
    src([
        `${paths.srouce}/index.html`
    ])
    .pipe(rename(`index.ftl`))
    .pipe(dest(paths.target+paths.targetHtml));
    console.log('copyHtml...end');
}

function clean() {
    console.log('clean target all file start');
    src([
        `${paths.target}/*`
    ],{read: false}).pipe(gulpClean({force: true}));
    console.log('clean target all file end');
}
