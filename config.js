'use strict'
module.exports = {
	PORT: process.env.PORT || 3000,
	ENV: process.env.ENV || 'development',
	MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/api',
	DEBUG: process.env.DEBUG || true,
	KEY_TOKEN: process.env.KEY_TOKEN || 's3cr37',
}