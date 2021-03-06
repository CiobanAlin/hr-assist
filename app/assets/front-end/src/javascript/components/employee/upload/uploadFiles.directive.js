(function() {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeUpload
  // ------------------------------------------------------------------------

  angular
    .module('HRA')
    .directive('hraEmployeeUpload', hraEmployeeUpload);

  function hraEmployeeUpload() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeUploadController',
      controllerAs: 'uploadFiles',
      templateUrl: rootTemplatePath + '/employee/views/uploadFiles.view.html'
    };
  }

}());
