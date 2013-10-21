indexApp.directive('alphanumericValidation', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {

                var transformedInput = inputValue.replace(/([^A-Za-z\s])/g, ''); 

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }         

                return transformedInput;         
            });
        }
    };
});