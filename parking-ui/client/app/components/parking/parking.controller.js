class ParkingController {
  constructor(parkingSpots) {
    this.name = 'parking';
    //TODO not like this brah
    this.image = 'http://localhost:3333/image/parking';
    this.rectangles = parkingSpots;
  }

  getParkingSpotsNumber() {
    return this.rectangles.length;
  }
}

export default ParkingController;