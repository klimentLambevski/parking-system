import '../bootstrap'

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-loading-bar';

import Common from './common/common';
import Components from './components/components';

import template from './app.html';


angular.module('app', [
    'angular-loading-bar',
    uiRouter,
    Common.name,
    Components.name
]).config(($locationProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/parking');
    $locationProvider.html5Mode(true).hashPrefix('!');
}).component('app', {
    template,
    controller() {

    }
});