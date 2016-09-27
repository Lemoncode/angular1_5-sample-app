# 05 Form Validation

In this sample we are going to add validation to the appoint form that we have
previously created.

We are going to take as startup point _04 Form Page_

# Summary steps:

- Add message validation support.
- Add basic validations.
- Add a custom validation (NIF).

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want
to follow this step guides you will need to take as starting point sample "04 From Page".

## Steps

### Adding libraries

First we are going to install and add to the project an angular library to
display error messages (ng-message). In this case we need to make some special
tweaking

Install packages:


```
npm install angular-messages --save
```

```
typings install dt~node --save --global
```


Let's include this dependency in our project (_index.tsx_).


```javascript
var app = angular.module('myAppointmentsApp', ['ui.router', 'ng-messages'])
```



### Adding basic validation

Let's start by making the NIF field required and notify the user in case this
validation fails.

First we need to add a name to the form element, then add a name as well to
the input that will hold the input tag.

```html
<form id="edit-patient-form" name="editPatientForm">
```

```html
<input type="text"
  class="form-control"
  name="dni"
  id="dni"
  ng-model="$ctrl.patient.dni"
/>

```

Now we can add the validation and the error message

```html
<input type="text"
  class="form-control"
  name="dni"
  id="dni"
  ng-model="$ctrl.patient.dni"
  ng-required="true"
/>

<div ng-messages="editPatientForm.dni.$error" style="color:maroon" role="alert">
   <div ng-message="required">You did not enter a field</div>
</div>
```

_Note: we can get this more generic by using templates [documentation](https://docs.angularjs.org/api/ngMessages/directive/ngMessages)_

We can disable the save button in case there are errors:

```html
<button
  type="button"
  class="btn btn-success"
  ng-click="$ctrl.save()"
  ng-disabled="editPatientForm.$invalid"
  >
```

### Adding custom validation

Angular provides some useful built-in validation directives
(required, regex, maxlenght, minlenght...), and there is as well an ecosystem of
third party validations avaialble (ng-iban, etc...), but in some cases we need
to add custom validations that are not available, in this case we can write
our own custom validations.

In this case we are going to add a custom validation directive to validate a
DNI (Spanish Id), register it and use it our appointment form.

Let's create the following subfolder _src/validations_ under this folder let's
placed a file called validateDni.ts and add the following code:

```javascript
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

     ngModel.$parsers.push(validator);

     function validator(modelValue: string) {
       var val = modelValue;
       var isValid = validateDNI(val);

       ngModel.$setValidity('validateDni', isValid);

       return modelValue;
     };

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
```

Now we need to register the directive in our app, let's open _index.ts_ and
register the directive.

```javascript
import {ValidateDni} from './validations/validateDni';
```


```javascript
app.directive('validateDni', ValidateDni.Factory());

```

We are ready to use the validation in our form
_src/components/patient/patients.ts_

```javascript
<input type="text"
  class="form-control"
  name="dni"
  id="dni"
  ng-model="$ctrl.patient.dni"
  ng-required="true"
  validate-dni=""
/>
<div ng-messages="editPatientForm.dni.$error" style="color:maroon" role="alert">
   <div ng-message="required">You did not enter a field</div>
   <div ng-message="validateDni">DNI not valid</div>
</div>
```
