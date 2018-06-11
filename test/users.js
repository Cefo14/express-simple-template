'use strict'
const supertest = require('supertest')
const mongoose = require('mongoose')

const factory = require('./helpers/factory')
const config = require('../config')
const app = require('../app')
const request = supertest(app)

const route = '/users/'

function validateError(res)
{
	const body = res.body
	expect(body).to.be.an('object')
	expect(body).to.have.property('user')
	const user = body.user
	expect(user).to.be.null
}

describe('users', () => {
	let User = factory.makeUser()
	let id = ''
	before(() => {
		mongoose.connect(config.MONGO_URI)
		mongoose.set('debug', config.DEBUG)
	})

	after((done) => {
		mongoose.disconnect(done)
		mongoose.models = {}
	})

	describe('OK', () => {
		describe('POST /', () => {
			it('should make a user and return this user', (done) => {
				request
					.post(route)
					.set('Accept', 'application/json')
					.send(User)
					.expect(201)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const body = res.body
						expect(body).to.be.an('object')
						expect(body).to.have.property('user')
						const user = body.user
						expect(user).to.have.property('_id')
						expect(user).to.have.property('name', User.name)
						expect(user).to.have.property('email', User.email)
						expect(user).to.not.have.property('password')
						id = user._id
						done(err)
					})
			})
		})

		describe('GET /', () => {
			it('should get all users', (done) => {
				request
					.get(route)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const body = res.body
						expect(body).to.be.an('object')
						expect(body).to.have.property('users')
						const users = body.users
						expect(users).to.be.an('array').and.to.have.a.lengthOf.above(0)
						users.forEach((user) => {
							expect(user).to.be.an('object')
							expect(user).to.have.property('_id')
							expect(user).to.have.property('name')
							expect(user).to.have.property('email')			
							expect(user).to.not.have.property('password')	
						})
						done(err)
					})
			})
		})

		describe('GET /:id', () => {
			it('should show a user', (done) => {
				request
					.get(route + id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const body = res.body
						expect(body).to.be.an('object')
						expect(body).to.have.property('user')
						const user = body.user
						expect(user).to.have.property('_id', id)
						expect(user).to.have.property('name', User.name)
						expect(user).to.have.property('email', User.email)
						expect(user).to.not.have.property('password')
						done(err)
					})
			})
		})

		describe('PUT /:id', () => {
			it('should update a user', (done) => {
				User = factory.makeUser()
				request
					.put(route + id)
					.set('Accept', 'application/json')
					.send(User)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const body = res.body
						expect(body).to.be.an('object')
						expect(body).to.have.property('user')
						const user = body.user
						expect(user).to.have.property('_id', id)
						expect(user).to.have.property('name', User.name)
						expect(user).to.have.property('email', User.email)
						expect(user).to.not.have.property('password')
						done(err)
					})
			})
		})

		describe('DELETE /:id', () => {
			it('should remove a user', (done) => {
				request
					.delete(route + id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const body = res.body
						expect(body).to.be.an('object')
						expect(body).to.have.property('user')
						const user = body.user
						expect(user).to.have.property('_id', id)
						expect(user).to.have.property('name', User.name)
						expect(user).to.have.property('email', User.email)
						expect(user).to.not.have.property('password')
						done(err)
					})
			})
		})
	})

	describe('ERRORS', () => {
		describe('POST /', () => {
			it('should 400 error and empty user', (done) => {
				request
					.post(route)
					.set('Accept', 'application/json')
					.send({})
					.expect(400)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						validateError(res)
						done(err)
					})
			})
		})

		describe('GET /:id', () => {
			it('should 404 error and empty user', (done) => {
				request
					.get(route + id)
					.set('Accept', 'application/json')
					.expect(404)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						validateError(res)
						done(err)
					})
			})
		})

		describe('GET /:id', () => {
			it('should 400 error and empty user', (done) => {
				request
					.get(route + id + 1)
					.set('Accept', 'application/json')
					.expect(400)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						validateError(res)
						done(err)
					})
			})
		})

		describe('PUT /:id', () => {
			it('should  404 error and empty user', (done) => {
				request
					.put(route + id)
					.set('Accept', 'application/json')
					.send({})
					.expect(404)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						validateError(res)
						done(err)
					})
			})
		})

		describe('PUT /:id', () => {
			it('should  400 error and empty user', (done) => {
				request
					.put(route + id + 1)
					.set('Accept', 'application/json')
					.send({})
					.expect(400)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						validateError(res)
						done(err)
					})
			})
		})

		describe('DELETE /:id', () => {
			it('should  404 error and empty user', (done) => {
				request
					.delete(route + id)
					.set('Accept', 'application/json')
					.expect(404)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						validateError(res)
						done(err)
					})
			})
		})

		describe('DELETE /:id', () => {
			it('should  400 error and empty user', (done) => {
				request
					.delete(route + id + 1)
					.set('Accept', 'application/json')
					.expect(400)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						validateError(res)
						done(err)
					})
			})
		})
	})
})