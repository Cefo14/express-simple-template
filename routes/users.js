'use strict'
const express = require('express')
const usersController = require('../controllers/users')
const userValidator = require('../validators/user.js')
const router = express.Router()

// GET get all users. 
router.get('/', usersController.index)

// GET a user.
router.get('/:id', usersController.show)

// POST store user.
router.post('/', userValidator.store, usersController.store)

// PUT update a user.
router.put('/:id', usersController.update)

// DELETE delete a user.
router.delete('/:id', usersController.delete)

module.exports = router