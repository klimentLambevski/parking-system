var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

//----- DB ------
var parkingSpots = {
    parkingSpots: [
        {name: 0, index: 0, spots: [{x: 213, y: 36}, {x: 237, y: 205}, {x: 355, y: 200}, {x: 336, y: 116}]}
    ]
};
//----- DB ------

router.post('/mark', function (req, res, next) {
    console.log(req.body);
    res.json({a: 1});
});

router.get('/parkingSpots', function (req, res, next) {
    res.json(parkingSpots);
});

router.get('/parking', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/images/parking.jpg'));
});

router.get('/takePicture', function (req, res, next) {
    request
        .get('http://10.123.0.174:5000/getImageUrl')
        .on('response', function () {
            request
                .get('http://10.123.0.174:5000/static/parkingLot.jpg')
                .pipe(res);
        });
});

module.exports = router;