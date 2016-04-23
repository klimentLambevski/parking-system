import angular from 'angular';
import MarkSpots from './mark-spots/mark-spots';
import Parking from './parking/parking';
import Canvas from './canvas/canvas';

let componentModule = angular.module('app.components', [
  MarkSpots.name,
  Parking.name,
  Canvas.name
]);

export default componentModule;
