// в общем случае, это выносится на Nginx
const serve = require('koa-static');

exports.init = app => app.use(serve('public'));