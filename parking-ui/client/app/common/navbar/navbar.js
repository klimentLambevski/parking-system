import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.component';

let navbarModule = angular.module('navbar', [])
  .component('navbar', navbarComponent);

export default navbarModule;
