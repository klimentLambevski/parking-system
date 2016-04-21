import angular from 'angular';
import DrawService from './draw.service';

let drawModule = angular.module('draw', [])
  .factory('Draw', DrawService);

export default drawModule;