import * as angular from 'angular'
import 'angular-ui-router';
import routing from './app-routes';
import {header} from './components/common/header';
import {login} from './components/login/login';
import {patients} from './components/patients/patients';
import {patient} from './components/patient/patient';
import {searchPatient} from './components/patients/searchPatient';
import {patientsList} from './components/patients/patientsList';
import {PatientAPI} from './api/patientAPI';

var app = angular.module('myAppointmentsApp', ['ui.router'])
          .config(routing);

app.service('PatientAPI', PatientAPI);

app.component('header', header);
app.component('login', login);
app.component('patients', patients);
app.component('patient', patient);
app.component('searchPatient', searchPatient);
app.component('patientsList', patientsList);
