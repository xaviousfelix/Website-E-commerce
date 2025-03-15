var express = require('express');
var router = express.Router();
var mysql = require('../connect');

// เพิ่มข้อมูลในตาราง 
router.post('/confirmOrder/:customerID', (req, res) => {
  const data = req.body;
  console.log(data);
  
  // ข้อมูลที่ส่งมาจากฟอร์ม
  const { quantitys, customerID, ProductID, ProductPrice, totalPrice } = data;

  // คำสั่ง SQL เพื่อเพิ่มข้อมูลในตาราง orders
  const insertOrderQuery = `
    INSERT INTO orders (ProductID, cmID, Quantity, SubTotalPrice, TotalAll, orderDate)
    VALUES (?, ?, ?, ?, ?, NOW())`;

  // คำสั่ง SQL เพื่ออัปเดต stock ในตาราง products
  const updateStockQuery = `
    UPDATE products
    SET UnitsInStock = UnitsInStock - ?
    WHERE ProductID = ?`;

  // เชื่อมต่อกับ MySQL
  mysql.connect(err => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }

    let totalAll = 0; // สร้างตัวแปร totalAll เพื่อเก็บค่ารวมทั้งหมด

    // วนลูปเพื่อเพิ่มข้อมูลในตาราง
    for (let i = 0; i < ProductID.length; i++) {
      const productId = ProductID[i];
      const quantity = quantitys[i];
      const subtotalPrice = quantitys[i] * ProductPrice[i]; // หา subtotals ของสินค้านั้น
      totalAll = totalPrice; // เพิ่มค่าราคารวมทั้งหมด

      const values = [productId, customerID, quantity, subtotalPrice, totalAll];

      mysql.query(insertOrderQuery, values, (err, result) => {
        if (err) {
          console.error('Error inserting order:', err);
          return;
        }
        console.log('Order inserted:', result);

        // ทำการอัปเดต stock ในตาราง products
        mysql.query(updateStockQuery, [quantity, productId], (updateErr, updateResult) => {
          if (updateErr) {
            console.error('Error updating stock:', updateErr);
            return;
          }
          console.log('Stock updated for ProductID', productId);

          // เมื่อลูปทั้งหมดเสร็จสิ้นให้ทำการแสดงผลหน้า 'paymentForm'
          if (i === ProductID.length - 1) {
            res.render('paymentForm', { totalAll: totalAll ,customerID: customerID});
              //res.send('การทำรายการซื้อสินค้าเรียบร้อย');
            console.log(totalAll)
          }
        });
      });
    }
  });
});

module.exports = router;
