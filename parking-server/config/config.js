var path = require('path');

var config = {
    raspberryPyUrl: 'http://192.168.0.100:5000',
    pythonScript: path.join(__dirname, '../ParkingCounter/main.py'),
    emptySpotsFile: '../ParkingCounter/data/config/parkingData.json',
    emptyParkingImg: path.join(__dirname, '../ParkingCounter/data/images/parkingLot.jpg')
};

module.exports = config;