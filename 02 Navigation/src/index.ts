import * as angular from 'angular'
import 'angular-ui-router';
import routing from './app-routes';
import {header} from './components/common/header';
import {login} from './components/login/login';



var app = angular.module('myAppointmentsApp', ['ui.router'])
          .config(routing);

app.component('header', header);
app.component('login', login);
