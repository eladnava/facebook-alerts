// Dependencies
var route = require('koa-route');

module.exports = function router(app) {
    // Define route mapping
    app.use(route.get('/', require('./routes/index')));
    app.use(route.get('/sync', require('./routes/sync')));
};