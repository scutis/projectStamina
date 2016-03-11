var mysql = require('mysql');
var random = require('random-gen');
var hash = require('./sha');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.connect();

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

connection.end();
