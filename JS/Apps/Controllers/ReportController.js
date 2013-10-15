indexApp.controller('ReportController', 
                    function($scope,
                            reportFactory,
                            adminFactory,
                            $window,
                            growl
                            ){

    init();

    $scope.report = {};
    
    function init(){
        datepicker()
    }

    $scope.search_report = function(){
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
        var promise = reportFactory.getReport(datefrom,dateto);
        promise.then(function(data){
            $scope.report.info = data.data.data;
            // console.log($scope.report.info);
        })
        .then(null, function(data){
            growl.addErrorMessage('No data found.');
        })

        var promise = adminFactory.getAllfields();
        promise.then(function(data){
            $scope.report.fields = data.data.data;
            $scope.report.fields.push({
                answer : null,
                field : 'employee_name',
                name : 'Employee Name',
                type : 'text'
            });
        })
        .then(null, function(data){
            growl.addErrorMessage('No fields found.');
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
        
        $window.location = 'Functions/Report/exportReport.php?datefrom='+datefrom+'&dateto='+dateto;
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

    // $scope.datepicker = {date: new Date("2012-10-01T00:00:00.000Z")};
});