// Main logic
var sync = require('../logic/sync');
  
// POST /sync
module.exports = function* () {
    // Run the sync logic manually
    yield sync();
};