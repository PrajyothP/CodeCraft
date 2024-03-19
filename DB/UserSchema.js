const mongoose = require("mongoose")

//User schema
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        reqiured : [true , 'Please provide username'],
        maxlength : 30
    },
    email : {
        type : String,
        reqiured : [true , 'Please provide email'],
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

//Code schema
const codeSchema = mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    lang : {
        type : String,
        required : true
    },
    content : {
        type : "String",
        reqiured : true
    }
})




module.exports = mongoose.model('User',userSchema)
