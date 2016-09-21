# 03 List Page

In this sample we are going to build up the appointments page. This will include
creating the entities, creating a fake api (to simulate we are hitting a remote
  server), creating the layout, plus the ui interaction.

We are going to take as startup point _02 Navigation_

# Summary steps:

- Import bootstrap libraries.
- Create the searchPatient component (dummy).
- Create the listComponent.

- Add mock data plus copy to dev.
- Create entities.
- Create api.


# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample "02 Navigation"

## Steps

### Style

Before getting started building the app, let's install bootstrap and jquery, we will
use bootstrap as a base to generate the layout.

```
npm install jquery --save
npm install bootstrap --save
```
In webpack.config.js:




We will just use a plugin to expose "$" (jquery) and "JQuery"
as global names.

```javascript
plugins: [
   // ...
   //Expose jquery used by bootstrap
   new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery"
   })
 ]
}
```
And let's add bootstrap.css to the styles array to be processed by webpack (webpack.config.js)

```javascript
entry: {
  // (...)
  styles: [
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    './css/site.css'
  ],
  // (...)
},
```

Bootstrap will expose glyphicons and other features, let's expose the right loaders
for this.

First we will install file-loader package

```
npm install file-loader --save-dev
npm install url-loader --save-dev
```
We need to indicate that we will use bootstrap javascript:

```javascript
entry: {
  // ...
  vendor: [
    'bootstrap'
  ]
},
```

On the CSS loader section, we have to remove the exclude "node_modules" folder

```javascript
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style','css')
},
```

Then we will configure the loader for fonts / images.

```javacript
loaders: [
      // (...)
      //Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      {
        test: /\.png$/,
        loader: 'file?limit=0&name=[path][name].[hash].',
        exclude: /node_modules/
      }
    ]
  },
```

### Layout

Let's start by creating two separate child components one for
the search panel, and another one for the list panel.

```javascript
import * as angular from 'angular';

class SearchPatientController {
  constructor() {
  }
}

export const searchPatient = {
  template:
  `
  <div class="well">
     <div class="row">
       <div class="col-xs-12">
         <span class="col-xs-1 glyphicon glyphicon-search"></span>
         <p class="col-xs-9">Buscar paciente</p>
         <span class="collapse-toggle pull-right glyphicon glyphicon-collapse-down" data-toggle="collapse"
           data-target="#search-form">
         </span>
       </div>
       <form id="search-form" class="collapse">
         <div class="col-xs-6 form-group">
           <label for="date">Fecha</label>
           <input type="date" class="form-control" id="date"/>
         </div>
         <div class="col-xs-6 form-group">
           <label for="time">Hora</label>
           <input type="time" class="form-control" id="time"/>
         </div>
         <div class="col-xs-12 form-group">
           <select class="form-control">
           </select>
         </div>
         <div class="col-xs-12 form-group">
           <label for="doctor">Doctor</label>
           <input type="text" class="form-control" id="doctor"/>
         </div>
         <div class="col-xs-offset-10 col-xs-2 form-group">
           <div class="pull-right">
             <button class="btn btn-primary">Buscar</button>
           </div>
         </div>
       </form>
     </div>
   </div>
  `,
  controller: SearchPatientController
}
```

We have to register this component at app level _src/index.ts_

```javascript
import {searchPatient} from './components/patients/searchPatient';

// (...)

app.component('searchPatient', searchPatient);
```

Let's use this component in the _patients_ page.

```javascript
import * as angular from 'angular';

class PatientsController {
  constructor() {

  }
}

export const patients = {
  template: `
    <div class="container-fluid">
      <div class="row">
        <search-patient class="col-md-4"></search-patient>  
      </div>
    </div>
  `,
  controller: PatientsController
}
```

Let's do a quick test and check that the component is properly displayed:

```
npm start
```

Great ! we get the panel displayed, let's draw the second component
(list result).

Let's create a new component called _patientsList_ in the following path
src/components/patients/patientsList.ts

```javascript
import * as angular from 'angular';

class PatientsListController {
  constructor() {
  }
}

export const patientList = {
  template:
  `
  <div class="well">
     <div class="row">
       <div class="col-xs-offset-11 col-xs-1">
         <div class="pull-right">
           <span class="glyphicon glyphicon-plus-sign"></span>
         </div>
       </div>
     </div>
     <div class="row">
       <table class="col-xs-12 table table-striped table-bordered">
         <thead>
           <tr>
             <th class="hidden-xs hidden-sm hidden-md">DNI</th>
             <th>Paciente</th>
             <th>Especialidad</th>
             <th class="hidden-xs hidden-sm hidden-md">Doctor</th>
             <th class="hidden-xs">Cita</th>
             <th class="hidden-xs">Hora</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td class="hidden-xs hidden-sm hidden-md">{{p.dni}}</td>
             <td>Sample Name</td>
             <td>
               Sample Specialty
               <span class="hidden-sm hidden-md hidden-lg pull-right glyphicon glyphicon-pencil"
                 >
               </span>
             </td>
             <td class="hidden-xs hidden-sm hidden-md">{{p.doctor}}</td>
             <td class="hidden-xs">{{p.date}}</td>
             <td class="hidden-xs">
               Sample Time
               <span class="pull-right glyphicon glyphicon-pencil"
                 >
               </span>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
  `,
  controller: PatientsListController
}
```

Let's register this component in the index.ts

```javascript
import {patientsList} from './components/patients/patientsList';

app.component('patientsList', patientsList);
```


Let's use it in our patients component:

```javascript
export const patients = {
  template: `
    <div class="container-fluid">
      <div class="row">
        <search-patient class="col-md-4"></search-patient>
         <patients-list class="col-md-8"></patients-list>
      </div>
    </div>
  `,
  controller: PatientsController
}
```

### Data

Let's create a mock json file under the "MockDataFolder" let's call it _patients.json

```json
{
  [
    {
      "id": 1,
      "dni": "1234567A",
      "name": "John Doe",
      "specialty": "Traumatología",
      "doctor": "Karl J. Linville",
      "date": "19/09/2019",
      "time": "08:30"
    },
    {
      "id": 2,
      "dni": "5067254B",
      "name": "Anna S. Batiste",
      "specialty": "Cirugía",
      "doctor": "Gladys C. Horton",
      "date": "19/09/2019",
      "time": "09:00"
    },
    {
      "id": 3,
      "dni": "1902045C",
      "name": "Octavia L. Hilton",
      "specialty": "Traumatología",
      "doctor": "Karl J. Linville",
      "date": "19/09/2019",
      "time": "09:30"
    },
    {
      "id": 4,
      "dni": "1880514D",
      "name": "Tony M. Herrera",
      "specialty": "Oftalmología",
      "doctor": "Ruthie A. Nemeth",
      "date": "19/09/2019",
      "time": "10:00"
    },
    {
      "id": 5,
      "dni": "6810774E",
      "name": "Robert J. Macias",
      "specialty": "Cirugía",
      "doctor": "Gladys C. Horton",
      "date": "19/09/2019",
      "time": "10:30"
    }
  ]
}
```

We need to copy this mock data to the folder where the dev server is going to run,
in order to do this we are going to use _copy_webpack_plugin, let's install it

```
npm install copy-webpack-plugin --save-dev
```

Then in the _webpack.config.js_ file let's propery configure the plugin:

```javascript
plugins: [
  /// (...)
  new CopyWebpackPlugin([
    { from: 'mockData/*'},
  ])
]
```

Let's start by creating an entity called _Patient_ that will hold info about the patient and a medical appointment,
we will place this file under _/src/model/patient.ts_

```javascript
export class Patient {
  id: number;
  dni: string;
  name: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
}
```

Now we need to create some mock data, let's create it under
the following full path _/src_/api/mockData.ts

```javascript
import { Patient } from '../model/patient';

const patientsMockData: Array<Patient> = [
  { id: 1, dni: "1234567A", name: "John Doe", specialty: "Traumatología", doctor: "Karl J. Linville", date: "19/09/2019", time: "08:30" },
  { id: 2, dni: "5067254B", name: "Anna S. Batiste", specialty: "Cirugía", doctor: "Gladys C. Horton", date: "19/09/2019", time: "09:00" },
  { id: 3, dni: "1902045C", name: "Octavia L. Hilton", specialty: "Traumatología", doctor: "Karl J. Linville", date: "19/09/2019", time: "09:30" },
  { id: 4, dni: "1880514D", name: "Tony M. Herrera", specialty: "Oftalmología", doctor: "Ruthie A. Nemeth", date: "19/09/2019", time: "10:00" },
  { id: 5, dni: "6810774E", name: "Robert J. Macias", specialty: "Cirugía", doctor: "Gladys C. Horton", date: "19/09/2019", time: "10:30" }
];

const specialtiesMockData: Array<string> = [
  "Cirugía",
  "Traumatología",
  "Oftalmología"
];

export {
  patientsMockData,
  specialtiesMockData
}
```

And to end up with the client data layer, we will create a fake api (promise based) that will expose methods load the list of
appointments plus specialties.

```javascript
import { Patient } from '../model/patient';

export class PatientAPI {
  public static $inject: Array<string> = ["$http"];

  private baseUrl: string = './mockData/patients.json';

  constructor(private $http : angular.IHttpService) {

  }

  getAllPatientsAsync(): Promise<Array<Patient>> {
    return this.$http.get(this.baseUrl).then(response => response.data);
  };
}
```

We need to register this service in the main app.

```javascript
import {PatientAPI} from './api/patientAPI';

app.service('PatientAPI', PatientAPI);
```

### Interaction

Now it's time to load the information about the patient's appointments in the
appointments table.

First of all let's import some needed name space (patients entitiy, plus
  patients data api) in our _patientsList.ts

```javascript
import {PatientAPI} from "../../api/patientAPI";
import {Patient} from '../../model/patient';
```

We are going to define a member variable that will hold a list of Patients,
and request the PatientsAPI service, then we will make the AJAX called
to dynamically load the list of patients (_patientsList.ts_).

```javascript
class PatientsListController {
  public static $inject: Array<string> = ["PatientAPI"];
  public patientsData : Array<Patient> = []

  constructor(patientAPI : PatientAPI) {
    patientAPI.getAllPatientsAsync().then((data) => {
      this.patientsData = data;
    }
  );
  }
}
```

Finally we are going to bind the list into the layout using an ng-repeat
and binding the fields to the given span.

```` html

```
