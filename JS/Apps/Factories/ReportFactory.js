indexApp.factory('reportFactory', function($http){
    var factory = {};           
    
    factory.getReport = function(datefrom,dateto){
        var code_arr = { 
                            datefrom : datefrom,
                            dateto : dateto
                        };

        var promise = $http({
            url:'./Functions/Report/getReport.php',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : code_arr
        })

        return promise;
    };

    return factory;
});