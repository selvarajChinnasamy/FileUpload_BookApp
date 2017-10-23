var express = require('express');

var aws = require('aws-sdk');
var router = express.Router();
var multerS3 = require('multer-s3');
var multer = require('multer');

aws.config.loadFromPath('./config.json');
aws.config.update({
    signatureVersion: 'v4'
})

var s0 = new aws.S3({});

var upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'www.upload.com', 
        acl: 'public-read',

        //name of file
        metadata: function(req, file, cb) {
            cb(null, {
                fieldname: file.fieldname
            });
        },
        //unique description/date for the file
        key: function(req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    })
})

router.get('/upload', function(req, res, next) {
    res.render('index');
})

router.get('/public/images', function(req, res, next) {
    res.render('index');
})

router.post('/upload', upload.any(), function(req, res, next) {
    res.send("uploded success <a style='color:white' href='http://52.15.138.37:3000/upload'>Upload Another</a>'");
    var len=req.files.length;

    for(i=0;i<len;i++)
    {
        var lo=req.files[i].originalname;
        var fi=req.files[i].location;

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: "phpmyadmin.czffpuv34nz0.us-east-2.rds.amazonaws.com",
            user: "phpMyadmin",
            password: "phpMyadmin",
            database: "bookapp"
        });
        connection.connect();
        var sql="INSERT INTO `images`(`id`, `Name`, `Location`) VALUES (NULL,?,?)";
        connection.query(sql,[lo,fi], function (err, rows, fields) {
          if (err) throw err;   
          console.log('Success');   
        });
        connection.end();   

        console.log(req.files[i].location);
    }

})

module.exports = router;
