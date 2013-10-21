var indexApp = angular.module("onload", ['ngRoute','angular-growl','ui.bootstrap','ui.bootstrap.dialog','highcharts-ng']);

///////
//GROWL
///////

indexApp.config(["growlProvider", "$httpProvider", function(growlProvider, $httpProvider) {
	growlProvider.globalTimeToLive(5000);
	growlProvider.messagesKey("my-messages");
	growlProvider.messageTextKey("messagetext");
	growlProvider.messageSeverityKey("severity-level");
	$httpProvider.responseInterceptors.push(growlProvider.serverMessagesInterceptor);
}]);

///////
//ROUTE
///////

indexApp.config(function($routeProvider){
    $routeProvider
        .when('/',
            {
                controller: 'LoginController',
                templateUrl: './Partials/Apps/login.html'
            })
        .when('/home',
            {
                controller: 'HomeController',
                templateUrl: './Partials/Apps/home.html'
            })
        .when('/logout',
            {
                controller: 'LogoutController',
                templateUrl: './Partials/Apps/logout.html'
            })
        .otherwise({ redirectTo: '/' }
    );
});

