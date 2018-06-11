'use strict'
const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)

describe('index', () => {
	describe('OK', () => {
		describe('GET /', () => {
			it('should receive a hello world', (done) => {
				request
					.get('/')
					.set('Accept', 'application/json')
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