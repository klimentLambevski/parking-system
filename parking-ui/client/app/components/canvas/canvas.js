import angular from 'angular';
import uiRouter from 'angular-ui-router';
import canvasComponent from './canvas.component';
import canvasDrawDirective from './canvas-draw.directive';
import CanvasDataService from './canvas.data.service';

let canvasModule = angular.module('about', [
    uiRouter
  ])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('canvas', {
        url: '/canvas',
        template: '<pk-canvas></pk-canvas>'
      });
  })
  .component('pkCanvas', canvasComponent)
  .directive('canvasDraw', canvasDrawDirective)
  .factory('CanvasDataService', CanvasDataService);

export default canvasModule;

