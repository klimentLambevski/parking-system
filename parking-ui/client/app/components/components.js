import angular from 'angular';
import Home from './home/home';
import Canvas from './canvas/canvas'

let componentModule = angular.module('app.components', [
  Home.name,
  Canvas.name
]);

export default componentModule;
