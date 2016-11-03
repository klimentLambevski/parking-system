import config from "../../config";
let MarkSpotsService = ($http) => {

    let getParkingSpots = () => {
        return $http.get(config.nodeServerHost + '/image/parkingSpots');
    };

    let takePicture = () => {
        return $http.get(config.nodeServerHost + '/image/takePicture?' + Date.now());
    };

    let markParkingSpots = (data) => {
        return $http.post(config.nodeServerHost + '/image/mark', data);
    };


    return {
        getParkingSpots: getParkingSpots,
        markParkingSpots: markParkingSpots,
        takePicture: takePicture
    }
};

export default MarkSpotsService;