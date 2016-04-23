import angular from 'angular';
import _ from 'lodash';
import Point from '../../common/draw/point';
import Line from '../../common/draw/line';
import Rectangle from '../../common/draw/rectangle';
import controller from './parking.controller';
import ParkingDataService from './parking.data.service';

let parkingModule = angular.module('parking', [])
  .config(($stateProvider) => {
    $stateProvider
      .state('parking', {
        url: '/parking',
        templateUrl: 'app/components/parking/parking.html',
        controller,
        controllerAs: 'vm',
        resolve: {
          parkingSpots: (ParkingDataService) => {
            //TODO wtf?
            return ParkingDataService.getParkingSpots()
              .then((data) => {
                let rectangles = [];
                _.forEach(data.data.parkingSpots, (ps) => {
                  var p1 = new Point(ps.spots[0].x, ps.spots[0].y);
                  var p2 = new Point(ps.spots[1].x, ps.spots[1].y);
                  var p3 = new Point(ps.spots[2].x, ps.spots[2].y);
                  var p4 = new Point(ps.spots[3].x, ps.spots[3].y);

                  var l1 = new Line(p1, p2);
                  var l2 = new Line(p2, p3);
                  var l3 = new Line(p3, p4);
                  var l4 = new Line(p4, p1);

                  rectangles.push(new Rectangle(l1, l2, l3, l4));
                });
                return rectangles;
              });
          }
        }
      });
  })
  .factory('ParkingDataService', ParkingDataService);

export default parkingModule;