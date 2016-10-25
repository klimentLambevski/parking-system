let MarkSpotsService = ($http) => {

  let getParkingSpots = () => {
    return $http.get('http://localhost:3333/image/parkingSpots');
  };

  let markParkingSpots = (data) => {
    return $http.post('http://localhost:3333/image/mark', data);
  };

  return {
    getParkingSpots: getParkingSpots,
    markParkingSpots: markParkingSpots
  }
};

export default MarkSpotsService;