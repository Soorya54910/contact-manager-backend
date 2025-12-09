const asyncHandler = require('express-async-handler')
const User  = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const regitserUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new error('All fields are mandatory')
    }
    const userAvailble = await User.findOne({email})
    if(userAvailble){
        res.status(400)
        throw new Error('user already exists')
    }
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("Hashed password ",hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error("user data not valid")
    }
    res.status(201).json({message:'register user'})
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const user = await User.findOne({email})
    if(user && bcrypt.compare(password,user.password)){
        const accessToken = jwt.sign({
            user:{
              username : user.username,
              email:user.email,
              id:user.id
            },
        },process.env.ACCESS_TOKEN,{expiresIn:'2h'})
        res.json({accessToken})
    }else{
      res.status(400)
      throw new Error("email or password not valid")
    }
    res.status(200).json({message:'login user'})
})

const currentUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message:req.user})
})

module.exports = {regitserUser,loginUser,currentUser}