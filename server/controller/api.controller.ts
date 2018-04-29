import * as socketio from 'socket.io';
import { OsDataService } from '../services/os-data.service';
import { DbDataService, User } from '../services/db-data.service';


class UserResponseModel {
    userName: string;
    name: string;
    vorName: string;
    auth: boolean;
};

class AppStateResponseModel {

    constructor() { }

    public isLoading: boolean = false;
    public isLoaded: boolean = false;
};

const appState: AppStateResponseModel = new AppStateResponseModel();


if (!DbDataService.getAppState()) {
    console.info("\r\n \r\n seed data... \r\n");
    DbDataService.seed();
}

const validateLogin = function (arg): UserResponseModel {
    var result = DbDataService.getUser(arg);

    var auth = arg.username === "rr1980" && arg.password === "test";

    return {
        userName: auth ? result.userName : "",
        name: auth ? result.name : "",
        vorName: auth ? result.vorName : "",
        auth: auth
    } as UserResponseModel;
}

const getAppState = function (): AppStateResponseModel {

    var result = DbDataService.getAppState();
    return {
        isLoading: result.isLoading,
        isLoaded: result.isLoaded
    } as AppStateResponseModel;
}

 
let io = {

    init: function (app) {
        let io = socketio.listen(app)

        io.sockets.on('connection', function (socket) {

            socket.on('getInit', (arg) => {
                console.log('getInit called...');
                io.emit('setInit', getAppState());

            })

            socket.on('tryLogin', (arg) => {
                var res = validateLogin(arg);
                console.log('tryLogin called...', arg,res );

                io.emit('setLogin', res);
            })

            socket.on('setCpuFeedOn', (arg) => {

                OsDataService.getCpusFeed((response) => {
                    io.emit('setCpus', response);
                });
            })

            socket.on('setCpuFeedOff', (arg) => {
                OsDataService.stop();
            })
        })
    }
}

export { io }
