import * as angular from 'angular'
import {header} from './components/common/header';

var app = angular.module('myAppointmentsApp', []);

app.component('header', header);
