import config from "../../config";

let ParkingDataService = ($http) => {

    let getParkingSpots = () => {
        return $http.get(config.nodeServerHost + '/image/parkingSpots');
    };

    return {
        getParkingSpots: getParkingSpots
    }
};

export default ParkingDataService;