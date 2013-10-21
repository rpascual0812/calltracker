indexApp.controller('HomeController', 
                    function($scope,
                            $window,
                            growl,
                            sessionFactory
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
        var promise = sessionFactory.getSession();
        promise.then(function(data){
            //do nothing for now
        })
        .then(null, function(data){
            //redirect because the user is not logged in
            $window.location = "#/";
        })

    	$scope.template.path = 'Partials/Apps/calltracker.html'; 
    }
});