const express = require('express');
const router = express.Router();
var mysql = require('../connect');

//เพิ่ม admin
router.post('/insertadmin1',(req, res)=>{
    var data = {
      username : req.body.username,
      password : req.body.password,
      tel : req.body.tel,
      types:'admin'
    };
    var sql = 'INSERT INTO accounts SET?';
    mysql.query(sql,data,(err,result)=>{
      if(err){
        res.send(err);
    } else{
      
      res.redirect('/admins_auth/adminsForm');
    }
    })
  }
  );

  module.exports = router;