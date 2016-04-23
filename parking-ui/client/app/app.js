import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

angular.module('app', [
    uiRouter,
    Common.name,
    Components.name
  ])
  .config(($locationProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/parking');
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', AppComponent);