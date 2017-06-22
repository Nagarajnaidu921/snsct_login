'use strict';
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/tester';
const bcrypt = require('bcrypt');
mongoose.connect(uri, function(err){
	if (err) {
		console.log(err);
	}
});
var db = mongoose.connection;
db.on('error', function() {
	console.log('connection failed');
});
db.once('open', function() {
	console.log('Db connection established');
});
var dep = ['au', 'ae', 'ag', 'bm', 'ce', 'cp', 'cs', 'ee', 'ei', 'ec', 'it', 'mc', 'me', 'ma'];
var pwd = 'snsct2018';
const Schema = mongoose.Schema;
const userSchema = new Schema({
	name: String,
	regNum: String,
	email: String,
	password: String
});
const userData = mongoose.model('userData', userSchema);

	bcrypt.hash(pwd, 10, function(err, hash){

		var userDta = {
			name: 'Nagaraj V',
		};
		for (var i = 0 ; i <= dep.length - 1; i++) {
			userDta.regNum = '14' + dep[i] + '019';
			userDta.email = userDta.regNum + '@gmail.com';
			userDta.password = hash;
			console.log(userDta);
			var newUserModel = new userData(userDta);
			newUserModel.save(function(err){
				if(err){
					console.log(err);
				}
			});
		}
		
	});
