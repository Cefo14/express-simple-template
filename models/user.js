'use strict'
const mongoose = require('mongoose')
const bcrypt = require('../services/bcrypt')

function encrypt(text)
{
	return bcrypt.encrypt(text)
}

const schema = new mongoose.Schema(
{
	name: {type: String, required: true},
	email: {type: String, required: true, index : {unique : true}},
	password: {type: String, required: true, select: false, set: encrypt},
})

module.exports = mongoose.model('user', schema)