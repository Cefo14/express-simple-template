'use strict'
const express = require('express')
const indexController = require('../controllers/index')
const auth = require('../middlewares/auth')
const router = express.Router()

/* GET home page. */
router.get('/', auth.check, indexController.index)

module.exports = router
