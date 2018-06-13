'use strict'
const supertest = require('supertest')
const mongoose = require('mongoose')

const config = require('../config')
const factory = require('./helpers/factory')
const app = require('../app')

const request = supertest(app)

describe('index', () => {
	let User = factory.makeUser()

	before(() => {
		mongoose.connect(config.MONGO_URI)
		mongoose.set('debug', config.DEBUG)
	})

	after((done) => {
		mongoose.disconnect(done)
		mongoose.models = {}
	})

	describe('OK', () => {
		describe('GET /', () => {
			it('should receive a hello world', (done) => {
				request
					.post('/auth/signUp')
					.set('Accept', 'application/json')
					.send(User)
					.expect(201)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const token = res.body.token
						request
							.get('/')
							.set('Accept', 'application/json')
							.set('x-access-token', token)
							.expect(200)
							.expect('Content-Type', /application\/json/)
							.end((err, res) => {
								let body = res.body
								expect(body).to.have.property('message', 'hello world')
								done(err)
							})
					})
			})
		})
	})

	describe('OK', () => {
		describe('GET /', () => {
			it('should receive a hello world', (done) => {
				request
					.post('/auth/signIn')
					.set('Accept', 'application/json')
					.send(User)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end((err, res) => {
						const token = res.body.token
						request
							.get('/')
							.set('Accept', 'application/json')
							.set('x-access-token', token)
							.expect(200)
							.expect('Content-Type', /application\/json/)
							.end((err, res) => {
								let body = res.body
								expect(body).to.have.property('message', 'hello world')
								done(err)
							})
					})
			})
		})
	})
})