var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

var login 	= require.main.require('./models/login');

router.get('/',[
    check('username','username required').isEmpty(),
    check('password','Passwprd is required').isEmpty()
],
function(req,res){
    var errors =validationResult(req); 
    console.log('login page requested!');
    res.render('login/index',{error:errors.mapped()});
    
})

router.post('/',[
    check('username','username required').not().isEmpty(),
    check('password','Password is required').not().isEmpty()
],
function(req,res){
    var user={
        username: req.body.username,
        password: req.body.password
    };
    var errors =validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.mapped());
        res.render('login/index',{error:errors.mapped()});
    }
    else
    {
        login.login(user,function(response){
            if(response.length > 0){
                req.session.status=response[0].status;
                req.session.username=response[0].username;
                if(req.session.status=='1'){
                    res.redirect('/admin');
                }
            }
            else{
                console.log(req.body);
                req.send('invalid username / Password')
            }
        })
    }

})

module.exports = router;