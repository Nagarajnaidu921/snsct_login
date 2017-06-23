'use strict';
const mongoose = require('./db.js');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name: {type: String, required: true},
	regNum: {type: String, required: true, validate: /[1-9][1-9](au|ae|ag|bm|ce|cp|cs|ee|ei|ec|it|mc|me|ma)[0-9][0-9][0-9]/, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	token: {type: String, required: true},
});
const UserData = mongoose.model('UserData', UserSchema);
module.exports = UserData;