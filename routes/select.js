var express = require('express');
var router = express.Router();
var mysql = require('../db');
var pyshell = require('python-shell');
var aes = require('../aes');


router.post('/', function(req, res){

    if (req.session.user) {

        if (req.body.action == 'next_coffee'){
            mysql.query('SELECT data FROM coffee WHERE user = ?', req.session.user.id,  function (err, result) {
                var coffee = '';
                if (err)
                    return err;

                for (var i = 0; i < result.length; i++){
                    coffee += aes.decrypt(result[i].data) + ';';
                }
                mysql.query('SELECT data FROM sleep WHERE user = ?', req.session.user.id, function (err, result) {
                    var sleep = '';
                    if (err)
                        return err;

                    for (var i = 0; i < result.length; i++){
                        sleep += aes.decrypt(result[i].data) + ';';
                    }
                    mysql.query('SELECT data FROM activity WHERE user = ?', req.session.user.id, function (err, result) {
                        var activity = '';
                        if (err)
                            return err;

                        for (var i = 0; i < result.length; i++){
                            activity += aes.decrypt(result[i].data) + ';';
                        }

                        var options = {
                            mode: 'text',
                            pythonPath: '/usr/bin/python',
                            pythonOptions: ['-u'],
                            scriptPath: 'scripts',
                            args: [coffee, sleep, activity]
                        };

                        pyshell.run('ml.py', options, function (err, result) {
                            if (err)
                                return err;

                            res.send(result);
                        });

                    });
                });

            });
        }else{
            res.sendStatus(400);
        }
   } else{
        res.sendStatus(404);
   }
});

module.exports = router;
