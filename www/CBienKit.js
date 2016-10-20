var exec = require('cordova/exec');
               
exports.initialize = function(options, success, error) {
	exec(success, error, "CBienKit", "initialize", [options]);
};
               
exports.configure = function(options, success, error) {
    exec(success, error, "CBienKit", "configure", [options]);
};

exports.refreshTokenNeeded = function(success, error) {
    exec(success, error, "CBienKit", "refreshTokenNeeded", []);
};

exports.setRefreshToken = function(options, success, error) {
    exec(success, error, "CBienKit", "setRefreshToken", [options]);
};
               
exports.show = function(options, success, error) {
    exec(success, error, "CBienKit", "show", [options]);
};