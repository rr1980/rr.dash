
const express = require('express');
const router = express.Router()
const path = require('path');
const bodyParser = require("body-parser");
const port = 3000 || process.env.PORT;
const app = express();
const api_router = require("./api-router");
// app.engine('html', require('ejs').renderFile);
app.locals.pretty = true;
// app.set('view engine', 'html');
// app.set('views', path.join('wwwroot', 'dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../', 'wwwroot', 'dist'), { index: false }));


// router.get('/api', api_router)
// app.use('/api', api_router);
app.get('/api/getInit', (req, res) => {
    console.log("get: /api/getInit");
    res.send({name:"Rene"});
});

app.get('/*', (req, res) => {
    // res.render('./index', { req, res });
    res.sendFile(path.join(__dirname, '../', 'wwwroot', 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});