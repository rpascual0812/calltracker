indexApp.controller('GraphController', 
                    function($scope,
                            adminFactory
                            ){
    $scope.fields = {};

    datepicker();
    fields();

    function fields(){
        var promise = adminFactory.getGraphfields();
        promise.then(function(data){
            $scope.fields.list = data.data.data;
        })
        .then(null, function(data){
            growl.addErrorMessage('No fields found.');
        })
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

    $scope.chartTypes = [
        {"id": "line", "title": "Line"},
        {"id": "spline", "title": "Smooth line"},
        {"id": "area", "title": "Area"},
        {"id": "areaspline", "title": "Smooth area"},
        {"id": "column", "title": "Column"},
        {"id": "bar", "title": "Bar"},
        {"id": "pie", "title": "Pie"},
        {"id": "scatter", "title": "Scatter"}
    ];

    $scope.dashStyles = [
        {"id": "Solid", "title": "Solid"},
        {"id": "ShortDash", "title": "ShortDash"},
        {"id": "ShortDot", "title": "ShortDot"},
        {"id": "ShortDashDot", "title": "ShortDashDot"},
        {"id": "ShortDashDotDot", "title": "ShortDashDotDot"},
        {"id": "Dot", "title": "Dot"},
        {"id": "Dash", "title": "Dash"},
        {"id": "LongDash", "title": "LongDash"},
        {"id": "DashDot", "title": "DashDot"},
        {"id": "LongDashDot", "title": "LongDashDot"},
        {"id": "LongDashDotDot", "title": "LongDashDotDot"}
    ];

    $scope.chartSeries = [
        {"name": "Some data", "data": [1, 2, 4, 7, 3,9]},
        {"name": "Some data 3", "data": [3, 1, null, 5, 2, 5], connectNulls: true},

        // {"name": "Some data", "data": [1, 2, 4, 7, 3], type: "column"},
        {"name": "Some data 3", "data": [3, 1, null, 5, 2, 5], type: "column"},
        {"name": "Some data 2", "data": [5, 2, 2, 3, 5, 5], type: "column"},
        {"name": "My Super Column", "data": [1, 1, 2, 3, 2, 7], type: "column"}
    ];

    $scope.chartStack = [
        {"id": '', "title": "No"},
        {"id": "normal", "title": "Normal"},
        {"id": "percent", "title": "Percent"}
    ];

    $scope.addPoints = function () {
        var seriesArray = $scope.chartConfig.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chartConfig.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.removeSeries = function(id) {
        var seriesArray = $scope.chartConfig.series;
        seriesArray.splice(id, 1)
    }

    $scope.toggleHighCharts = function () {
        this.chartConfig.useHighStocks = !this.chartConfig.useHighStocks
    }

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'areaspline'
            },
            plotOptions: {
                series: {
                    stacking: ''
                }
            }
        },
        series: $scope.chartSeries,
        title: {
            text: 'Calls Tracker Chart'
        },
        credits: {
            enabled: false
        },
        loading: false,
        exporting: {
            sourceWidth: 400,
            sourceHeight: 200,
            // scale: 2 (default)
            chartOptions: {
                subtitle: null
            }
        }
    }

    $scope.search_graph = function(){
        if($scope.field1){
            var promise = adminFactory.getGraphfields();
            promise.then(function(data){
                //$scope.fields.list = data.data.data;
                
            })
            .then(null, function(data){
                growl.addErrorMessage('No fields found.');
            })
        }        
    }
});