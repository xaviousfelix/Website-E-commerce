var express = require('express');
var router = express.Router();
var mysql = require('../connect');

router.get('/orders', (req, res) => {
  const quantity = req.query.quantity;
  const data2 = req.query.productIDs;
  console.log(data2);
  const customerID = req.query.customerID;
  console.log(customerID)
 

  // รับค่า ProductID ที่ถูกส่งมาแยกเป็น Array ด้วยเครื่องหมาย "," แล้วแปลงเป็นตัวเลข
  var productIDs = req.query.productIDs.split(',').map(Number);

  var sql = 'SELECT * FROM products WHERE ProductID IN (?) AND UnitsInStock > 0';
  mysql.query(sql, [productIDs], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      let subtotal = 0;
      let subtotals = [];
      let quantitys =[];
      for (let i = 0; i < result.length; i++) {
        const itemSubtotal = result[i].ProductPrice * quantity; // คำนวณราคารวมของรายการแต่ละรายการ
        subtotal += itemSubtotal; // บวกค่าราคารวมของรายการแต่ละรายการในราคารวมทั้งหมด
        subtotals.push(itemSubtotal); // เพิ่มค่าราคารวมของรายการแต่ละรายการในอาร์เรย์
        console.log(subtotals)
        quantitys.push(quantity)
        console.log(quantitys)
      }
      let total = subtotal; // ให้ total เท่ากับ sub total เริ่มต้น
      console.log(subtotal)
      res.render('ordersListForm', { products: result, customerID: customerID, quantitys: quantitys, subtotals: subtotals, total: total });
    }
  });
});


module.exports = router;
