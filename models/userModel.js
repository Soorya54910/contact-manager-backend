const { uniq } = require('lodash')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    username:{
        type:String,
        required:[true,'please add username']
    },
    email:{
        type:String,
        required:[true,'please add email'],
        uniq:[true,'email already taken']
    },
    password:{
        type:String,
        required:[true,'please add password']
    }
})
module.exports = mongoose.model('User',userSchema)