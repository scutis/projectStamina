var express = require('express');
var router = express.Router();


router.post('/', function(req, res){

    if (req.session.user) {

        if (req.body.action == 'next_coffee'){
            res.send("123456789");
        }
   } else{
        res.sendStatus(404);
   }
});

module.exports = router;
