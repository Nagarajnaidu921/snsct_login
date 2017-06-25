'use strict';
const express  = require('express');
const jwt      = require('jsonwebtoken');
const User     = require('../model/schema.js');
const bcrypt   = require('bcrypt');
const router   = express.Router();
function resGen(message, isSuccess) {
	var resData = {
		messasge: message,
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
					resData = resGen("username matched with password", true);
					resData.id = data._id;
					resData.regNum = data.regNum;
					resData.name = data.name;
					resData.email = data.email;
					var token = jwt.sign({regNum: data.regNum, email: data.email},'nagaraj', { algorithm: 'HS512'});
					resData.token = token.toString();
					res.json(resData);
				}else
				if(!isSame) {
					resData = resGen("invalid username or password", false);
					res.json(resData);
				}
			});

		}	
	})
	
});

router.route('/authenticate')
.post(function(req, res){
	var body = req.body; 
	jwt.verify(body.data, 'nagaraj', function(err, decode){
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