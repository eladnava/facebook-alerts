var koa = require('koa');
var route = require('koa-route');
var config = require('./config');
var tasks = require('./lib/tasks');
var error = require('./lib/middleware/error');

// Create koa app
var app = koa();

// Koa middleware
app.use(error());

// API routes
app.use(route.get('/', require('./routes/index')));
app.use(route.get('/sync', require('./routes/sync')));

// API port
var port = process.env.PORT || config.api.port;

// Listen for connections
app.listen(port);

// Log port
console.log('Server listening on port ' + port);

// Schedule repeating tasks
tasks.schedule();