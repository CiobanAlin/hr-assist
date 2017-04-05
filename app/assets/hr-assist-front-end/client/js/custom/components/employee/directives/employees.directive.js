(function() {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployees
  // ------------------------------------------------------------------------

  angular
    .module('HRA')
    .directive('hraEmployees', hraEmployees);

  function hraEmployees() {
    return {
      restrict: 'EA',
      replace: true,
      bindToController: {
        'candidate': '='
      },
      controller: 'employeesCtrl',
      controllerAs: 'employees',
      templateUrl: rootTemplatePath + '/components/employee/views/employees.view.html'
    };
  }

}());