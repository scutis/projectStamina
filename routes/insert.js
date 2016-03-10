var express = require('express');
var router = express.Router();
var mysql = require('../db');
var aes = require('../aes');
var pyshell = require('python-shell');
var events = require('events');

//POST request to insert data into database
router.post('/', function(req, res) {
    //If user is authenticated
    if (req.session.user) {
        var eventEmitter = new events.EventEmitter();

        var reply = function () {
            mysql.query('SELECT data FROM coffee WHERE user = ?', entry.user,  function (err, result) {
                var coffee = '';
                if (err)
                    return err;

                for (var i = 0; i < result.length; i++){
                    coffee += aes.decrypt(result[i].data) + ';';
                }
                mysql.query('SELECT data FROM sleep WHERE user = ?', entry.user, function (err, result) {
                    var sleep = '';
                    if (err)
                        return err;

                    for (var i = 0; i < result.length; i++){
                        sleep += aes.decrypt(result[i].data) + ';';
                    }
                    mysql.query('SELECT data FROM activity WHERE user = ?', entry.user, function (err, result) {
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
        };

        eventEmitter.on('respond', reply);

        var entry = {
            user: '50',
            data: ''
        };

        switch(req.body.action) {
            case 'coffee':

                if (req.body.timestamp)
                    entry.data = req.body.timestamp;
                else{
                    res.sendStatus(400);
                    return;
                }

                if (req.body.quantity)
                    entry.data += ',' + req.body.quantity;

                entry.data = aes.encrypt(entry.data);

                mysql.query('INSERT INTO coffee SET ?', entry, function (err) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    eventEmitter.emit('respond');
                });

                break;
            case 'sleep':

                if (req.body.timestamp)
                    entry.data = req.body.timestamp;
                else{
                    res.sendStatus(400);
                    return;
                }

                entry.data = aes.encrypt(entry.data);

                mysql.query('INSERT INTO sleep SET ?', entry, function (err) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    eventEmitter.emit('respond');
                });

                break;
            case 'start_activity':

                if (req.body.timestamp)
                    entry.data = req.body.timestamp;
                else{
                    res.sendStatus(400);
                    return;
                }

                entry.data = aes.encrypt(entry.data);

                mysql.query('INSERT INTO activity SET ?', entry, function (err) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    eventEmitter.emit('respond');
                });

                break;
            case 'wake_up':

                if (req.body.timestamp && req.body.quality) {
                    mysql.query('SELECT id, data FROM sleep WHERE user = ? ORDER BY id DESC LIMIT 1', entry.user, function (err, result) {

                        if (err) {
                            res.sendStatus(500);
                            return;
                        }

                        if (!result.length)
                            res.sendStatus(400);
                        else {
                            entry.data = aes.decrypt(result[0].data);
                            entry.data += ',' + req.body.timestamp;
                            entry.data += ',' + req.body.quality;
                        }

                        entry.data = aes.encrypt(entry.data);

                        mysql.query('UPDATE sleep SET data = ? WHERE id = ?', [entry.data, result[0].id], function (err) {
                            if (err) {
                                res.sendStatus(500);
                                return;
                            }
                            eventEmitter.emit('respond');
                        });
                    });
                } else {
                    res.sendStatus(400);
                }

                break;
            case 'end_activity':

                if (req.body.timestamp) {
                    mysql.query('SELECT id, data FROM activity WHERE user = ? ORDER BY id DESC LIMIT 1', entry.user, function (err, result) {

                        if (err) {
                            res.sendStatus(500);
                            return;
                        }

                        if (!result.length)
                            res.sendStatus(400);
                        else {
                            entry.data = aes.decrypt(result[0].data);
                            entry.data += ',' + req.body.timestamp;

                            if (req.body.intensity)
                                entry.data += ',' + req.body.intensity;
                        }

                        entry.data = aes.encrypt(entry.data);

                        mysql.query('UPDATE activity SET data = ? WHERE id = ?', [entry.data, result[0].id], function (err) {
                            if (err) {
                                res.sendStatus(500);
                                return;
                            }
                            eventEmitter.emit('respond');
                        });

                    });
                } else {
                    res.sendStatus(400);
                }

                break;
            default:
                res.sendStatus(400);
        }

    } else{
        res.sendStatus(404);
    }
});


module.exports = router;
