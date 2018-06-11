'use strict'
const express = require('express')
const authController = require('../controllers/auth')
const router = express.Router()

// POST store and log user. 
router.post('/signUp', authController.signUp)

// POST log user. 
router.post('/signIn', authController.signIn)

module.exports = router