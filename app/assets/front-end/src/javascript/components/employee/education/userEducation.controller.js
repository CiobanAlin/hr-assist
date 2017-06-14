(function() {

  'use strict';

  angular
    .module('HRA')
    .controller('userEducationController', userEducationController);

  userEducationController

  function userEducationController($rootScope, $scope, $stateParams, User, autocompleteService, dateService, $mdDialog) {

    let vm = this;
    vm.userEducationList = [];
    vm.userEducations = [];
    vm.showForm = false;
    vm.validateDate = [];
    vm.validateDates = false;
    let startDate = [];
    let endDate = [];

    vm.dateService = dateService;
    vm.removeEducation = removeEducation;
    vm.addNewEducation = addNewEducation;
    vm.save = save;
    vm.cancel = cancel;
    vm.toggleForm = toggleForm;
    vm.checkDates = checkDates;
    vm.checkOnGoing = checkOnGoing;

    $rootScope.$on('event:userResourcesLoaded', (event, data) => {
      vm.user = data.user;
      vm.userEducations = data.educations;
      _initEducations();
    });

    function toggleForm() {
      vm.showForm = !vm.showForm;
    }

    function addNewEducation() {
      vm.userEducationList.push({});
    }

    function removeEducation(index, event) {
      if (index < vm.userEducations.length) {
        let obj = { "education_ids": Array.of(vm.userEducations[index].id) };
        let confirm = $mdDialog.confirm()
          .title('Would you like to delete ' + vm.userEducations[index].degree + ' degree?')
          .targetEvent(event)
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(() => {
          User.removeEducations(vm.user.id, obj);
          vm.userEducations.splice(index, 1);
          vm.userEducationList.splice(index, 1);
        });

      } else {
        vm.userEducationList.splice(index, 1);
        vm.validateDate[index] = false;
      }
    }

    function save() {
      let saveEducationsObj = {};
      let updateEducationsObj = {};
      saveEducationsObj["educations"] = [];
      updateEducationsObj["educations"] = [];

      vm.userEducationList.forEach(function(value, index) {
        value.start_date = vm.dateService.format(value.start_date);
        value.end_date = value.end_date ? vm.dateService.format(value.end_date) : null;

        if (index < vm.userEducations.length) {
          if (JSON.stringify(vm.userEducations[index]) !== JSON.stringify(value))
            updateEducationsObj["educations"].push(value);
        } else
          saveEducationsObj["educations"].push(value);
      });

      if (updateEducationsObj["educations"].length !== 0)
        User.updateEducations(vm.user.id, updateEducationsObj).then((data) => {
          vm.userEducations = data;
          _initEducations();
        });

      if (saveEducationsObj["educations"].length !== 0)
        User.saveEducations(vm.user.id, saveEducationsObj).then((data) => {
          vm.userEducations = data;
          _initEducations();
        });
      toggleForm();
    }

    function cancel() {
      vm.userEducationList = [];
      vm.userEducationList = _.map(vm.userEducations, _.clone);
      vm.validateDate = [];
      toggleForm();
    }

    function checkOnGoing(index) {
      vm.userEducationList[index].end_date = vm.userEducationList[index].onGoing ? null : vm.userEducationList[index].end_date;
      return vm.userEducationList[index].onGoing;
    }

    function checkDates(index) {

      for (let i = 0; i < vm.userEducationList.length; i++) {
        if (vm.userEducationList[i].onGoing) {
          vm.validateDate[i] = false;
        } else {
          startDate[i] = new Date(vm.userEducationList[i].start_date);
          endDate[i] = new Date(vm.userEducationList[i].end_date);
          if (startDate[i] != undefined && endDate[i] != undefined && startDate[i] > endDate[i]) {
            vm.validateDate[i] = true;
          } else {
            vm.validateDate[i] = false;
          }
        }
      }
      if (vm.validateDate.indexOf(true) !== -1) {
        vm.validateDates = true;
      } else {
        vm.validateDates = false;
      }
    }

    function _initEducations() {
      vm.userEducationList = _.map(vm.userEducations, _.clone);
      for (let i = 0; i < vm.userEducationList.length; i++) {
        if (vm.userEducationList[i].end_date) {
          vm.userEducationList[i].onGoing = false;
        } else {
          vm.userEducationList[i].onGoing = true;
        }
      }
    }

  }

}());
