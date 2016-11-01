var express = require('express');
var router = express.Router();
var request = require('request');
var spawn = require('child_process').spawn;
var fs = require('fs');
var config = require('../config/config');

/**
 * Mark parking spots.
 * */
router.post('/mark', function (req, res, next) {
    var markedSpots = JSON.stringify(req.body);

    fs.writeFile(config.emptySpotsFile, markedSpots, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json({ok: 1});
        }
    })

});

/**
 * Get empty parking spots.
 * */
router.get('/parkingSpots', function (req, res, next) {
    var dataString = '';

    var py = spawn('python.exe', [
        config.pythonScript
    ]);

    py.stdout.on('data', function (data) {
        dataString += data.toString();
    });

    py.on('error', function (err) {
        res.json(err);
    });

    py.on('close', function (code) {
        py.kill();
        console.log(arguments);
        if (code !== 0) {
            res.json({error: code});
        } else {
            res.json(JSON.parse(dataString));
        }
    });
});

/**
 * Empty parking image.
 * */
router.get('/parking', function (req, res, next) {
    res.sendFile(config.emptyParkingImg);
});

/**
 * Get latest parking image.
 * */
router.get('/takePicture', function (req, res, next) {
    takePicture()
        .on('response', function(err) {
            getPicture()
                .on('error', function () {
                    res.status(500).send(err);
                })
                .pipe(res)

        })
        .on('error', function () {
            res.status(500).send(err);
        });
});

function takePicture() {
    return request.get(config.raspberryPyUrl + '/getImageUrl');
}

function getPicture() {
    return request.get(config.raspberryPyUrl + '/static/parkingLot.jpg');
}

module.exports = router;