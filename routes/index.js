var express = require('express');
var router = express.Router();

//POST request to detect if server is reachable
router.post('/', function(req, res) {
    res.send("ACK");
});

module.exports = router;
