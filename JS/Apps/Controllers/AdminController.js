indexApp.controller('adminController', 
                    function($scope,
                            adminFactory,
                            $window,
                            growl,
                            $dialog
                            ){

    $scope.admin = {};
    $scope.admin.toggle = 'enabled';
    init();    
    
    function init(){
        adminForm('false');
        $scope.admin._new = {};
        $scope.admin._new.type = 'text';
    }

    function adminForm(archived){
        var promise = adminFactory.getfields(archived);
        promise.then(function(data){
            $scope.admin.fields = data.data.data;
        })
        .then(null, function(data){
            growl.addErrorMessage('No fields found.');
        })
    }

    $scope.addField = function(){
        var promise = adminFactory.newfield($scope.admin._new);
        promise.then(function(data){
            var field = $scope.admin._new.field.replace(/\s/g,'_');

            var newfld = {
                answer : null,
                field : field.toLowerCase(),
                name : $scope.admin._new.field
            }

            $scope.admin.fields.push(newfld);

            growl.addSuccessMessage($scope.admin._new.field+' has been added.');
            $scope.admin._new.field = null;
            $scope.admin._new.type = 'text';
        })
        .then(null, function(data){
            growl.addErrorMessage('User not found.');
        })
    }

    $scope.disableField = function(k){
        var title = 'Warning!';
        var msg = 'Are you sure you want to disable '+$scope.admin.fields[k].name+'? Please confirm.';
        var btns = [{result:'cancel', label: 'CANCEL'}, {result:'ok', label: 'DISABLE', cssClass: 'btn-primary'}];
        var file = 'Partials/Template/Dialog/message.html';

        $dialog.messageBox(title, msg, btns, file)
        .open()
        .then(function(result){
            if(result == 'ok'){
                $scope.admin.fields[k].archived = 't';
                var promise = adminFactory.archivefield($scope.admin.fields[k]);
                promise.then(function(data){
                    growl.addSuccessMessage($scope.admin.fields[k].name+' has been disabled.');
                    $scope.admin.fields.splice(k);
                })
                .then(null, function(data){
                    growl.addErrorMessage('An error occurred while deleting '+$scope.admin.fields[k].name+'. Please try again.');
                })
            }
        });
    }

    $scope.enableField = function(k){
        var title = 'Warning!';
        var msg = 'Are you sure you want to enable '+$scope.admin.fields[k].name+'? Please confirm.';
        var btns = [{result:'cancel', label: 'CANCEL'}, {result:'ok', label: 'ENABLE', cssClass: 'btn-primary'}];
        var file = 'Partials/Template/Dialog/message.html';

        $dialog.messageBox(title, msg, btns, file)
        .open()
        .then(function(result){
            if(result == 'ok'){
                $scope.admin.fields[k].archived = 'f';
                var promise = adminFactory.archivefield($scope.admin.fields[k]);
                promise.then(function(data){
                    growl.addSuccessMessage($scope.admin.fields[k].name+' has been enabled.');
                    $scope.admin.fields.splice(k);
                })
                .then(null, function(data){
                    growl.addErrorMessage('An error occurred while deleting '+$scope.admin.fields[k].name+'. Please try again.');
                })
            }
        });
    }

    $scope.renameField = function(k){
        var title = $scope.admin.fields[k].name;
        var msg = 'Enter a new field name here: ';
        var btns = [{action:'cancel', label: 'CANCEL'}, {action:'ok', label: 'SAVE', cssClass: 'btn-primary'}];
        var file = 'Partials/Template/Dialog/rename_field.html';

        $dialog.messageBox(title, msg, btns, file)
        .open()
        .then(function(result){
            if(result.action == 'ok'){
                $scope.admin.fields[k].name = result.name;
                var promise = adminFactory.renamefield($scope.admin.fields[k]);
                promise.then(function(data){
                    var name = $scope.admin.fields[k].name;
                    $scope.admin.fields[k].field = name.replace(/(\s)/g,'_').toLowerCase();
                    
                    growl.addSuccessMessage(title+' has been renamed to '+name);
                })
                .then(null, function(data){
                    growl.addErrorMessage('An error occurred while renaming '+$scope.admin.fields[k].name+'. Please try again.');
                })
            }
        });
    }

    $scope.showenabled = function(){
        $scope.admin.fields = null;
        $scope.admin.toggle = 'enabled';
        adminForm('false');
    }

    $scope.showdiabled = function(){
        $scope.admin.fields = null;
        $scope.admin.toggle = 'disabled';
        adminForm('true');
    }
});