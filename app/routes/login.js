const express = require('express');
const session = require('express-session');
const router = express.Router();
const connection = require('../connect');

router.use(session({
  secret: 'your-secret-key', // เปลี่ยนเป็นคีย์ที่ปลอดภัย
  resave: false,
  saveUninitialized: true
}));

// Authentication route
router.post('/auth', (request, response) => {
  const { username, password } = request.body;

  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ?', [username], (error, results) => {
      if (error) {
        console.error('Error during authentication:', error);
        response.sendStatus(500); // Internal Server Error
        return;
      }

      if (results.length > 0) {
        const user = results[0];

        if (user.password === password) {
          // เพิ่ม logs เข้าไปในฐานข้อมูล
          const logEntry = {
            logUsername: username,
            logPassword: password,
            logTime: new Date().toISOString()
          };

          connection.query('INSERT INTO login_log SET ?', logEntry, (logError, logResult) => {
            if (logError) {
              console.error('Error adding login log:', logError);
            } else {
              console.log('Login log added:', logResult);
            }
          });

          // เซต session สำหรับ admin ที่เข้าสู่ระบบ
          request.session.loggedin = true;
          request.session.username = username;

          if (user.types === 'admin') {
            response.redirect('/admins_auth/adminsForm');
          } else if (user.types === 'customer') {
            custtomerID = results[0].cmID
            response.redirect('/customers_auth/login/productsForm/' + custtomerID);
          }
        } else {
          const errorMessage = "Username and/or Password! ไม่ถูกต้อง";
          response.send(`<script>alert('${errorMessage}'); window.location.href = '/loginForm';</script>`);
        }
      } else {
        const errorMessage = "ไม่พบ Username not found! ";
        response.send(`<script>alert('${errorMessage}'); window.location.href = '/loginForm';</script>`);
      }
    });
  } else {
    response.send('โปรดกรอก Username และ Password!');
  }
});

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
