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
