import angular from 'angular';
import Draw from './draw/draw'

let commonModule = angular.module('app.common', [
  Draw.name
]);

export default commonModule;
