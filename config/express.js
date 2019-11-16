const express = require("express")
    , app = express()
    , compression = require('compression')
    , bodyParser = require("body-parser")
    , pool = require('./db')
    , connectionMiddleware = require('./connection-middleware')
    , routes = require('../routes/app')
    , expressValidator = require('express-validator')
    , path = require("path");

function wwwRedirect(req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
    }
    next();
};

app.use(compression());

app.set('trust proxy', true);
app.use(wwwRedirect);
app.use(connectionMiddleware(pool));
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static('public', {
    root: path.dirname(__dirname)
}));

routes(app);

module.exports =  app;
