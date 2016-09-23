# 04 Form Page

In this sample we are going to build up an appoinment edit form.

We are going to take as startup point _03 List Page

# Summary steps:

- Add navigation link.
- Build the component layout.
- Create API plumbing to retrieve data from a given appointment.
- Load the data into the component controller and bind them to the HTML.
- Trigger save on console log.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample "03 List Page".

## Steps

### Navigation

Let's start by adding a link navigation, whenever we click on a given appointment
(in the list page) it should jump into the edit appointment entry.

Since we are going to introduce a new route _patient/id_ let's add it into the
router (_app-routes.ts_):

```javascript
$stateProvider.state('patientEdit', <ng.ui.IState>{
    url: '/patient/{patientId:[0-9]{1,8}}',
    views: {
        'content@': { template: '<patient></patient>' }
    }
  }
);
```

Now in _ListPage.ts_ let's create a link that will point to that route:

```html
<td class="hidden-xs">
  {{patient.time}}
  <a ui-sref="patientEdit({patientId: {{patient.id}}})">
  <span class="pull-right glyphicon glyphicon-pencil"
    >
  </span>
  </a>
</td>
```


Let's run _npm start_ from the command line and check that the navigation is being
performed:

```javascript
npm start
```


### Layout

It's time to build the appointment edition layout, let's jump into the _patient/patient.ts_ file and replace
the component template with the following one.

```html
<div class="container-fluid well">
   <div class="row">
     <div class="col-xs-12">
       <h2>Update Appointment</h2>
     </div>
   </div>

   <div class="row">
        <form id="edit-patient-form">
          <div class="col-xs-12 form-group">
            <label>Datos Paciente</label>
          </div>
          <div class="col-sm-6 form-group">
            <label for="dni">DNI</label>
            <input type="text" class="form-control" id="dni"/>
          </div>
          <div class="col-sm-6 form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name"/>
          </div>
          <div class="col-xs-12 form-group">
            <label>Appointment info</label>
          </div>
          <div class="col-md-6 col-lg-3 form-group">
            <label for="date">Date</label>
            <input type="date" class="form-control" id="date"/>
          </div>
          <div class="col-md-6 col-lg-3 form-group">
            <label for="time">Time</label>
            <input type="time" class="form-control" id="time"/>
          </div>
          <div class="col-md-6 col-lg-3 form-group">
            <label for="specialty">Specialty</label>
            <select id="specialty" class="form-control">
            </select>
          </div>
          <div class="col-md-6 col-lg-3 form-group">
            <label for="doctor">Doctor</label>
            <select id="doctor" class="form-control">
            </select>
          </div>
          <div class="col-xs-offset-10 col-xs-2 form-group">
            <div class="pull-right">
              <button type="button" class="btn btn-success">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
```

### Data

Since we are just mocking data, we are going to add an entry to the _api/patientAPI_ that will load a single
appointment, by passing as entry param it's ID (we will load the whole json file then filter in memory, **remark:
this is just a mock dummy data layer, do not do this in a real project**).

We will use promises for this, since angular needs it's special tricks to get on the $scope digest cycle, we
cannot directly use ES6 promises, we have to use $q.

Let's request this service into the patientAPI

```javascript
export class PatientAPI {
  public static $inject: Array<string> = ['$http', '$q'];

  private baseUrl: string = './mockData/patients.json';

  constructor(private $http : angular.IHttpService, private $q : angular.IQService) {
```


```javascript
getPatientById(id: number) : Promise<Patient> {
  const defer = this.$q.defer();

  this.getAllPatientsAsync().then((patients) => {
        // refine this later one
        const nonTypedPatient = patients.filter(
          (patient) => {
            return (patient.id == id);
          }
        )[0];

        const patient : Patient = nonTypedPatient;

        // Mapping should be placed in a separate map
        patient.date = new Date(<any>nonTypedPatient.date);
        patient.time = new Date(<any>nonTypedPatient.time)

        defer.resolve(patient);
   });

   return defer.promise;
}
```

## Interaction

In the _patient/patient.ts_ component we are going to load the appointment information by getting the Id from
the route param, and the call the api _loadPatient_ method.

```javascript
import * as angular from 'angular';
import {PatientAPI} from "../../api/patientAPI";
import {Patient} from '../../model/patient';

class PatientController {
  public static $inject: Array<string> = ['PatientAPI', '$stateParams'];
  public patient : Patient = null;

  constructor(patientAPI : PatientAPI, $stateParams : angular.ui.IStateParamsService) {
    const patientId : number = $stateParams['patientId'];

    patientAPI.getPatientById(patientId).then((data) => {
      this.patient = data;
    });

  }
}
```

We have the data loaded in our component let's bind it and display it in our form (let's part of the
_patient/patient.ts_ template content, not down: we are using ng-model directive to bind the forms controls
to the patient/appointment info).

Let's bind first the straight forward fields (ng-model inputs)

```html
<div class="col-sm-6 form-group">
  <label for="dni">DNI</label>
  <input type="text"
    class="form-control"
    id="dni"
    ng-model="$ctrl.patient.dni"
  />
</div>
<div class="col-sm-6 form-group">
  <label for="name">Name</label>
  <input type="text"
   class="form-control"
   id="name"
   ng-model="$ctrl.patient.name"
   />
</div>
<div class="col-xs-12 form-group">
  <label>Appointment info</label>
</div>
<div class="col-md-6 col-lg-3 form-group">
  <label for="date">Date</label>
  <input type="date"
  class="form-control"
  id="date"
  ng-model="$ctrl.patient.date"
  />
</div>
<div class="col-md-6 col-lg-3 form-group">
  <label for="time">Time</label>
  <input type="time"
  class="form-control"
  id="time"
  ng-model="$ctrl.patient.time"
  />
```

Now let's jump into feeding dropdown like entries.

```html
<div class="col-md-6 col-lg-3 form-group">
  <label for="specialty">Specialty</label>
  <select id="specialty"
    class="form-control"
    ng-model="$ctrl.patient.specialty"
    >
    <option ng-repeat="option in $ctrl.specialties" ng-value="option">{{option}}</option>
  </select>
</div>
<div class="col-md-6 col-lg-3 form-group">
  <label for="doctor">Doctor</label>
  <select id="doctor"
    class="form-control"
    ng-model="$ctrl.patient.doctor"
    >
   <option ng-repeat="option in $ctrl.doctors" ng-value="option">{{option}}</option>
  </select>
</div>
```

Let's add an implementation for the save button:

For this sample we will just dump the updated entity into the console log in order
to do that we have to request angular IOC for the $log service

```
public static $inject: Array<string> = ['PatientAPI', '$stateParams', '$log'];

constructor(patientAPI : PatientAPI,
           $stateParams : angular.ui.IStateParamsService,
           private $log : angular.ILogService) {
```


```
save() {
  this.$log.log(this.patient);
}
```

And let's bind it to the button click event

```
<button type="button" class="btn btn-success"ng-click="$ctrl.save()">Guardar</button>
```
