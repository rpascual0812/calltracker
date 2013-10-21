indexApp.factory('sessionFactory', function($http){
    var factory = {};           
    
    factory.getSession = function(){
        var promise = $http({
            url:'./Functions/Auth/getSession.php',
            method: 'POST'
        })

        return promise;
    };

    factory.removeSession = function(){
        var promise = $http({
            url:'./Functions/Auth/removeSession.php',
            method: 'POST'
        })

        return promise;
    };

    return factory;
});