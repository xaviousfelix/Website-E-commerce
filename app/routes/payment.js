var express = require('express');
var router = express.Router();
var mysql = require('../connect');
const multer = require('multer'); // เพิ่ม Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/SlipPayment'); // ชื่อโฟลเดอร์ที่คุณต้องการเก็บไฟล์
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const timestamp = date.getTime(); // หาค่า timestamp ปัจจุบัน
    const fileExtension = file.originalname.split('.').pop(); // หานามสกุลของไฟล์

    // สร้างชื่อไฟล์ใหม่โดยใช้ timestamp และนามสกุลไฟล์
    const newFileName = `${timestamp}.${fileExtension}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });


/* GET home page. */
router.post('/payment/:cmID/:TotalAll', upload.single('SlipPayment'),(req, res)=>{
var values = [req.body];
console.log(values);

  var sql = 'INSERT INTO payment SET?';
  mysql.query(sql,values,(err,result)=>{
    if(err){
      res.send(err);
  } else{
    res.redirect('/');
  }
  })
});

module.exports = router;
