const { default: axios } = require("axios")
const qs = require("qs")
const path = require("path")
const mongoose = require('mongoose')
require("dotenv").config()


//Getting output from API
const Send_ans = (req,res)=>{
    var {code,lang,input} = req.body
    switch (lang) {
        case "Java":
            lang = "java";
            break;
        case "Python":
            lang="py";
            break;
        case "C++":
            lang="cpp";
            break
        case "C":
            lang="c"
            break;
    }
    //Setup to API request
    const body = qs.stringify({
        'code': code,
        'language': lang,
        'input': input
    })
    //Request to compiler API
    const apiReq = {   
        method : "POST",
        url : process.env.COMPILE_API_URL,
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : body
    }
    axios(apiReq)
    .then((response)=>{
        res.status(200).send(JSON.stringify(response.data))
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}



module.exports = {
    Send_ans
}

