'use strict'
const moment = require('moment')
const jwt = require('../services/jwt')

exports.check = async (req, res, next) => {
	const token = req.headers['x-access-token']
	if(token)
	{
		try
		{
			const payload = await jwt.decode(token)
			if(payload.exp < moment().unix())
				res.status(403).json({auth: false, token: false})
			req.user_id = payload.id
			return next()
		}

		catch(err)
		{
			res.status(403).json({auth: false, token: false})
		}
	}

	else
		res.status(403).json({auth: false, token: false})
}