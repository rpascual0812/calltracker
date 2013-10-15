indexApp.controller('HomeController', 
                    function($scope,
                            $window,
                            growl
                            ){

    $scope.template = {};
    init();

    $scope.view = {
        getView: function(page) {
            return "Partials/Apps/" + page + ".html";
        }
    }

    $scope.loadTemplate = function(name){
		$scope.template.path = 'Partials/Apps/'+name+'.html';    	
    }

    function init(){
    	$scope.template.path = 'Partials/Apps/calltracker.html'; 
    }
});