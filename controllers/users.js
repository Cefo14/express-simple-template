'use strict'
const User = require('../models/user')

exports.index = async (req, res) => {
	const users = await User.find({});
	res.status(200)
	res.json({users: users})
}

exports.show = async (req, res) => {
	try
	{
		const id = req.params.id
		const user = await User.findOne({_id : id});
		user ? res.status(200) : res.status(404)
		res.json({user: user})
	}

	catch(err)
	{
		res.status(400)
		res.json({user: null})
	}
}

exports.store = async (req, res) => {
	try
	{
		let user = new User(req.body)
		user = await user.save();
		const {password, ..._user} = user._doc
		res.status(201)
		res.json({user: _user})
	}

	catch(err)
	{
		res.status(400)
		res.json({user: null})
	} 
}

exports.update = async (req, res) => {
	try
	{
		const id = req.params.id
		const data = req.body
		const user = await User.findByIdAndUpdate(id, data, {new: true});
		user ? res.status(200) : res.status(404)
		res.json({user: user})
	}

	catch(err)
	{
		res.status(400)
		res.json({user: null})
	} 
}

exports.delete = async (req, res) => {
	try
	{
		const id = req.params.id
		const done = await User.findByIdAndRemove(id);
		done ? res.status(200) : res.status(404)
		res.json({user: done})
	}

	catch(err)
	{
		res.status(400)
		res.json({user: null})
	}
}