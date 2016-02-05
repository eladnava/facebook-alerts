// Dependencies
var db = require('../lib/db');
var wrap = require('co-monk');

// Make Monk generator-compatible
module.exports = wrap(db.get('posts'));