indexApp.factory('usersFactory', function($http){
    var factory = {};           
    
    factory.getusers = function(visibility){
        var promise = $http({
            url:'./Functions/Users/getUsers.php',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : { 
                visibility : visibility
            }
        })

        return promise;
    };

    factory.newUser = function(data){
        var promise = $http({
            url:'./Functions/Users/addNew.php',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : { 
                empid : data.empid, 
                lastname : data.lastname,
                firstname : data.firstname
            }
        })

        return promise;
    };

    factory.changestatus = function(data){
        var promise = $http({
            url:'./Functions/Users/status.php',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : { 
                empid : data.empid,
                visibility : data.visibility
            }
        })

        return promise;
    };

    factory.deleteuser = function(data){
        var promise = $http({
            url:'./Functions/Users/delete.php',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : { 
                empid : data.empid
            }
        })

        return promise;
    };

    return factory;
});