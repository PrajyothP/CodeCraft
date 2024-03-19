const path = require("path")
const mongoose = require('mongoose')
const Code = require(path.join(__dirname,"..","DB","CodeSchema.js"))
const jwt = require('jsonwebtoken')


//Saving code
const Save_code = async(req,res)=>{
    try{
        const {lang , code} = req.body
        const jsonwt = req.cookies.jwt
        //If not logged in
        if(!jsonwt){
            res.json({msg : "Please login or register to save code", status : 404}).end()
        }
        const {id} = jwt.decode(jsonwt)
        //Checking if code already exists
        const saved_code = await Code.findOne({id , lang})
        if(saved_code===null){
            await Code.create({
                id,
                lang,
                content : code
            })
        }
        else{
            saved_code.content = code
            await saved_code.save()
        }
        res.json({msg : "Code saved" , status : 200}).end()
    }
    catch(err){
        console.error(err)
        res.json({msg : err , status : 500})
    }
}

//Loading code
const Load_code = async(req,res)=>{
    try{
    const lang = req.body.lang
    const jsonwt = req.cookies.jwt

    const {id} = jwt.decode(jsonwt)

    //Finding code in DB
    const code = await Code.findOne({id,lang})

    //Code doesnt exist
    if(code==null){
        res.json({msg : "No code found" , status : 204}).end() 
        return
    }
    res.json({msg : code.content , status : 200}).end()
  }
  catch(err){
    console.error(err)
    res.json({msg : err , status : 500}).end()
  }
}
module.exports = {
    Save_code,
    Load_code
}