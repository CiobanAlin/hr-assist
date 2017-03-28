(function() {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeDetails
  // ------------------------------------------------------------------------

  angular
    .module('HRA')
    .directive('hraEmployeeDetails', hraEmployeeDetails);

  function hraEmployeeDetails() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        'candidate': '='
      },
      controller: 'employeeDetailsController',
      controllerAs: 'employeeDetails',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeDetails.view.html'
    };
  }

}());
