var express = require("express");
var router = express.Router();

router.get("/dias/:id", function(req, res, next) {
    const id = req.params.id;
    const fetch = require('node-fetch');
    const API_URL = `http://www.meteoapps.com/api/dias.php?id=${id}`;
    fetch(API_URL)
        .then(res => res.json())
        .then(json => {
            res.send(json)
        })

});

router.get("/horas/:id", function(req, res, next) {
    const id = req.params.id;
    const fetch = require('node-fetch');
    const API_URL = `http://www.meteoapps.com/api/horas.php?id=${id}`;
    fetch(API_URL)
        .then(res => res.json())
        .then(json => {
            res.send(json)
        })
});

module.exports = router;