var express = require('express');
var router = express.Router();
var func = require('../func');


router.get('/', function(req, res){
    if (req.session.user) {
        func.nextCoffee(res, req.session.user.id, 'can_he_drink');

   } else{
        res.sendStatus(404);
   }
});

module.exports = router;
