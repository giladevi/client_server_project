var express = require('express');
var path = require('path');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'danigilaserver@gmail.com',
    pass: 'yasatum1'
  }
});
var mailOptions = {
  from: 'danigilaserver@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'confirmation',
  text: 'That was NOT easy!'
};



app.use(express.static(__dirname));                 //included to use css file
app.use(bodyParser.json());                         // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// app.get('/api/users', function(req, res) {
// var user_id = req.param('id');
// var token = req.param('token');
// var geo = req.param('geo'); 
// res.send(user_id + ' ' + token + ' ' + geo);
// });

app.get('/signIn', function(req, res) {
    res.sendFile(path.join(__dirname + '/signIn.html'));
});

app.post('/signIn', function(req, res) {
  var user_id = req.body.user;
  var user_password = req.body.password;
  if (user_id == 'Admin' && user_password == 'Admin'){
    console.log("admin admin")
      res.sendFile(path.join(__dirname + '/contactUs.html'));
  }
  else res.send("ya satum")
});
  

app.get('/signUp', function(req, res) {
  res.sendFile(path.join(__dirname + '/signUp.html'));
});

app.post('/signUp', function(req, res) {
  var user_id = req.body.user
  var user_password = req.body.password
  var password_confirmation = req.body.confirmation
  if (checkSignUpValidation(user_id, user_password, password_confirmation)){
    mailOptions['to'] = user_id
    res.send("ya satum")
    transporter.sendMail(mailOptions, 
      function(error, info){
      if (error) {console.log(error);}
      else
        console.log('Email sent: ' + info.response);
   });
  }
});

app.get('/contactUs',function(req,res){
  res.sendFile(path.join(__dirname + '/contactUs.html'));
});

app.post('/contactUs',function(req, res){
  var user_name = req.body.name
  var user_email = req.body.user
  var user_concerning = req.body.concerning
  var user_subject = req.body.subject
  mailOptions['to'] = 'danigilaserver@gmail.com'
  mailOptions['subject'] = user_concerning
  mailOptions['text'] = user_name+"\n"+user_email+"\n"+user_subject

  transporter.sendMail(mailOptions, 
    function(error, info){
    if (error) {console.log(error);}
    else
      console.log('Email sent: ' + info.response);
  });
});

function checkSignUpValidation(user, password, confirmation){
  return (validateEmail(user) && checkPassword(password) && validatePassword(confirmation, password))
}

function validateEmail(user){
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(user.match(mailformat)){
      return true;
  }
  else{
      // alert("You have entered an invalid email address!: email must be for example 'name@domain.com'");
      return false;
  }
}


const rules="password must include: Minimum 6 Characters , an Uppercase Character , Lowercase Character , a Number and a Special Character (!, @, #, etc.)."
function checkPassword(password){
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    if(password.match(decimal)) 
        return true;
    else{ 
        // alert(rules);
        return false;
    }
}

function validatePassword(confirmation, password){
  if(confirmation == password)
     return true;
  else{
    // alert("Passwords doesnt match");
    return false;
  } 
}


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
