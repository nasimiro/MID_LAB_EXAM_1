var express = require('express');
var exSession = require('express-session');
var bodyParser = require('body-parser');


var login =require('./controllers/login');
var admin= require('./Controllers/adminController');


var app =express();

//config
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: ' ', saveUninitialized: true, resave: false}));
app.use(function(req, res, next)
{
  res.locals.uid = req.session.uid;
  res.locals.type = req.session.type;
  next();
});

app.use('/',login);
app.use('/login',login);
app.use('/admin',admin);



app.listen(5555, function()
{
	console.log('_____________________________\n\tBUSINESS TOOL\nEXPRESS HTTP SERVER STARTED\nPORT NO. 3333\n_____________________________');
});

app.get('/', function(req, res)
{
	res.render('login/index');
});
app.get('/login', function(req, res)
{
	res.render('login/index');
});