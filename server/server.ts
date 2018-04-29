
const express = require('express');
const router = express.Router()
const path = require('path');
const bodyParser = require("body-parser");
const http = require('http');
const port = process.env.PORT || '3001';
const app = express();
import { io } from './controller/api.controller';
app.set('port', port);


const server = http.createServer(app);

io.init(server);

app.locals.pretty = true;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../', 'wwwroot', 'dist'), { index: false }));



app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'wwwroot', 'dist/index.html'));
});

server.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});

