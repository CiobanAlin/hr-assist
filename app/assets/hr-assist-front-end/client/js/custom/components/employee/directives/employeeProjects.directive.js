(function() {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeProject
  // ------------------------------------------------------------------------

  angular
    .module('HRA')
    .directive('hraEmployeeProject', hraEmployeeProject);

  function hraEmployeeProject() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeProjectController',
      controllerAs: 'employeeProject',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeProjects.view.html'
    };
  }

}());
