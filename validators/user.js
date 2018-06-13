'use strict'
const { body } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

exports.store = [
	body('name')
		.trim()
		.escape(),

	body('email')
		.isEmail()
		.normalizeEmail(),
]

exports.update = [
	body('name')
		.trim()
		.escape(),

	body('email')
		.isEmail()
		.normalizeEmail(),
]