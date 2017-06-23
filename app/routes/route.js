'use strict';
const express  = require('express');
const jwt      = require('jsonwebtoken');
const User     = require('../model/schema.js');
const bcrypt   = require('bcrypt');
const router   = express.Router();
function resGen(message, isSuccess) {
	var resData = {
		msg: message,
		isSuccess: isSuccess
	};
	return resData;
}
router.route('/login')
.post(function(req, res){
	console.log(req.body);
	User.findOne({regNum: req.body.reg},  function(err, data){
		var resData = {};
		console.log(err);
		if(err){
			console.log(err);
			resData = resGen(err, false); 
			res.json(resData);
		} else
		if(data){
			bcrypt.compare(req.body.pwd, data.password, function(err, isSame) {
				if(isSame){
					console.log(data);
					resData = resGen("username matched with password", true);
					var token = jwt.sign({name: data.name, regNum: data.regNum, email: data.email},"nagaraj", { algorithm: 'HS512'});
					resData.data = {id: data._id, name: data.name, email: data.email, token: token};
					res.json(resData);
				}else
				if(!isSame) {
					console.log("password mismatch");
					resData = resGen("invalid username or password", false);
					res.json(resData);
				}
			});

		}	
	})
	
})

module.exports = router;