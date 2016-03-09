var express = require('express');
var router = express.Router();
var mysql = require('../db');
var hash = require('../sha');

router.post('/', function(req, res){
    mysql.query('SELECT * FROM users WHERE username = ?', req.body.username, function(err, result){
        if (err){
            res.sendStatus(500);
            return;
        }
        if (!result.length){
            res.send("false");
        }
        else{
            if (hash(req.body.password, result[0].salt) === result[0].hash){
                req.session.user = result[0];
                res.send("true");
            }
            else{
                res.send("false");
            }
        }
    });
});

module.exports = router;
