import angular from 'angular';
import parkingComponent from './parking.component';

let parkingModule = angular.module('parking', [])
    .config(($stateProvider) => {
        $stateProvider
            .state('parking', {
                url: '/parking',
                template: '<parking></parking>',
                resolve: function () {
                    //TODO get spots
                }
            });
    })
    .component('parking', parkingComponent);

export default parkingModule;