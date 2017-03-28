(function() {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeObservations
  // ------------------------------------------------------------------------

  angular
    .module('HRA')
    .directive('hraEmployeeObservations', hraEmployeeObservations);

  function hraEmployeeObservations() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        candidate: '=',
      },
      controller: 'employeeObservationsController',
      controllerAs: "observations",
      templateUrl: rootTemplatePath + '/components/employee/views/employeeObservations.view.html',
    };
  }

})();
