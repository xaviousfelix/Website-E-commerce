// นำเข้า Express.js และสร้าง router
var express = require('express');
var router = express.Router();

// นำเข้าโมดูล MySQL และเชื่อมต่อกับฐานข้อมูล
var mysql = require('../connect');

// นำเข้า multer สำหรับการจัดการอัปโหลดไฟล์
const multer = require('multer');

// นำเข้าโมดูล path และ fs สำหรับการจัดการไฟล์
const path = require('path');
const fs = require('fs');

// เส้นทางนี้ดึงข้อมูลสินค้าเพื่อแสดงในหน้า authurize ของ admin
router.get('/admins_auth/adminsForm', function(req, res, next) {
    var sql = 'SELECT * FROM products';
    mysql.query(sql, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.render('adminsForm', { items: result });
        }
    });
});

// ดึงข้อมูลในตารางขึ้นมาแสดงในหน้า authurize ของ customer  
router.get('/customers_auth/productsForm', function(req, res, next) {
    var sql = 'SELECT * FROM products';
    mysql.query(sql,(err, result)=>{
        if(err){
          res.send(err);
        }else{
          res.render('productsForm', { items:result });
  
        }
      })
    });
  
  
  // ดึงข้อมูลในตารางขึ้นมาแสดงในหน้า authurize ของ customer สำหรับลูกค้าที่ลงทะเบียนแล้ว  
  router.get('/customers_auth/login/productsForm/:customerID', function(req, res, next) {
    const customerID = req.params.customerID;
    console.log(customerID)
    var sql = 'SELECT * FROM products';
    mysql.query(sql,(err, result)=>{
        if(err){
          res.send(err);
        }else{
          res.render('customerAuthForm', { items: result, customerID: customerID });
        }
      })
    });
  
  
// ตั้งค่าการจัดเก็บไฟล์รูปภาพในโฟลเดอร์ public/images
const storage = multer.diskStorage({
    destination: 'public/images',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// สร้าง multer middleware สำหรับการอัปโหลดไฟล์รูปภาพ
const upload = multer({ storage: storage });

// ใช้ middleware สำหรับการแปลงค่ารูปแบบ application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: false }));
// ใช้ middleware สำหรับการแปลงค่ารูปแบบ JSON
router.use(express.json());

// เส้นทางนี้รับข้อมูลจาก form แบบ multipart/form-data และเพิ่มข้อมูลสินค้าในฐานข้อมูล
router.post('/insert', upload.single('Image'), (req, res) => {
    const sql = 'INSERT INTO products SET ?';
    const data = req.body;

    // ถ้ามีการอัปโหลดรูปภาพใหม่ กำหนดชื่อไฟล์ให้กับฟิลด์ Image
    if (req.file) {
        data.Image = req.file.filename;
    }

    // ส่งคำสั่ง SQL เพื่อเพิ่มข้อมูลสินค้า
    mysql.query(sql, data, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/admins_auth/adminsForm');
        }
    });
});

// เส้นทางนี้ดึงข้อมูลสินค้าเพื่อแสดงในหน้า updateForm เพื่อให้ผู้ใช้แก้ไข
router.get('/edit/:ProductID', (req, res) => {
    var sql = 'SELECT * FROM products WHERE ProductID=?';
    mysql.query(sql, req.params.ProductID, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.render('updateForm', {
                data: result[0]
            });
        }
    });
});

// เส้นทางนี้ใช้สำหรับการแก้ไขข้อมูลสินค้าในฐานข้อมูลและจัดการกับไฟล์รูปภาพ
router.post('/edit/:ProductID', upload.single('image'), (req, response) => {
    var sql = 'UPDATE products SET ? WHERE ProductID = ?';
    var params = [req.body, req.params.ProductID];

    // การจัดการกับรูปภาพ
    if (req.file) {
        // ลบรูปภาพเก่า (ถ้ามี)
        const oldImagePath = path.join(__dirname, 'public', 'images', req.body.oldImage);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }

        // กำหนดชื่อรูปภาพใหม่
        params[0].Image = req.file.filename;
    }

    // ส่งคำสั่ง SQL เพื่ออัปเดตข้อมูลสินค้า
    mysql.query(sql, params, (err, result) => {
        if (err) {
            response.send(err);
        } else {
            response.redirect('/admins_auth/adminsForm');
        }
        response.end();
    });
});

// เส้นทางนี้ใช้สำหรับลบข้อมูลสินค้าออกจากฐานข้อมูล
router.get('/delete/:ProductID', (req, response) => {
    var sql = 'DELETE FROM products WHERE ProductID = ?';
    var id = req.params.ProductID;

    // ส่งคำสั่ง SQL เพื่อลบข้อมูลสินค้า
    mysql.query(sql, id, (err, result) => {
        if (err) {
            response.send(err);
        } else {
            response.redirect('/admins_auth/adminsForm');
        }
        response.end();
    });
});

// ส่ง router ไปใช้งานที่ส่วนอื่นของแอปพลิเคชัน
module.exports = router;