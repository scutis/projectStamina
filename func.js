var mysql = require('./db');
var aes = require('./aes');
var pyshell = require('python-shell');

var nextCoffee = function (res, userId) {
    mysql.query('SELECT data FROM data WHERE user = ?', userId,  function (err, result) {

        if (err) {
            res.sendStatus(500);
            return;
        }

        aes.decrypt(result[0].data)

        var input = '';

        for (var i = 0; i < result.length; i++){
            input += aes.decrypt(result[0].data) + '\n';
        }

        var options = {
            mode: 'text',
            pythonPath: '/usr/bin/python',
            pythonOptions: ['-u'],
            scriptPath: 'scripts',
            args: [input]
        };

        pyshell.run('ml.py', options, function (err, result) {
            if (err)
                return err;

            res.send(result + '\n');
        });
    });
};

module.exports.nextCoffee = nextCoffee;