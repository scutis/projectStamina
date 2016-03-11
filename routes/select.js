var express = require('express');
var router = express.Router();
var func = require('../func');


router.post('/', function(req, res){
    if (req.session.user) {

        if (req.body.action == 'next_coffee'){
            func.nextCoffee(res, req.session.user.id);
        }else{
            res.sendStatus(400);
        }
   } else{
        res.sendStatus(404);
   }
});

module.exports = router;
