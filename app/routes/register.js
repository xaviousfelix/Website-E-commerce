// routes/signup.js
const express = require('express');
const router = express.Router();
var mysql = require('../connect');

router.post('/register1', (req, res) => {
  var data = {
    Name: req.body.name,
    LastName: req.body.lastname,
    Address: req.body.address,
    Tel: req.body.tel,
    Email: req.body.email
  };


  var sql = 'INSERT INTO customer_member SET ?';
  mysql.query(sql, data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      // After inserting into the first table, get the inserted row's cmID
      var cmID = result.insertId;

      // Assign the retrieved cmID to data2

      var data2 = {
        username: req.body.username,
        password: req.body.password,
        cmID: cmID, // Initialize cmID as 0 (or you can remove this line if cmID is set to auto-increment)
        types:'customer'
      };
    
      console.log(data2)
      var sql2 = 'INSERT  INTO accounts SET ?';
      mysql.query(sql2, data2, (err2, result2) => {
        if (err2) {
          res.send(err2);
        } else {
          res.redirect('/');
        }
      });
    }
  });
});


module.exports = router;
