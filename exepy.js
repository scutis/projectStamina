var pyshell = require('python-shell');

var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'],
    scriptPath: 'scripts',
    args: ['value1', 'value2', 'value3']
};

pyshell.run('ml.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: " + results);
});