indexApp.controller('TrackerController', 
                    function($scope,
                            trackerFactory,
                            $window,
                            growl
                            ){

    init();

    $scope.calltracker = {};
    
    function init(){
        calltracker();
    }

    function calltracker(){
        var promise = trackerFactory.getfields();
        promise.then(function(data){
            $scope.calltracker.fields = data.data.data;
        })
        .then(null, function(data){
            growl.addErrorMessage('No fields found.');
        })
    }

    $scope.submit_log = function(){
        var promise = trackerFactory.insertlogs($scope.calltracker.fields);
        promise.then(function(data){
            growl.addSuccessMessage('Record saved.');
            clearForm();
        })
        .then(null, function(data){
            growl.addErrorMessage('Failed to insert record. Please try again.');
        })
    }

    function clearForm(){
        for(var i=0;i<$scope.calltracker.fields.length;i++){
            $scope.calltracker.fields[i].answer = null;
        }
    }
});