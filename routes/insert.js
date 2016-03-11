var express = require('express');
var router = express.Router();
var mysql = require('../db');
var aes = require('../aes');
var events = require('events');
var obj = require('../obj');
var func = require('../func');

//POST request to insert data into database
router.post('/', function(req, res) {
    //If user is authenticated
    if (req.session.user) {

        var eventEmitter = new events.EventEmitter();
        var nextCoffee = func.nextCoffee(res, req.session.user.id);

        eventEmitter.on('response', nextCoffee);

        switch(req.body.action) {
            case 'coffee':
                mysql.query('SELECT id, data FROM data WHERE user = ? ORDER BY id DESC LIMIT 1', req.session.user.id, function (err, result) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    if (!result.length)
                        res.sendStatus(400);
                    else {
                        var data = JSON.parse(aes.decrypt(result[0].data));
                        data.coffee.push(new obj.Coffee(parseInt(req.body.timestamp), parseInt(req.body.quantity)));

                        mysql.query('UPDATE data SET data = ? WHERE id = ?', [aes.encrypt(JSON.stringify(data)), result[0].id], function (err) {
                            if (err) {
                                res.sendStatus(500);
                                return;
                            }
                            eventEmitter.emit('response');
                        });
                    }
                });

                break;
            case 'sleep':

                mysql.query('SELECT id, data FROM data WHERE user = ? ORDER BY id DESC LIMIT 1', req.session.user.id, function (err, result) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    if (!result.length)
                        res.sendStatus(400);
                    else {
                        var data = JSON.parse(aes.decrypt(result[0].data));
                        data.sleep = new obj.Sleep(parseInt(req.body.timestamp));

                        mysql.query('UPDATE data SET data = ? WHERE id = ?', [aes.encrypt(JSON.stringify(data)), result[0].id], function (err) {
                            if (err) {
                                res.sendStatus(500);
                                return;
                            }
                            eventEmitter.emit('response');
                        });
                    }
                });

                break;
            case 'start_activity':

                mysql.query('SELECT id, data FROM data WHERE user = ? ORDER BY id DESC LIMIT 1', req.session.user.id, function (err, result) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    if (!result.length)
                        res.sendStatus(400);
                    else {
                        var data = JSON.parse(aes.decrypt(result[0].data));
                        data.activity.push(new obj.Activity(parseInt(req.body.timestamp)));

                        mysql.query('UPDATE data SET data = ? WHERE id = ?', [aes.encrypt(JSON.stringify(data)), result[0].id], function (err) {
                            if (err) {
                                res.sendStatus(500);
                                return;
                            }
                            eventEmitter.emit('response');
                        });
                    }
                });

                break;
            case 'end_activity':

                mysql.query('SELECT id, data FROM data WHERE user = ? ORDER BY id DESC LIMIT 1', req.session.user.id, function (err, result) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    if (!result.length)
                        res.sendStatus(400);
                    else {
                        var data = JSON.parse(aes.decrypt(result[0].data));
                        data.activity[data.activity.length -1].end = parseInt(req.body.timestamp);
                        data.activity[data.activity.length -1].intensity = parseInt(req.body.intensity);

                        mysql.query('UPDATE data SET data = ? WHERE id = ?', [aes.encrypt(JSON.stringify(data)), result[0].id], function (err) {
                            if (err) {
                                res.sendStatus(500);
                                return;
                            }
                            eventEmitter.emit('response');
                        });
                    }
                });

                break;
            case 'wake_up':
                var data = new obj.Data(new obj.WakeUp(parseInt(req.body.timestamp), parseInt(req.body.quality)), new obj.Sleep, [], []);
                var entry = new obj.Entry(req.session.user.id, aes.encrypt(JSON.stringify(data)));

                mysql.query('INSERT INTO data SET ?', entry, function (err) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    eventEmitter.emit('response');
                });

                break;
            default:
                res.sendStatus(400);
        }

    } else{
        res.sendStatus(404);
    }
});


module.exports = router;
