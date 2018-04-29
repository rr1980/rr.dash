"use strict";
exports.__esModule = true;
var socketio = require("socket.io");
var os_data_service_1 = require("../services/os-data.service");
var db_data_service_1 = require("../services/db-data.service");
var UserResponseModel = /** @class */ (function () {
    function UserResponseModel() {
    }
    return UserResponseModel;
}());
;
var AppStateResponseModel = /** @class */ (function () {
    function AppStateResponseModel() {
        this.isLoading = false;
        this.isLoaded = false;
    }
    return AppStateResponseModel;
}());
;
var appState = new AppStateResponseModel();
if (!db_data_service_1.DbDataService.getAppState()) {
    console.info("\r\n \r\n seed data... \r\n");
    db_data_service_1.DbDataService.seed();
}
var validateLogin = function (arg) {
    var result = db_data_service_1.DbDataService.getUser(arg);
    var auth = arg.username === "rr1980" && arg.password === "test";
    return {
        userName: auth ? result.userName : "",
        name: auth ? result.name : "",
        vorName: auth ? result.vorName : "",
        auth: auth
    };
};
var getAppState = function () {
    var result = db_data_service_1.DbDataService.getAppState();
    return {
        isLoading: result.isLoading,
        isLoaded: result.isLoaded
    };
};
var io = {
    init: function (app) {
        var io = socketio.listen(app);
        io.sockets.on('connection', function (socket) {
            socket.on('getInit', function (arg) {
                console.log('getInit called...');
                io.emit('setInit', getAppState());
            });
            socket.on('tryLogin', function (arg) {
                var res = validateLogin(arg);
                console.log('tryLogin called...', arg, res);
                io.emit('setLogin', res);
            });
            socket.on('setCpuFeedOn', function (arg) {
                os_data_service_1.OsDataService.getCpusFeed(function (response) {
                    io.emit('setCpus', response);
                });
            });
            socket.on('setCpuFeedOff', function (arg) {
                os_data_service_1.OsDataService.stop();
            });
        });
    }
};
exports.io = io;
