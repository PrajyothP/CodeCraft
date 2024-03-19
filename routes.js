const express = require("express")
const fs = require("fs")
const path = require("path")
const router = express.Router()

const {Send_ans} = require(path.join(__dirname,"Controllers","Compiler.js"))
const{
    Register_user,
    Login_user
} = require(path.join(__dirname,"Controllers","RegisterAndLogin.js"))
const{Save_code,
      Load_code
} = require(path.join(__dirname,"Controllers","Code.js"))



router.route("/compile").post(Send_ans)
router.route("/signup").post(Register_user)
router.route("/login").post(Login_user)
router.route("/save").post(Save_code)
router.route("/load").post(Load_code)



module.exports = router