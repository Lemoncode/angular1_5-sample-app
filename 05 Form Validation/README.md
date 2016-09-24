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

Let's make


### Adding custom validation
