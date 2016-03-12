var express = require('express');
var router = express.Router();
var func = require('../func');


router.post('/', function(req, res){
    //req.session.user = {id:'100'};
    if (req.session.user) {

        if (req.body.req == 'coffee_virtual'){
            func.nextCoffee(res, req.session.user.id, 'can_he_drink');
        }else{
            res.sendStatus(400);
        }
   } else{
        res.sendStatus(404);
   }
});

module.exports = router;
