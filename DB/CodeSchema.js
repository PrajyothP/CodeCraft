const mongoose = require('mongoose')

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

module.exports = mongoose.model('Code',codeSchema)