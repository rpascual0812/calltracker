indexApp.controller('LogoutController', 
                    function($scope,
                            $window,
                            sessionFactory
                            ){

    init();

    function init(){
        var promise = sessionFactory.removeSession();
        promise.then(function(data){
            $window.location = "#/";
        })
        .then(null, function(data){
            $window.location = "#/home";
        })
    }
});