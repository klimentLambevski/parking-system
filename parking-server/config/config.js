var path = require('path');

var config = {
    raspberryPyUrl: 'http://10.123.0.174:5000',
    pythonScript: path.join(__dirname, '../ParkingCounter/main.py'),
    emptySpotsFile: '../ParkingCounter/data/config/parkingData.json',
    emptyParkingImg: path.join(__dirname, '../public/images/parking.jpg')
};

module.exports = config;