var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port= 2002;
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
var registerRouter = require('./routes/register');
var insertadminRouter = require('./routes/insertadmin');
var confirmOrderRouter = require('./routes/confirmOrder');
var ordersRouter = require('./routes/orders');
var paymentRouter = require('./routes/payment')



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Route
app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/', adminRouter);
app.use('/', registerRouter);
app.use('/', insertadminRouter);
app.use('/', confirmOrderRouter);
app.use('/', ordersRouter);
app.use('/', paymentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Server setup
app.listen(port,function(){
	console.log('Started port '+port);
});
module.exports = app;
