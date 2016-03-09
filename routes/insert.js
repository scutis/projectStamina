var express = require('express');
var router = express.Router();
var mysql = require('../db');
var aes = require('../aes');

//POST request to insert data into database
router.post('/', function(req, res) {
    //If user is authenticated
    if (req.session.user) {

        var entry = {
            user: req.session.user.id,
            data: ''
        };

        switch(req.body.action) {
            case 'coffee_intake':

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
                });

                break;
            case 'wakeup':

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
                        });
                    });
                } else {
                    res.sendStatus(400);
                    return;
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
                        });

                    });
                } else {
                    res.sendStatus(400);
                    return;
                }

                break;
            default:
                res.sendStatus(400);
                return;
        }

        res.send("OK");

    } else{
        res.sendStatus(404);
    }
});


module.exports = router;
