var express = require('express')
var app = express()
var path = require('path');
var http = require("http");

app.get('/', function (req, res) {
	console.log("Request for index.html file received!");
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));
app.use(express.static(__dirname + '/public'));

app.listen(8080, function () {
	console.log('Example app listening on port 8080!')
})
