const express = require('express')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const validateToken = asyncHandler(async(req,res,next)=>{
    let token
    let authHeader = req.headers.authorization || req.headers.authorization
    if(authHeader || authHeader.startsWith("Bearer")){
         token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error('user is not authorized')
            }
            req.user = decoded.user
            console.log(req.user)
            next()
        })
    }
    if(!token){
        res.status(401)
        throw new Error('user is not authorized or token missing')
    }
})
module.exports = validateToken