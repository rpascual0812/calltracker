indexApp.controller('HomeController', 
                    function($scope,
                            $window,
                            growl,
                            sessionFactory,
                            usersFactory
                            ){

    $scope.template = {};
    $scope.loggeduser = {};
    //$scope.phpcookie = {};
    $scope.personal = {};
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
            //$scope.phpcookie.empid = data.data.empid;
            current_user();
            //getUserInfo();
        })
        .then(null, function(data){
            //redirect because the user is not logged in
            $window.location = "#/";
        })        

    	$scope.template.path = 'Partials/Apps/calltracker.html'; 
    }

    // function getUserInfo(){
    //     var promise = usersFactory.getuser($scope.phpcookie.empid);
    //     promise.then(function(data){
    //         var info = data.data.data;

    //         $scope.personal.firstname = info[0].firstname;
    //         $scope.personal.lastname = info[0].lastname;
    //     })
    //     .then(null, function(data){
            
    //     })
    // }
    function current_user(){
        var promise = usersFactory.currentuser();
        promise.then(function(data){
            $scope.loggeduser = data.data.data[0];
        })
    }
});