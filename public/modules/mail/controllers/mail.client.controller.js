'use strict';

angular.module('mail').controller('MailController', ['$scope', '$http', 'localStorageService', '$modal', function($scope,$http,localStorageService,$modal) {
    
    $scope.selectedRows=[];
    $scope.formData = {
      'engineer': undefined,
      'password': undefined,
      'fromUser': true,
      'ccSupport': 'support@novell.com',
      'emails': $scope.selectedRows,
      'content': undefined,
      'signature': undefined
    };

    $scope.init = function(){
      // Local Storage: rememberMe (Retrieve from store)
      if(localStorageService.isSupported){
        $scope.formData.engineer = localStorageService.get('engineer'),
        $scope.formData.password = localStorageService.get('password'),
        $scope.formData.fromUser = localStorageService.get('fromUser'),
        $scope.formData.signature = localStorageService.get('signature');

        if($scope.formData.engineer || $scope.formData.password || $scope.formData.fromUser || $scope.formData.signature) {
          document.getElementById('rememberMe').checked = true;
        }

        // if ($scope.formData.engineer !== undefined) $scope.getServiceRequests();
        if ($scope.formData.signature !== undefined) $scope.editorSignature.setHTML($scope.formData.signature);
        $scope.srContent = document.getElementById('spinner');

      }

      $scope.blurMe = document.getElementById('blurMe');
    };

    // Templates: update view, create handle
    $scope.templates = {
      general: [
        {
          name: '*New SR',
          selectMultiple: false,
          snippet: ''
        },
        {
            name: 'Bomgar Invitation',
            selectMultiple: true,
            snippet: 'Are you available for a Bomgar session? \nYou can connect by either of the following: \nURL\nOr http://www.websupport.com and enter NUMBER as the session key.'
        },
        {
          name: 'EMEA',
          selectMultiple: true,
          snippet: 'I see our timezones are very different. Are you available to work this issue now? I will keep this Service Request until the end of my shift. If I do not receive an email back from you, I\'ll go ahead and put this Service Request in the queue for the team in your timezone.'
        },
        {
          name: 'Follow-up',
          selectMultiple: true,
          snippet: 'Just following up with you, as I haven\'t heard from you since my last email. What is the current status of this service request?'
        },
        {
          name: 'Schedule to Close',
          selectMultiple: true,
          snippet: 'Just checking in to verify the issue has been resolved. I\'ll be placing this SR in a Schedule to Close state. If I don\'t hear back from you, I\'ll go ahead and close the SR. Feel free to contact me.'
        },
        {
          name: 'Close',
          selectMultiple: true,
          snippet: 'I\'ll be closing this Service Request. If the issue returns, feel free to contact me within 14 days and I will reopen the SR.'
        },
        {
          name: 'Support Config',
          selectMultiple: true,
          snippet: 'Let\'s start by getting a support config. Most SLES Servers have the following tool by default.\n\nPlease execute the following command on the eDirectory server:\nsupportconfig -ur <SR#>\n\nThis will automatically upload the servers configuration information and attach it to the SR.'
        }
      ],
      special: [
        {
          name: 'GroupWise',
          selectMultiple: true,
          snippet: '',
          items: [
            {
              name: 'POA Logs',
              selectMultiple: true,
              snippet: 'Please provide verbose POA logs from the time of the incident:\nhttps://www.novell.com/documentation/groupwise2014/gw2014_guide_admin/data/adm_poa_mon_log_files.html\nhttps://www.novell.com/documentation/groupwise2012/gw2012_guide_admin/data/a7u9jel.html\n'
            },
            {
              name: 'GWIA Logs',
              selectMultiple: true,
              snippet: 'Please provide verbose GWIA logs from the time of the incident:\nhttps://www.novell.com/documentation/groupwise2014/gw2014_guide_admin/data/adm_gwia_mon_log.html\nhttps://www.novell.com/documentation/groupwise2012/gw2012_guide_admin/data/ak8u8jp.html\n'
            },
            {
              name: 'WebAccess Logs',
              selectMultiple: true,
              snippet: 'Please provide verbose WebAccess logs from the time of the incident:\nhttps://www.novell.com/documentation/groupwise2014/gw2014_guide_admin/data/adm_webacc_mon_logs.html\nhttps://www.novell.com/documentation/groupwise2012/gw2012_guide_admin/data/bw83bv6.html\n'
            },
            {
              name: 'MTA Logs',
              selectMultiple: true,
              snippet: 'Please provide verbose MTA logs from the time of the incident:\nhttps://www.novell.com/documentation/groupwise2014/gw2014_guide_admin/data/adm_mta_mon_log_files.html\nhttps://www.novell.com/documentation/groupwise2012/gw2012_guide_admin/data/a7xzvus.html\n'
            },
            {
              name: 'DVA Logs',
              selectMultiple: true,
              snippet: 'Please provide verbose DVA logs from the time of the incident:\nhttps://www.novell.com/documentation/groupwise2014/gw2014_guide_admin/data/adm_dva_log.html\nhttps://www.novell.com/documentation/groupwise2012/gw2012_guide_admin/data/bujawkn.html\n'
            }
          ]
        },
        {
          name: 'eDirectory',
          selectMultiple: true,
          snippet: '',
          items: []
        },
        {
          name: 'GMS',
          selectMultiple: true,
          snippet: '',
          items: [
            {
              name: 'ghc + upload logs',
              selectMultiple: true,
              snippet: 'Please run the dsapp General Health Check and upload Mobility logs:\nhttps://www.novell.com/support/kb/doc.php?id=7014307\n'
            },
            {
              name: 'Update Mobility',
              selectMultiple: true,
              snippet: 'Please see the following to update Mobility:\nhttps://www.novell.com/support/kb/doc.php?id=7007012\n'
            },
            {
              name: 'OS Upgrade Mobility',
              selectMultiple: true,
              snippet: 'Please see the following to upgrade the OS on a Mobility server:\nhttps://www.novell.com/support/kb/doc.php?id=7010339\n\nIt is important that Mobility is selected as an Add-On product during the upgrade or the following issue will happen:\nhttps://www.novell.com/support/kb/doc.php?id=7012365\n'
            },
            {
              name: 'Self-signed certificate',
              selectMultiple: true,
              snippet: 'Please see the following to create a self-signed certificate:\nhttps://www.novell.com/support/kb/doc.php?id=7007674\n'
            },
            {
              name: '3rd-party certificate',
              selectMultiple: true,
              snippet: 'Please see the following to implement a 3rd-party Trusted CA certificate:\nhttps://www.novell.com/support/kb/doc.php?id=7006904\n'
            },
            {
              name: 'Device Connectivity Issues',
              selectMultiple: true,
              snippet: 'There can be many causes of device connectivity issues. Please refer to the following Master TID to rule out common scenarios:\nhttps://www.novell.com/support/kb/doc.php?id=7013053\n'
            },
            {
              name: 'How to remove db references',
              selectMultiple: true,
              snippet: 'Please attempt to remove the user with WebAdmin first. Use the following TID as a last resort to clear potential database corruption:\nhttps://www.novell.com/support/kb/doc.php?id=7008852\n'
            },
            {
              name: 'Refresh Mobility Server',
              selectMultiple: true,
              snippet: 'Please see the following to refresh a Mobility server:\nhttps://www.novell.com/support/kb/doc.php?id=7014473\nNote: This is typically used when there are corrupt databases, slow performance on a large system where maintenance that has never been run and will take too long to catch up, etc. This essentially is a fresh install option, which will resync the data fresh from GroupWise.'
            }
          ]
        },
        {
          name: 'Filr',
          selectMultiple: true,
          snippet: '',
          items: []
        }
      ]
    };

    $scope.compileSnippet = function(template, selectedRow) {

      // Render variable-dependant snippet(s)
      $scope.templates.general[0].snippet = selectedRow.CUSTOMERNAME + ',\n\nWith regards to Service Request # ' + selectedRow.SR + ' ("+selectedRow.BRIEF+"):\n\n< INSERT MESSAGE >\n\nThank you,';
      
    };

    $scope.handleTemplate = function(template) {

      // If template requires variables from selectedRow, and 1 row isn't selected
      if(!template.selectMultiple && $scope.selectedRows.length !== 1) {
        toastr.error('Please only select one SR when using this template');
      }
      // Render variable-dependant snippets (depends on 1-row selected)
      else if(!template.selectMultiple) {
        $scope.compileSnippet(template, $scope.selectedRows[0]);
      }
      // Finally, insert the snippet
      $scope.editorContent.focus();
      $scope.editorContent.insertText($scope.editorContent.getSelection().start, template.snippet + '\n');
    };

    // Initialize editor with custom theme and modules
    $scope.editorContent = new Quill('#content', {
      modules: {
        'toolbar': { container: '#toolbar-content' },
        'link-tooltip': true,
        'image-tooltip': true
      },
      styles: {
        'body': {
          'font-family': "'Arial', san-serif",
          'font-size': "12px"
        }
      },
      theme: 'snow'
    });

    $scope.editorSignature = new Quill('#signature', {
      modules: {
        'toolbar': { container: '#toolbar-signature' },
        'link-tooltip': true,
        'image-tooltip': true
      },
      styles: {
        'body': {
          'font-family': "'Arial', san-serif",
          'font-size': "12px"
        }
      },
      theme: 'snow'
    });

    $scope.setFromUser = function(boolean){
      $scope.formData.fromUser = boolean;
      // TO-DO: Working on a way to replace my dependency on home.js (uses jQuery)
      // $scope.toggleClass(element, 'active');
      // $scope.toggleClass(element, 'btn-primary');
      // $scope.toggleClass(element, 'btn-default');
    };

    $scope.toggleClass = function(element, className){
      if (!element || !className){
          return;
      }
      var classString = element.className, 
          nameIndex = classString.indexOf(className);
      if (nameIndex === -1) {
          classString += ' ' + className;
      }
      else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
      }
      element.className = classString;
    };

    $scope.spinIt = function(element){

      $scope.toggleClass($scope.blurMe, 'blur');
      // var target = document.getElementById(element);
      var target = document.body;
      $scope.spinner = new Spinner({
        lines: 9,
        length: 0,
        width: 12,
        radius: 26,
        corners: 1.0,
        rotate: 0,
        trail: 48,
        speed: 0.9,
        direction: 1
      }).spin(target);
    };
    
    $scope.gridOptions = {
      data: 'myData',
      checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
      plugins: [new ngGridFlexibleHeightPlugin()],
      selectedItems: $scope.selectedRows,
      enableRowSelection: true,
      enableCellEditOnFocus: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      showFilter:true,
      showColumnMenu: true,
      showFooter: true,
      columnDefs: [{field: 'CREATEDON', displayName: 'Created On', enableCellEdit: false, cellFilter: 'date:\'mediumDate\'', width:'**', cellClass: 'grid-align-center'},
                   {field: 'SR', displayName: 'SR', enableCellEdit: false, width:'**'},
                   {field: 'CUSTOMERNAME', displayName: 'Name', enableCellEdit: false, width:'***'},
                   {field: 'PRIMARYEMAIL', displayName: 'Primary', enableCellEdit: true, width:'****'},
                   {field: 'ALTERNATECONTACT', displayName: 'Alternate', enableCellEdit: true, width:'****'},
                   {field: 'STATUS', displayName: 'Status', enableCellEdit: false, width:'***'},
                   {field: 'BRIEF', displayName: 'Brief Description', enableCellEdit: true, width:'********'},
                   {field: 'LASTACTIVITYDATE', displayName: 'Date', enableCellEdit: false, cellFilter: 'date:\'mediumDate\'', width:'**', cellClass: 'grid-align-center'},
                   {field: 'LASTACTIVITY', displayName: 'Last Activity', enableCellEdit: true, width:'**********', cellTemplate:'<div><div class="ngCellText" tooltip="{{row.getProperty(col.field)}}" tooltip-append-to-body="true">{{row.getProperty(col.field)}}</div></div>'}],
      sortInfo: { fields: ['LASTACTIVITYDATE'], directions: ['asc'] }
    };

    // angular-ui bootstrap modal
    $scope.open = function (size) {

      preview = '<div class=\"modal-header\"><button type=\"button\" class=\"close\" ng-click=\"no()\">×</button><h4 class=\"modal-title ng-binding\"><span class=\"glyphicon glyphicon-check\"></span> Please Confirm</h4></div><div class=\"modal-body\">' + $scope.editorContent.getHTML() + $scope.editorSignature.getHTML() + '</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button></div>';
  
      $scope.modalInstance = $modal.open({
        template: preview,
        controller: $scope.ModalInstanceCtrl
      });

    };

    $scope.ModalInstanceCtrl = function ($scope, $modalInstance) {

      $scope.ok = function () {
        $modalInstance.close();
        // $scope.getServiceRequests();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss();
      };
    };

    $scope.getServiceRequests = function() {

      $scope.spinIt('spinMe'); 

      $scope.rememberMe();
      $http({
        url: 'getServiceRequests',
        method: 'POST',
        data: JSON.stringify({ 'engineer': $scope.formData.engineer }),
        headers: {'Content-Type': 'application/json'},
        timeout: 2000
      }).success(function (data, status, headers, config) {
      	var body = data;
      	body.forEach(function(item){ 
      	  item.CREATEDON = new Date(Date.parse(item.CREATEDON)); 
      	  item.LASTACTIVITYDATE = new Date(Date.parse(item.LASTACTIVITYDATE)); 
      	});
      	$scope.myData = body;
      	toastr.success('Received Service Requests.');
      	$scope.toggleClass($scope.blurMe, 'blur'); $scope.spinner.stop();
      	$scope.gridOptions.$gridScope.toggleSelectAll(false);
      }).error(function (data, status, headers, config) {
        toastr.error('Failed to retrieve service requests!');
        console.error(data);
        $scope.toggleClass($scope.blurMe, 'blur'); $scope.spinner.stop();
      });

    };

    $scope.sendMail = function(){

      if ($scope.selectedRows.length === 0) {
        toastr.error('No Service Request selected!');
      } else {
        $scope.spinIt('spinMe'); 
        $scope.rememberMe();
        $scope.formData.content = $scope.editorContent.getHTML();
        $scope.formData.signature = $scope.editorSignature.getHTML();

        $http({
          url: 'sendMail',
          method: 'POST',
          data: JSON.stringify($scope.formData),
          headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
          var res = JSON.stringify(data);
          toastr.success(JSON.parse(res));
          $scope.toggleClass($scope.blurMe, 'blur'); $scope.spinner.stop();
          $scope.editorContent.setHTML('');
          $scope.gridOptions.$gridScope.toggleSelectAll(false);
        }).error(function (data, status, headers, config) {
          toastr.error(headers);
          console.error(data); 
          $scope.toggleClass($scope.blurMe, 'blur'); $scope.spinner.stop();  
        });
      }    
    };

    $scope.rememberMe = function() {

      if(localStorageService.isSupported) {

        if(document.getElementById('rememberMe').checked){
          localStorageService.set('engineer', $scope.formData.engineer);
          localStorageService.set('password', $scope.formData.password);
          localStorageService.set('fromUser', $scope.formData.fromUser);
          localStorageService.set('signature', $scope.editorSignature.getHTML());
        } else {
          localStorageService.clearAll();
        }
      }
      
    };

  }]);