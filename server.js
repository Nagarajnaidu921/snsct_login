'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var jwt        = require("jsonwebtoken");
const app = express();
var PORT = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
// require('./db.js'); //uncomment the code to run the script to generate db automatically
app.listen(PORT, function(){
	console.log("listening to the port %d", PORT);
});
