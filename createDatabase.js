var mysql = require('mysql');
var random = require('random-gen');
var hash = require('./sha');
var obj = require('./obj');
var aes = require('./aes');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.connect();

connection.query('DROP DATABASE projectStamina');
connection.query('CREATE DATABASE projectStamina');
connection.query('USE projectStamina');
connection.query('CREATE TABLE users (id INT unsigned PRIMARY KEY AUTO_INCREMENT, username VARCHAR(20) NOT NULL, hash VARCHAR(255) NOT NULL, salt VARCHAR(10) NOT NULL, password VARCHAR(255))');
connection.query('CREATE TABLE data (id INT unsigned PRIMARY KEY AUTO_INCREMENT, user INT unsigned NOT NULL, data TEXT NOT NULL)');

var entry = {
    username: '',
    hash: '',
    salt: '',
    password: ''
};

//Insert 100 random users into database
for (var i = 0; i < 100; i++){
    entry['username'] = random.lower(6);
    entry['password'] = random.alphaNum(6);
    entry['salt'] = random.alphaNum(6);
    entry['hash'] = hash(entry['password'], entry['salt']);

    connection.query('INSERT INTO users SET ?', entry);
}

//Another user
entry['username'] = "a";
entry['password'] = "a";
entry['salt'] = random.alphaNum(6);
entry['hash'] = hash(entry['password'], entry['salt']);

connection.query('INSERT INTO users SET ?', entry);

var ref = Date.now()/1000 - 35*86400;
ref -= ref % 86400;


var data = [];
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 61), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(43200 + ref + 86400*data.length), new obj.Coffee(57600 + ref + 86400*data.length)], [new obj.Activity(61200 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 67), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(28800 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 64), new obj.Sleep(82800 + ref + 86400*data.length), [new obj.Coffee(39600 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length), new obj.Coffee(55800 + ref + 86400*data.length), new obj.Coffee(57600 + ref + 86400*data.length)], [new obj.Activity(64800 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(28800 + ref + 86400*data.length, 75), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(36000 + ref + 86400*data.length), new obj.Coffee(43200 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 81), new obj.Sleep(86400 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(36000 + ref + 86400*data.length, 77), new obj.Sleep(86400 + ref + 86400*data.length), [new obj.Coffee(36100 + ref + 86400*data.length), new obj.Coffee(37200 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(32400 + ref + 86400*data.length, 82), new obj.Sleep(82800 + ref + 86400*data.length), [new obj.Coffee(32500 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length)], [new obj.Activity(72000 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 71), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(25200 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(48600 + ref + 86400*data.length), new obj.Coffee(57600 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 62), new obj.Sleep(82800 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(58500 + ref + 86400*data.length), new obj.Coffee(61200 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(28800 + ref + 86400*data.length, 67), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(28800 + ref + 86400*data.length), new obj.Coffee(52200 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length), new obj.Coffee(55800 + ref + 86400*data.length)], [new obj.Activity(64800 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 64), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(37800 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length), new obj.Coffee(55800 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 75), new obj.Sleep(86400 + ref + 86400*data.length), [new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(41400 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(32400 + ref + 86400*data.length, 83), new obj.Sleep(86400 + ref + 86400*data.length), [new obj.Coffee(32500 + ref + 86400*data.length), new obj.Coffee(33698 + ref + 86400*data.length), new obj.Coffee(41400 + ref + 86400*data.length), new obj.Coffee(48600 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(36000 + ref + 86400*data.length, 76), new obj.Sleep(82800 + ref + 86400*data.length), [new obj.Coffee(36100 + ref + 86400*data.length), new obj.Coffee(37985 + ref + 86400*data.length), new obj.Coffee(43200 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length)], [new obj.Activity(72000 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 79), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(28800 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 53), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(46800 + ref + 86400*data.length), new obj.Coffee(68400 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 90), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(43200 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length)], [new obj.Activity(64800 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(28800 + ref + 86400*data.length, 49), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(28900 + ref + 86400*data.length), new obj.Coffee(39600 + ref + 86400*data.length), new obj.Coffee(46800 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 64), new obj.Sleep(86400 + ref + 86400*data.length), [new obj.Coffee(39600 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length), new obj.Coffee(55800 + ref + 86400*data.length), new obj.Coffee(57600 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(39600 + ref + 86400*data.length, 75), new obj.Sleep(90000 + ref + 86400*data.length), [new obj.Coffee(40000 + ref + 86400*data.length), new obj.Coffee(43200 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(36000 + ref + 86400*data.length, 79), new obj.Sleep(90000 + ref + 86400*data.length), [new obj.Coffee(37000 + ref + 86400*data.length), new obj.Coffee(38659 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length)], [new obj.Activity(68400 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 77), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 82), new obj.Sleep(82800 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 33), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length), new obj.Coffee(72000 + ref + 86400*data.length)], [new obj.Activity(64800 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 61), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(39600 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length), new obj.Coffee(61200 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 68), new obj.Sleep(86400 + ref + 86400*data.length), [new obj.Coffee(25200 + ref + 86400*data.length), new obj.Coffee(32400 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length), new obj.Coffee(57600 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(36000 + ref + 86400*data.length, 64), new obj.Sleep(90000 + ref + 86400*data.length), [new obj.Coffee(36100 + ref + 86400*data.length), new obj.Coffee(39600 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(36000 + ref + 86400*data.length, 75), new obj.Sleep(82800 + ref + 86400*data.length), [new obj.Coffee(37400 + ref + 86400*data.length), new obj.Coffee(43200 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length)], [new obj.Activity(72000 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 55), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(46800 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length), new obj.Coffee(61200 + ref + 86400*data.length), new obj.Coffee(68400 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 61), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(36000 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(57600 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 54), new obj.Sleep(82800 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(45000 + ref + 86400*data.length), new obj.Coffee(64800 + ref + 86400*data.length)], [new obj.Activity(64800 + ref + 86400*data.length)]));
data.push(new obj.Data(new obj.WakeUp(28800 + ref + 86400*data.length, 89), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(29400 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length), new obj.Coffee(46800 + ref + 86400*data.length), new obj.Coffee(54000 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(25200 + ref + 86400*data.length, 90), new obj.Sleep(86400 + ref + 86400*data.length), [new obj.Coffee(27000 + ref + 86400*data.length), new obj.Coffee(34200 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(36000 + ref + 86400*data.length, 81), new obj.Sleep(90000 + ref + 86400*data.length), [new obj.Coffee(37000 + ref + 86400*data.length), new obj.Coffee(38600 + ref + 86400*data.length), new obj.Coffee(43200 + ref + 86400*data.length)], [new obj.Activity(0)]));
data.push(new obj.Data(new obj.WakeUp(32400 + ref + 86400*data.length, 90), new obj.Sleep(79200 + ref + 86400*data.length), [new obj.Coffee(33123 + ref + 86400*data.length), new obj.Coffee(43200 + ref + 86400*data.length), new obj.Coffee(50400 + ref + 86400*data.length), new obj.Coffee(57600 + ref + 86400*data.length)], [new obj.Activity(68400 + ref + 86400*data.length)]));

for (var i = 0; i < data.length; i++){
    entry = new obj.Entry('100', aes.encrypt(JSON.stringify(data[i])));
    connection.query('INSERT INTO data SET ?', entry);
}




connection.end();
