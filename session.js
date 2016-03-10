var session = require('express-session')({
    secret: 'jx9fQHgUK3qnqjBR',
    resave: true,
    saveUninitialized: true
});

module.exports = session;