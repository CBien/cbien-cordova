var exec = require('cordova/exec');

module.exports = {
     initialize: function(options, success, error) {
        exec(success, error, "CBKit", "initialize", [options]);
    },

    configure: function(options, success, error) {
     exec(success, error, "CBKit", "configure", [options]);
    },

    refreshTokenNeeded: function(success, error) {
     exec(success, error, "CBKit", "refreshTokenNeeded", []);
    },

    setRefreshToken: function(options, success, error) {
     exec(success, error, "CBKit", "setRefreshToken", [options]);
    },

    show: function(options, success, error) {
     exec(success, error, "CBKit", "show", [options]);
    },

    Font : {
        DEFAULT : 0,
        HELVETICA : 1,
        LATO : 2,
        ROBOTO : 3,
    },

    ButtonType : {
        IMAGE : 0,
        ICON : 1,
    }
};
