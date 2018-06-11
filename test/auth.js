'use strict'
const supertest = require('supertest')
const mongoose = require('mongoose')

const factory = require('./helpers/factory')
const config = require('../config')
const app = require('../app')
const request = supertest(app)

const route = '/auth/'

describe('auth', () => {
	let User = factory.makeUser()
	let token = ''
	before(() => {
		mongoose.connect(config.MONGO_URI)
		mongoose.set('debug', config.DEBUG)
	})

	after((done) => {
		mongoose.disconnect(done)
		mongoose.models = {}
	})

	describe('OK', () => {
		describe('POST /signUp', () => {
			it('should make a user, return this user and auth token', (done) => {
				request
					.post(route + 'signUp')
					.set('Accept', 'application/json')
					.send(User)
					.expect(201)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const body = res.body
						expect(body).to.be.an('object')
						expect(body).to.have.property('auth', true)
						expect(body).to.have.property('token')
						expect(body).to.have.property('user')
						const user = body.user
						expect(user).to.have.property('_id')
						expect(user).to.have.property('name', User.name)
						expect(user).to.have.property('email', User.email)
						expect(user).to.not.have.property('password')
						done(err)
					})
			})
		})

		describe('POST /signIn', () => {
			it('should make a user, return this user and auth token', (done) => {
				request
					.post(route + 'signIn')
					.set('Accept', 'application/json')
					.send(User)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const body = res.body
						expect(body).to.be.an('object')
						expect(body).to.have.property('auth', true)
						expect(body).to.have.property('token')
						token = body.token
						done(err)
					})
			})
		})
	})
})