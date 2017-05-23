(() => {

  'use strict';


  angular
    .module('HRA')
    .controller('userHolidayCtrl', userHolidayCtrl);

  userHolidayCtrl


  function userHolidayCtrl($rootScope, $stateParams, User, autocompleteService, formatDate, $timeout) {


    let vm = this;
    let days;
    vm.userHolidays;
    vm.projects = [];
    vm.users = [];
    vm.table = {
      options: {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: true,
        limitSelect: true,
        pageSelect: true
      },
      query: {
        limit: 5,
        page: 1
      },
      "limitOptions": [5, 10, 15],
      selected: []
    };

    vm.errMsg = false;
    vm.displayOrHide = false;
    vm.replaceInputs = [1];
    vm.dateList = [];
    vm.validateDate = false;
    vm.from = new Date();
    vm.to = new Date();
    vm.signingDate = new Date();

    vm.formatDate = formatDate;
    vm.clearFields = clearFields;
    vm.checkDates = checkDates;
    vm.queryProjectSearch = queryProjectSearch;
    vm.queryUserSearch = queryUserSearch;
    vm.saveHoliday = saveHoliday;
    vm.addEmptyReplacement = addEmptyReplacement;

    $rootScope.$on("event:userResourcesLoaded", (event, data) => {
      vm.projects = data.projects;
      vm.users = data.users;
      vm.userHolidays = data.holidays;
      autocompleteService.buildList(vm.projects, ['name']);
      autocompleteService.buildList(vm.users, ['first_name', 'last_name']);
    });

    function _getUserHolidays() {
      User.getHolidays($stateParams.id)
        .then((data) => {
          vm.userHolidays = data;
        })
        .catch((error) => {
          console.log(error)
        });
    }

    function queryProjectSearch(query) {
      return autocompleteService.querySearch(query, vm.projects);
    }

    function queryUserSearch(query) {
      let empArr = autocompleteService.querySearch(query, vm.users);
      let empIdArr = [];
      let userID = parseInt($stateParams.id);
      let currentUser;

      for (let i = 0; i < empArr.length; i++) {

        empIdArr.push(empArr[i].id);

        currentUser = _.find(empIdArr, function(id) {
          if (id === userID) {
            return id;
          }
        });

        if (empArr[i].id === currentUser) {
          empArr.splice(i, 1);
        }

      }

      return empArr;
    }

    function saveHoliday() {

      calculateHolidays(vm.from, vm.to);

      let usersObj = vm.searchUser;
      let projObj = vm.searchProj;
      let projectId = [];
      let replacerId = [];

      let userId = $stateParams.id;
      let daysNo = days;
      let startDate = vm.formatDate.getStandard(vm.from);
      let endDate = vm.formatDate.getStandard(vm.to);
      let signingDate = vm.signingDate;

      let usersArr = $.map(usersObj, (value, index) => {
        return [value];
      });

      let projArr = $.map(projObj, (value, index) => {
        return [value];
      });

      for (var x = 0; x < usersArr.length; x++) {
        let userName = usersArr[x];

        for (let i = 0; i < vm.users.length; i++) {
          let usersName = vm.users[i].first_name + ' ' + vm.users[i].last_name;

          if (userName === usersName) {
            replacerId.push(vm.users[i].id);
          }
        }
      }

      for (var y = 0; y < projArr.length; y++) {
        let projName = projArr[y];

        for (let j = 0; j < vm.projects.length; j++) {
          let projectsName = vm.projects[j].name;

          if (projName === projectsName) {
            projectId.push(vm.projects[j].id);
          }
        }
      }

      vm.objToSave = {
        days: daysNo,
        start_date: startDate,
        end_date: endDate,
        signing_day: signingDate,
        project_ids: projectId,
        replacer_ids: replacerId,
        user_id: userId
      };

      if(vm.userHolidays.length > 0) {
        for(let i = 0; i < vm.userHolidays.length; i++) {

          if(vm.objToSave.start_date !== vm.userHolidays[i].start_date  &&
            vm.objToSave.end_date !== vm.userHolidays[i].end_date &&
            vm.objToSave.signing_day !== vm.userHolidays[i].signing_day) {

            _addHoliday(vm.objToSave);
            break;

          } else {

            vm.errMsg = true;
            $timeout(() => {
              vm.errMsg = false;
            }, 3500);
            break;

          }
        }
      } else {
        _addHoliday(vm.objToSave);
      }
    }

    function _addHoliday(objToSave){
      User.addHolidays(objToSave)
        .then((response) => {
          _getUserHolidays();
          vm.displayOrHide = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function calculateHolidays(dDate1, dDate2) {

      let iWeeks, iDateDiff, iAdjust = 0;

      if (dDate2 < dDate1) return -1;

      let iWeekday1 = dDate1.getDay();
      let iWeekday2 = dDate2.getDay();

      iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1;
      iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;

      if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1;

      iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1;
      iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;


      iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000);

      if (iWeekday1 <= iWeekday2) {
        iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
      } else {
        iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
      }

      iDateDiff -= iAdjust;

      return days = (iDateDiff + 1);

    }

    function checkDates() {
      if (vm.from != undefined && vm.signingDate != undefined && vm.to != undefined && vm.signingDate > vm.from || vm.from > vm.to) {
        vm.validateDate = true;
      } else {
        vm.validateDate = false;
      }
    }

    function clearFields() {
      vm.searchUser = '';
      vm.searchProj = '';
      vm.from = undefined;
      vm.to = undefined;
      vm.signingDate = undefined;
    }

    function addEmptyReplacement() {
      vm.replaceInputs.push({});
    }

    vm.displayForm = () => {
      vm.displayOrHide = !vm.displayOrHide;
    }

  }

})();
