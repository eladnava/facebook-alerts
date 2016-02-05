// Dependencies
var koa = require('koa');

// App config
var config = require('./config');

// Custom koa middleware
var router = require('./api/router');
var tasks = require('./api/lib/tasks');
var error = require('./api/lib/middleware/error');

// Create koa app
var app = koa();

// Use koa middleware
app.use(error());

// Define app routes
router(app);

// Define configurable port
var port = process.env.PORT || config.api.port;

// Listen for connections
app.listen(port);

// Log port
console.log('Server listening on http://localhost:' + port);

// Schedule repeating tasks
tasks.schedule();