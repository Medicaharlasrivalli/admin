const express=require('express');
const { authLogin } = require('../controllers/adminlogin');
const router=express.Router();
router.post('/',authLogin)

module.exports=router