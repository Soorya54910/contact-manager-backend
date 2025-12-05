const express = require('express')
const Router = express.Router()
const {getContact,getAllContact,updateContact,createContact,deleteContact} = require('../controllers/contactController')
const validateToken = require('../middleware/validateToken')

Router.use(validateToken)
Router.route('/').get(getAllContact).post(createContact)
Router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = Router