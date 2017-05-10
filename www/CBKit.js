var exec = require('cordova/exec');
               
exports.initialize = function(options, success, error) {
	exec(success, error, "CBKit", "initialize", [options]);
};
               
exports.configure = function(options, success, error) {
    exec(success, error, "CBKit", "configure", [options]);
};

exports.refreshTokenNeeded = function(success, error) {
    exec(success, error, "CBKit", "refreshTokenNeeded", []);
};

exports.setRefreshToken = function(options, success, error) {
    exec(success, error, "CBKit", "setRefreshToken", [options]);
};
               
exports.show = function(options, success, error) {
    exec(success, error, "CBKit", "show", [options]);
};