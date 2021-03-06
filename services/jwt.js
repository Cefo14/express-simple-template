'use strict'
const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config')

exports.encode = (user) => {
	const payload = {
		id: user._id,
		iat: moment().unix(),
		exp:moment().add(7, 'days').unix(),
	}
	
	return jwt.sign(payload, config.KEY_TOKEN)
}

exports.decode = (token) => {
	return jwt.verify(token, config.KEY_TOKEN)
}