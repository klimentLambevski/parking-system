import angular from 'angular';
import canvasComponent from './canvas.component';
import canvasDrawDirective from './canvas-draw.directive';

let canvasModule = angular.module('canvas', [])
  .component('pkCanvas', canvasComponent)
  .directive('canvasDraw', canvasDrawDirective);

export default canvasModule;

