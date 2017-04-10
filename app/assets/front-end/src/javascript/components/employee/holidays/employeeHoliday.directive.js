(function() {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeHoliday
  // ------------------------------------------------------------------------

  angular
    .module('HRA')
    .directive('hraEmployeeHoliday', hraEmployeeHoliday);

  function hraEmployeeHoliday() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeHolidayController',
      controllerAs: 'employeeHoliday',
      templateUrl: rootTemplatePath + '/employee/views/employeeHoliday.view.html'
    };
  }

}());