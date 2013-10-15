indexApp.controller('LoginController', 
                    function($scope,
                            loginFactory,
                            $window,
                            growl
                            ){

    $scope.login = {};
    init();
    
    function init(){
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
});