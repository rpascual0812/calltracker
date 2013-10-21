indexApp.controller('GraphController', 
                    function($scope,
                            adminFactory,
                            graphFactory,
                            growl
                            ){
    $scope.fields = {};
    $scope.chart = {};
    $scope.chart.visibility = false;

    datepicker();
    fields();

    function fields(){
        var promise = adminFactory.getGraphfields();
        promise.then(function(data){
            $scope.fields.list = data.data.data;
            $scope.field1 = $scope.fields.list[0].name;

            //show_graph();
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

    $scope.search_graph = function(){
        show_graph();
    }

    function show_graph(){
        $scope.chart.visibility = true;
        if($scope.field1){

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
            
            var field1 = $scope.field1.replace(/\s/g,'_');
            // var field2 = $scope.field2.replace(/\s/g,'_');

            var promise = graphFactory.getGraph(datefrom,dateto,field1.toLowerCase());
            promise.then(function(data){
                var list = data.data;

                var chart_data = list.chartdata;
                $scope.chart.xaxis = list.xaxis;

                set_chart(chart_data);                
            })
            .then(null, function(data){
                growl.addErrorMessage('No data found.');
            })
        }        
    }

    function set_chart(chart_data){
        var chartseries = [];
        chartseries.push(
            { // spline
                "name" : 'Line',//$scope.field1,
                "data" : chart_data,
                connectNulls: true
            },
            { // bar
                "name": 'Bar',//'Author', 
                "data": chart_data,
                type: "column"
            }
        );
               
        $scope.chartSeries = chartseries;

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'spline'
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
            yaxis: {
                title: {
                    enabled: false,
                    text: null
                }
            },
            xAxis: {
                categories: $scope.chart.xaxis
            },
            credits: {
                enabled: false
            },
            loading: false,
            exporting: {
                sourceWidth: 400,
                sourceHeight: 200
            }
        }
    }
});