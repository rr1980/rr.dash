"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var http = require('http');
var port = process.env.PORT || '3001';
var app = express();
var api_controller_1 = require("./controller/api.controller");
app.set('port', port);
var server = http.createServer(app);
api_controller_1.io.init(server);
app.locals.pretty = true;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../', 'wwwroot', 'dist'), { index: false }));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'wwwroot', 'dist/index.html'));
});
server.listen(port, function () {
    console.log("Listening on: http://localhost:" + port);
});
