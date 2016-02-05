module.exports = function error() {
    return function* error(next) {
        try {
            // Execute all other middlewares first
            yield next;
        } catch (err) {
            // Set response status code and JSON response
            this.status = err.status || 500;
            this.body = err;
        
            // Emit app-wide error
            this.app.emit('error', err, this);
        }
    }
};