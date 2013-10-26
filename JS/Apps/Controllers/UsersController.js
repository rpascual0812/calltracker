indexApp.controller('UsersController', 
                    function($scope,
                            usersFactory,
                            $window,
                            $dialog,
                            growl
                            ){

    init();

    $scope.users = {};
    $scope.users._new = {};
    $scope.users._new.usertype = 'Agent';
    $scope.users.toggle = 'enabled';
    
    function init(){
        users();
    }

    function users(){
        var promise = usersFactory.getusers('true');
        promise.then(function(data){
            $scope.users.list = data.data.data;
        })
        .then(null, function(data){
            $scope.users.list = null;
            growl.addErrorMessage('No data found.');
        })
    }

    $scope.showenabled = function(){
        $scope.users.list = null;
        $scope.users.toggle = 'enabled';
        users();
    }

    $scope.showdiabled = function(){
        $scope.users.list = null;
        $scope.users.toggle = 'disabled';
        var promise = usersFactory.getusers('false');
        promise.then(function(data){
            $scope.users.list = data.data.data;
        })
        .then(null, function(data){
            growl.addErrorMessage('No data found.');
        })
    }

    $scope.newuser = function(){
        var promise = usersFactory.newUser($scope.users._new);
        promise.then(function(data){
            growl.addSuccessMessage('User added. Default password is acquire123#');
            users();
            clearForm();
        })
        .then(null, function(data){
            growl.addErrorMessage('Failed to insert record. Please try again.');
        })
    }

    function clearForm(){
        $scope.users._new.empid = null;
        $scope.users._new.lastname = null;
        $scope.users._new.firstname = null;
    }

    $scope.changestatus = function(k){
        $scope.users.list[k].visibility = ($scope.users.list[k].visibility == 't')?'f':'t';       

        var promise = usersFactory.changestatus($scope.users.list[k]);
        promise.then(function(data){
            var msg = '';
            if($scope.users.list[k].visibility == 't'){
                msg = 'User has been enabled.';
            }
            else{
                msg = 'User has been disabled';
            }

            growl.addSuccessMessage(msg);
        })
        .then(null, function(data){
            growl.addErrorMessage('Failed to update user. Please try again.');
        })
    }

    $scope.deleteuser = function(k){
        var title = 'Warning!';
        var msg = 'Are you sure you want to delete '+$scope.users.list[k].firstname+" "+$scope.users.list[k].lastname+'? Please confirm.';
        var btns = [{result:'cancel', label: 'CANCEL'}, {result:'ok', label: 'DELETE', cssClass: 'btn-primary'}];
        var file = 'Partials/Template/Dialog/message.html';

        $dialog.messageBox(title, msg, btns, file)
        .open()
        .then(function(result){
            if(result == 'ok'){
                var promise = usersFactory.deleteuser($scope.users.list[k]);
                promise.then(function(data){
                    growl.addSuccessMessage($scope.users.list[k].firstname+" "+$scope.users.list[k].lastname+' has been deleted.');
                    $scope.users.list.splice(k);
                })
                .then(null, function(data){
                    growl.addErrorMessage('An error occurred while deleting '+$scope.users.list[k].firstname+" "+$scope.users.list[k].lastname+'. Please try again.');
                })
            }
        });
    }
});