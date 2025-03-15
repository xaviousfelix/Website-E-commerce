var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loginform', function(req, res, next) {
  res.render('loginform', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Express' });
});

router.get('/insertForm', function(req, res, next) {
  res.render('insertForm', { title: 'Express' });
});

router.get('/registerForm', function(req, res, next) {
  res.render('registerForm', { title: 'Express' });
});

router.get('/customerAuthForm', function(req, res, next){
  res.render('customerAuthForm', { title: 'Express' });
});

router.get('/insertadmin', function(req, res, next){
  res.render('insertadmin', { title: 'Express' });
});

router.get('/ordersListForm', function(req, res, next){
  res.render('ordersListForm', { title: 'Express' });
});




module.exports = router;
