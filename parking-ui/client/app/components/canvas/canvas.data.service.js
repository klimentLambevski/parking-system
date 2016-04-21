let CanvasDataService =  function ($http) {

  let markParkingSpots = function (data) {
    return $http.post('http://localhost:3333/image/mark', data);
  };

  let getImage = function () {
    return $http.get('http://localhost:3333/image/parking');
  };

  let getParkingSpots = function () {
    return $http.get('http://localhost:3333/image/spots');
  };

  return {
    markParkingSpots: markParkingSpots,
    getImage: getImage,
    getParkingSpots: getParkingSpots
  }
};

export default CanvasDataService;