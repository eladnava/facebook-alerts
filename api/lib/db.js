// Load monk interface
var monk = require('monk');

// App config
var config = require('../../config');

// Initialize DB connection with URI from app config
module.exports = monk(config.api.mongodb.endpoint);