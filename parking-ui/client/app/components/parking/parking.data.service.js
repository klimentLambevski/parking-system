let ParkingDataService = ($http) => {

  let getParkingSpots = () => {
    return $http.get('http://localhost:3333/image/parkingSpots');
  };

  return {
    getParkingSpots: getParkingSpots
  }
};

export default ParkingDataService;