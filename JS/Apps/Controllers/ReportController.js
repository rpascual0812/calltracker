indexApp.controller('ReportController', 
                    function($scope,
                            reportFactory,
                            adminFactory,
                            $window,
                            growl,
                            $dialog
                            ){

    init();

    $scope.report = {};
    $scope.empid = 'All';
    $scope.loggeduser = {};
    
    function init(){
        datepicker();
        author();
        current_user();
    }

    function author(){
        var promise = reportFactory.getAuthors();
        promise.then(function(data){
            $scope.author = data.data.data;
        })
        .then(null, function(data){
            growl.addErrorMessage('No users found.');
        })
    }

    function current_user(){
        var promise = reportFactory.currentuser();
        promise.then(function(data){
            $scope.loggeduser = data.data.data[0];
        })
    }

    $scope.search_report = function(){
        report();
    }

    function report(){
        var f = new Date($scope.datefrom);
        var yearfrom = f.getFullYear();
        var monthfrom = parseInt(f.getMonth())+1;
        var dayfrom = parseInt(f.getUTCDate());

        var datefrom = yearfrom+'-'+monthfrom+'-'+dayfrom+' '+$scope.timefrom;

        var t = new Date($scope.dateto);
        var yearto = t.getFullYear();
        var monthto = parseInt(t.getMonth())+1;
        var dayto = parseInt(t.getUTCDate());

        var dateto = yearto+'-'+monthto+'-'+dayto+' '+$scope.timeto;
        $scope.report.info = {};

        var promise = reportFactory.getReport(datefrom,dateto,$scope.empid);
        promise.then(function(data){
            $scope.report.info = data.data.data;
            $scope.report.fields = data.data.fields;
            
        })
        .then(null, function(data){
            growl.addErrorMessage('No data found.');
        })
    }

    $scope.export_report = function(){
        var f = new Date($scope.datefrom);
        var yearfrom = f.getFullYear();
        var monthfrom = parseInt(f.getMonth())+1;
        var dayfrom = parseInt(f.getUTCDate());

        var datefrom = yearfrom+'-'+monthfrom+'-'+dayfrom+' '+$scope.timefrom;

        var t = new Date($scope.dateto);
        var yearto = t.getFullYear();
        var monthto = parseInt(t.getMonth())+1;
        var dayto = parseInt(t.getUTCDate());

        var dateto = yearto+'-'+monthto+'-'+dayto+' '+$scope.timeto;
        
        $window.location = 'Functions/Report/exportReport.php?datefrom='+datefrom+'&dateto='+dateto+'&empid='+$scope.empid;
    }

    function datepicker(){
        $scope.timefrom = '0000';
        $scope.timeto = '2359';

        $scope.today = function() {
            $scope.datefrom = new Date();
            $scope.dateto = new Date();
        };
        $scope.today();

        $scope.showWeeks = false;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = ! $scope.showWeeks;
        };

        $scope.clear = function () {
            $scope.datefrom = null;
            $scope.dateto = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        // $scope.toggleMin();

        $scope.open = function() {
            $timeout(function() {
                $scope.opened = true;
            });
        };

        $scope.dateOptions = {
            'year-format': "'yyyy'",
            'starting-day': 0
        };
    }

    $scope.deletecall = function(k){
        console.log($scope.report.info);
        var title = 'Warning!';
        var msg = 'Are you sure you want to delete entry with ID # '+$scope.report.info[k][0]+'? This action can not be undone. Please confirm.';
        var btns = [{result:'cancel', label: 'CANCEL'}, {result:'ok', label: 'DELETE', cssClass: 'btn-primary'}];
        var file = 'Partials/Template/Dialog/message.html';

        $dialog.messageBox(title, msg, btns, file)
        .open()
        .then(function(result){
            if(result == 'ok'){
                var promise = reportFactory.deletecall($scope.report.info[k]);
                promise.then(function(data){
                    growl.addSuccessMessage($scope.report.info[k][0]+' has been deleted.');
                    report();
                    //$scope.report.info.splice(k);
                })
                .then(null, function(data){
                    growl.addErrorMessage('An error occurred while deleting '+$scope.report.info[k].lastname+'. Please try again.');
                })
            }
        });
    }
});