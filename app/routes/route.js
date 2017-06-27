'use strict';
const express  = require('express');
const jwt      = require('jsonwebtoken');
const User     = require('../model/schema.js');
const config   = require('../model/config.js');
const bcrypt   = require('bcrypt');
const router   = express.Router();
function resGen(message, isSuccess) {
	var resData = {
		message: message,
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
			resData = resGen(err, false); 
			res.json(resData);
		} else
		if(!data){
			resData = resGen("Invalid Register Number Contact Admin", false);
			res.json(resData);
		}
		if(data){
			bcrypt.compare(req.body.pwd, data.password, function(err, isSame) {
				if(isSame){
					resData = resGen("username matched with password", true);
					console.log(config.jwt.secret);
					resData.id = data._id;
					resData.regNum = data.regNum;
					resData.name = data.name;
					resData.email = data.email;
					var token = jwt.sign({regNum: data.regNum, email: data.email},config.jwt.secret, { algorithm: 'HS512'});
					resData.token = token.toString();
					res.json(resData);
				}else
				if(!isSame) {
					resData = resGen("invalid Register or password", false);
					res.json(resData);
				}
			});

		}	
	})
	
});

router.route('/authenticate')
.post(function(req, res){
	var body = req.body; 
	jwt.verify(body.data, config.jwt.secret, function(err, decode){
		if(err){
			console.log(err);
			res.json(resGen("failed to authenticate token", false ));
		}else
		if(decode){
		res.json(resGen("successfully authenticated", true ));	
		}
	});
});

module.exports = router;