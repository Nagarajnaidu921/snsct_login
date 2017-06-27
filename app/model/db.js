'use strict';
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/tester';
mongoose.connect(uri, function(err){
	if(err){
		console.log(err);
	}
});
var db = mongoose.connection;
db.on('error', function(){
	console.log("connection failed");
});
db.once('open', function(){
	console.log("Db Connection establishe");
});

module.exports = mongoose;
