import angular from 'angular';
import Canvas from './canvas/canvas'
import Parking from './parking/parking'

let componentModule = angular.module('app.components', [
  Canvas.name,
  Parking.name
]);

export default componentModule;
