
const socketio = require('socket.io');
const apiService = require('./services/api.service');

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.sockets.on('connection', function (socket) {
        console.log('Socket connected');
        
        // socket.emit('hello', {
        //     greeting: 'Hello Paul'
        // });

        socket.on('getInit', function () {
            io.emit('getInit', apiService.getData());
        });
    });

    return io
}