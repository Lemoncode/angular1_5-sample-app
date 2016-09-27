

 export class ValidateDni implements ng.IDirective{
  public link: (scope: angular.IScope , elem: ng.IAugmentedJQuery, attrs: angular.IAttributes, ngModel: angular.INgModelController) => void;
  restrict ='A';
  require = 'ngModel';


  constructor(scope: angular.IScope, elem:ng.IAugmentedJQuery, attrs: angular.IAttributes, ngModel: angular.INgModelController, $log:angular.ILogService)
  {
    // It's important to add `link` to the prototype or you will end up with state issues.
    // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
    ValidateDni.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: angular.INgModelController) =>
    {

      if (!ngModel) {
        $log.warn("empty model found");
        return;
      }

      // Moving to 1.5 validation: http://codepen.io/transistor1/pen/pgXqNo
      ngModel.$validators['validateDni'] = function(dni) {
              return validateDNI(dni);
      }

      function validateDNI(dni)
      {
          var lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
          var valueDni=dni.substr(0,dni.length-1);
          var letra=dni.substr(dni.length-1,1).toUpperCase();

          if(lockup.charAt(valueDni % 23)==letra)
              return true;
          return false;
      }
    };
  }


  public static Factory()
  {
    var directive = (scope: angular.IScope , elem, attrs: angular.IAttributes, ngModel: angular.INgModelController,$log:angular.ILogService) =>
    {
      return new ValidateDni(scope, elem, attrs, ngModel, $log);
    };

    directive['$inject'] = ['$log'];
    return directive;
  }
}
