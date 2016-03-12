var mysql = require('./db');
var aes = require('./aes');
var pyshell = require('python-shell');

var nextCoffee = function (res, userId, req) {
    mysql.query('SELECT data FROM data WHERE user = ?', userId,  function (err, result) {

        if (err) {
            res.sendStatus(500);
            return;
        }

        aes.decrypt(result[0].data);

        var input = [];

        for (var i = 0; i < result.length; i++){
            input.push(JSON.parse(aes.decrypt(result[i].data)));
        }

        var options = {
            mode: 'text',
            pythonPath: '/usr/bin/python',
            pythonOptions: ['-u'],
            scriptPath: 'scripts',
            args: [req, JSON.stringify(input)]
        };

        pyshell.run('main.py', options, function (err, result) {
            if (err)
                return err;

            res.send(result[0]);
        });
    });
};

module.exports.nextCoffee = nextCoffee;