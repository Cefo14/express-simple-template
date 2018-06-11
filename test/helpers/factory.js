'use strict'
const faker = require('faker')

exports.makeUser = () =>{
	return {
		name: faker.name.findName(),
		email: faker.internet.email(),
		password: faker.internet.password()
	}
}