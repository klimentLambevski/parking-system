import angular from 'angular';
import uiRouter from 'angular-ui-router';
import markSpotsComponent from './mark-spots.component';
import MarkSpotsService from './mark-spots.service'

let markSpotsModule = angular.module('markspots', [
    uiRouter
  ])
  .config(($stateProvider) => {
    $stateProvider
      .state('markSpots', {
        url: '/markSpots',
        template: '<mark-spots></mark-spots>'
      });
  })
  .component('markSpots', markSpotsComponent)
  .factory('MarkSpotsService', MarkSpotsService);

export default markSpotsModule;
