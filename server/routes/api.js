const express = require('express');
const app = express();
var mysql= require('mysql');


var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var newdate =year + "-" + month + "-" + day;


app.get('/getbooks/:id', (req, res) => {
  id=req.params.id;
  var store ='[';
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: "phpmyadmin.czffpuv34nz0.us-east-2.rds.amazonaws.com",
    user: "phpMyadmin",
    password: "phpMyadmin",
    database: "bookapp"
  });
  
  connection.connect();
  connection.query("SELECT `bookname`, `bookauthor`, `date` FROM `books` WHERE `username`=?",id, function (err, emp_rows, fields) {
    if (err) throw err;
      var len=emp_rows.length;
      console.log(len);
      if(len!=0)
      {
        for(i=0;i<len;i++)
            {       
          store = store + JSON.stringify({bookname:emp_rows[i].bookname, bookauthor:emp_rows[i].bookauthor,date:emp_rows[i].date});
            if(i!=len-1)
                {
            store=store+',';
                }
            }
            store=store+']';
          console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
          }
  });
  
  connection.end();
});



app.get('/checklogin/:user/:pass', (req, res) => {

    var username=req.params.user;
   var password=req.params.pass;
   console.log(password);
   console.log(username);
   var mysql = require('mysql');
   var connection = mysql.createConnection({
    host: "phpmyadmin.czffpuv34nz0.us-east-2.rds.amazonaws.com",
    user: "phpMyadmin",
    password: "phpMyadmin",
    database: "bookapp"
  });
   connection.connect();
   var sql="SELECT `username` FROM `users` WHERE `username`=? and `password`=?";
   connection.query(sql,[username,password], function (err, rows, fields) {
       if(err) throw err;
       console.log(rows.length);
    var len=rows.length;
     if(len>0){
      console.log('Loged In Success'); 
      store=JSON.stringify({status:'success'});
      console.log(store);
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(store)
     }  
     else{
      console.log('Loged In error'); 
      store=JSON.stringify({status:'faild'});
      console.log(store);
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(store)
     }
   });
   connection.end();   
});






app.get('/adduser/:name/:username/:password', (req, res) => {
 
  var name=req.params.name;
  var username=req.params.username;
  var password=req.params.password;
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: "phpmyadmin.czffpuv34nz0.us-east-2.rds.amazonaws.com",
    user: "phpMyadmin",
    password: "phpMyadmin",
    database: "bookapp"
  });
  connection.connect();
  var sql="INSERT INTO `bookapp`.`users` (`id`, `username`, `name`, `password`) VALUES (NULL, ?, ?, ?)";
  connection.query(sql,[name,username,password], function (err, rows, fields) {
    if (err) throw err;   
    console.log('Success');   
  });
  connection.end();   
});
 
app.get('/addbook/:username/:name/:author', (req, res) => {
  var len1=0;
   var name=req.params.name;
   var author=req.params.author;
   var username=req.params.username;
   var mysql = require('mysql');
   var connection = mysql.createConnection({
    host: "phpmyadmin.czffpuv34nz0.us-east-2.rds.amazonaws.com",
    user: "phpMyadmin",
    password: "phpMyadmin",
    database: "bookapp"
  });
   connection.connect();
   var sql="SELECT `username` FROM `books` WHERE `username`=? and `bookname`=? and `bookauthor`=?";
   connection.query(sql,[username,name,author], function (err, rows, fields) {
       var len=rows.length;
       if(len>0)
       {
           len1=len1+1;
       }
           console.log("length="+len);
      });
      setTimeout(function(){ 
      if(len1==0)
      {
          console.log("len1="+len1);
      var sql="INSERT INTO `bookapp`.`books` (`username`, `bookname`, `bookauthor`, `date`) VALUES (?, ?, ?, ?)";
      connection.query(sql,[username,name,author,newdate], function (emp_err, emp_rows, fields) {
          if (emp_err) throw emp_err; 
        console.log('Success');   
        store=JSON.stringify({bookname:name, bookauthor:author,date:newdate});
        console.log(store);
          res.setHeader("Content-Type", "text/json");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.end(store)
   });
  }
  connection.end();   
}, 1000);
});

app.get('/deletebook/:name/:username', (req, res) => {
  
   var name=req.params.name;
   var username=req.params.username;
   var mysql = require('mysql');
   var connection = mysql.createConnection({
    host: "phpmyadmin.czffpuv34nz0.us-east-2.rds.amazonaws.com",
    user: "phpMyadmin",
    password: "phpMyadmin",
    database: "bookapp"
  });
   connection.connect();
   var sql="DELETE FROM `books` WHERE `username`=? and `bookname`=?";
   connection.query(sql,[username,name], function (err, rows, fields) {
     if (err) throw err;   
    console.log("success");
   });
   connection.end();   
});


app.get('/getImages', (req, res) => {
 
  var store ='[';
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: "phpmyadmin.czffpuv34nz0.us-east-2.rds.amazonaws.com",
    user: "phpMyadmin",
    password: "phpMyadmin",
    database: "bookapp"
  });
  
  connection.connect();
  connection.query("SELECT `id`, `Name`, `Location` FROM `images` WHERE 1", function (err, emp_rows, fields) {
    if (err) throw err;
      var len=emp_rows.length;
      console.log(len);
      if(len!=0)
      {
        for(i=0;i<len;i++)
            {       
          store = store + JSON.stringify({id:emp_rows[i].id, name:emp_rows[i].Name,location:emp_rows[i].Location});
            if(i!=len-1)
                {
            store=store+',';
                }
            }
            store=store+']';
          console.log(store);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(store)
          }
  });
  
  connection.end();
});


app.get('/deleteImages/:name/:id', (req, res) => {
  
  var name=req.params.name;
  var id=req.params.id;
   var mysql = require('mysql');
   var connection = mysql.createConnection({
     host: "phpmyadmin.czffpuv34nz0.us-east-2.rds.amazonaws.com",
     user: "phpMyadmin",
     password: "phpMyadmin",
     database: "bookapp"
   });
   
   connection.connect();
   connection.query("DELETE FROM `images` WHERE `Name`=? and `id`=?",[name,id],function (err, emp_rows, fields) {
     if (err) throw err;
       var len=emp_rows.length;
       console.log("Image Deleted");
   });
   
   connection.end();
 });

 module.exports = app;


