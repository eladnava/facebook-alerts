// Dependencies
var co = require('co');

// App config
var config = require('../../config');

// Sync logic
var sync = require('../routes/sync');

// Task scheduler
exports.schedule = function schedule(app){
    // Run the task immediately on app startup
    exports.run();
    
    // Define repeating function every X ms (configurable interval)
    setInterval(exports.run, config.api.sync.interval);
};

exports.run = function run(){
    // Use co to run the generator function
    co(sync).catch(function onerror(err){
        // Log any uncaught errors
        console.error(err);
    });
}