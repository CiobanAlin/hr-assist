(function() {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeHoliday
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeHolidayPreview', hraEmployeeHolidayPreview);

  function hraEmployeeHolidayPreview() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeHolidayPreviewController',
      controllerAs: 'holidayPreview',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeHolidayPreview.view.html'
    };
  }

}());
