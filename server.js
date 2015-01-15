//Module =======================================================================
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//Configuration ================================================================
//Db config

//Port config
var port = process.env.PORT || 8080;
//App config
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : ' application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
//Routes =======================================================================
//API
require('./app/routes/api')(app);
//SocketIO communication
require('./app/routes/socket')(io);
//Start App ====================================================================
server.listen(port);
console.log('Everything is OK on port :' + port);
