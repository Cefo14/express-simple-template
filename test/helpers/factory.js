'use strict'
const faker = require('faker')

exports.makeUser = () =>{
	return {
		name: faker.name.findName().toLowerCase(),
		email: faker.internet.email().toLowerCase(),
		password: faker.internet.password()
	}
}