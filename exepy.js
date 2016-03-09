var pyshell = require('python-shell');

var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'],
    scriptPath: 'scripts',
    args: ['cluster it', 'user1,5,7,9,xxx;user2,3,6,8,yyy']
};

pyshell.run('ml.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: " + results);
});