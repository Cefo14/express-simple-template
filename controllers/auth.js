'use strict'
const User = require('../models/user')
const jwt = require('../services/jwt')
const bcrypt = require('../services/bcrypt')

exports.signIn = async (req, res) => {
	try
	{
		const email = req.body.email
		const password = req.body.password
		const user = await User.findOne({email : email}, '+password');
		const isPassword = bcrypt.compare(user.password, password)
		
		if(user && isPassword)
		{
			const token = jwt.encode(user)
			res.status(200).json({auth: true, token: token})
		}
		else
			res.status(404).json({auth: false})
	}

	catch(err)
	{
		res.status(400)
		res.json({auth: false})
	}
}

exports.signUp = async (req, res) => {
	try
	{
		let user = new User(req.body)
		user = await user.save();
		const token = jwt.encode(user)
		const {password, ..._user} = user._doc
		res.status(201)
		res.json({auth: true, user: _user, token: token})
	}

	catch(err)
	{
		res.status(400)
		res.json({auth: false, user: null})
	} 
}