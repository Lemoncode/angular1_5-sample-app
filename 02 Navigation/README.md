# 02 Navigation

In this sample we are going to add route navigation support to our sample app.

We are going to take as startup point _01 HelloAngular_

# Summary steps:

- Install routing libraries.
- Define routes.
- Create empty pages components, including a basic navgation.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample "01 HelloAngular"

## Steps


Let's start by installing angular-ui-router (angular 1.5 component router is an
abandoned project, [more info](http://stackoverflow.com/questions/33652668/angular-1-5-and-new-component-router)).

```
npm install angular-ui-router --save
```

Let's install typings definition for anguiar-ui-router

```
typings install dt~angular-ui-router --global --save
```

We need to install as well es6-promise tpyings

```
typings  install dt~es6-promise --global --save
```

Now we need to indicate in _index.ts_ that we are going to use this module in our
app:

```javascript
import 'angular-ui-router';

// (...)

var app = angular.module('myAppointmentsApp', ['ui.router']);

app.component('login', login);
```

The next step is to define our routing config, let's create a file called
_app-routes.ts_ there we will setup the ui-router and setup a route to a login pages

```javascript
function routing($locationProvider: ng.ILocationProvider,
                $stateProvider: angular.ui.IStateProvider,
                $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    // html5 removes the need for # in URL
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider.state('home', <ng.ui.IState>{
        url: '/home',
        views: {
            'content@': { template: '<login></login>' }
        }
      }
    );

    $urlRouterProvider.otherwise('/home');
}

export default routing;
```

Now we have to comeback to our app.tsx file and register our routing function

```javascript
import routing from './app-routes';
// (...)

var app = angular.module('myAppointmentsApp', ['ui.router'])
          .config(routing);;
```

Under _components_ subfolder let's create a new subfolder called _login_ and
there we are going to create a dummy login component:

```javascript
import * as angular from 'angular';

class LoginController {
  sampleBinding : string;

  constructor() {
    this.sampleBinding = "Hello form Login";
  }
}

export const login = {
  template: '<h1>bindings test: {{$ctrl.sampleBinding}}</h1>',
  controller: LoginController
}
```

Now we need to setup the placeholder for the views, we will do that in
_index.html_ file:


```html
<div>
  <header></header>
  <div ui-view="content"></div>
</div>
```
