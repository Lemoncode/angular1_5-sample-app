# 01 Hello Angular

In this sample we are going to create an instantiante a minimum angular 1.5 application.

We are going to take as startup point _00 Boilerplate_

# Summary steps:

- Install Angular libraries.
- Creating the app.
- Instantiating the app from the HTML.
- Creating a component.
- Displaying a component.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample "00 Boilerplate"

## Steps


Let's start by installing Angular 1.x library

```
npm install angular@1.5.8 --save
```

Let's install the angularjs typings:

```
typings install dt~angular --global --save
```

We will need to install JQuery typings as well

```
typings install dt~jquery --global --save
```

Under _src_ folder let's replace the content of the _index.tsx_ file:

```javascript
import * as angular from 'angular'

var app = angular.module('myAppointmentsApp', []);

// Just to test if the app is instantiated
// check the browser console (developer window)
console.log(app);
```

Now if we open the console we can check that the app has been created successfuly
(in the console window we can expand the dumped app object).

Let's create our first component.

First we will indicate in the HTML that we are going to use this application (index.html):

```javascript
<html ng-app="myAppointmentsApp">
```

Under _src_ let's create the following subfolders _components/common_ and
under that subfolder let's create a file called _header.tsx_ this file will
contain a simple "header" component:

```javascript
import * as angular from 'angular';

class HeaderController {
  sampleBinding : string;

  constructor() {
    this.sampleBinding = "Testing binding header component";
  }
}

export const header = {
  template: '<h1>Header testing bindings: {{$ctrl.sampleBinding}}',
  controller: HeaderController
}
```

Let's register this component in the _index.ts_ file

```javascript
var app = angular.module('myAppointmentsApp', []);

app.component('header', header);
```

Let's use this component in our _index.html_ file

```html
<body>
  <div>
      <header/>
  </div>
</body>
```

Now we can run the sample

```
npm start
```

And we can see how the _header_ component gets instantiated and bindings are
working as expected.
