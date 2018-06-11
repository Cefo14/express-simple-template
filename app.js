'use strict'
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose');
const compression = require('compression')
const helmet = require('helmet')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

const config = require('./config')

const app = express()

app.use(helmet())
app.use(compression())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = config.ENV === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.send({message: 'error'})
})


mongoose.connect(config.MONGO_URI);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app
