const { default: axios } = require("axios")
const qs = require("qs")
const path = require("path")
const mongoose = require('mongoose')
const User = require(path.join(__dirname,"..","DB","UserSchema.js"))
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require("dotenv").config()


//Register user in DB
const Register_user = async(req,res)=>{
    var {name , email , password} = req.body
    //Hashing password
    const hashedPassword  = bcrypt.hashSync(password,10)
    try{
        const user = await User.create({
           name,
           email,
           password : hashedPassword
         })

        const token = await jwt.sign({id : user._id},process.env.SECRET_KEY)
        //send token
        res.status(200).cookie('jwt',token,{maxAge : 1800000}).json({msg : "User created" , status : 200}).end()
    }
    catch(err){
        //Catch user exists error
        if(err.code==11000){
            res.json({msg : "User already exists", status : 422}).end()
        }
        else{
        //Other DB related error
            res.json({msg : "Unexpected error" , status : 500}).end()
        }
        console.log(err)
    }
}


//Logging user
const Login_user = async (req,res)=>{
    try{
    const {email ,password} = req.body
    const user = await User.findOne({email})
    if(user===null){
    //User not found
        res.json({msg : "User does not exist" , status : 404}).end()
    }
    //Checking password
        const {password : userPassword} = user
        //Wrong password
        if(!(await bcrypt.compare(password,userPassword))){
            res.json({msg : "Wrong password" , status : 401}).end()
        }
        else{
        //Send back jwt
            const token = await jwt.sign({id : user._id},process.env.SECRET_KEY)
            res.cookie("jwt",token,{maxAge : 1800000}).json({msg : "OK" , status : 200}).end()
        }
  }
  catch(err){
    console.log(err)
    res.json({msg : err , status : 500}).end()
  }
}

module.exports = {
    Register_user,
    Login_user
}