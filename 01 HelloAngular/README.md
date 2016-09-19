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
