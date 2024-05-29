const UserModel = require("../models/user")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const loginController = require("./login")

//Não autenticada 

const clientController = express.Router()

loginController.post(

)