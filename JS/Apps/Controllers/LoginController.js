indexApp.controller('LoginController', 
                    function($scope,
                            loginFactory,
                            sessionFactory,
                            $window,
                            growl
                            ){

    $scope.login = {};
    init();
    
    function init(){
        checkuser();

        $scope.login = {
            username : undefined,
            password : undefined
        }
    }

    $scope.userlogin = function(){
        var promise = loginFactory.userlogin($scope.login);
        promise.then(function(data){
            $window.location.href = '#/home';
        })
        .then(null, function(data){
            growl.addErrorMessage('User not found.');
        })
    }

    function checkuser(){
        var promise = sessionFactory.getSession();
        promise.then(function(data){
            $window.location = "#/home";
            //no to log in
        })
        .then(null, function(data){
            //do nothing for now
        })
    }
});