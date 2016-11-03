import config from '../../config';

class ParkingController {
    constructor(parkingSpots) {
        this.name = 'parking';
        //TODO not like this brah
        this.image = config.nodeServerHost + '/image/parking';
        this.rectangles = parkingSpots;
    }

    getParkingSpotsNumber() {
        return this.rectangles.length;
    }
}

export default ParkingController;