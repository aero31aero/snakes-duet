var express = require('express');
var router = express.Router();


/* POST users listing. */
router.post('/', function(req, res) {
    var io=require('../socket/io')
    
    io.emit("move",req.body);
    res.json({"error":"success"})
});

/* PUT users listing. */
router.put('/', function(req, res) {
    var io=require('../socket/io')
    
    io.emit("insert",req.body);
//    io.on("snakeid",funtion(user){
//          res.json({});
//          })
    res.json({});
});

module.exports = router;
