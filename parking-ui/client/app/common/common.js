import angular from 'angular';
import Navbar from './navbar/navbar';
import Draw from './draw/draw'

let commonModule = angular.module('app.common', [
  Navbar.name,
  Draw.name
]);

export default commonModule;
