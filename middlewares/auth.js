'use strict'
const moment = require('moment')
const jwt = require('../services/jwt')

exports.auth = (req, res, next) => {
	const token = req.headers['x-access-token']
	if(token)
	{
		const payload = jwt.decode(token)
		if(payload.exp < moment().unix())
			res.status(401).json({auth: false, token: false})
		req.user_id = payload.id
		return next()
	}

	else
		res.status(403).json({auth: false})
}