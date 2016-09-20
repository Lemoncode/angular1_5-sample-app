# 03 List Page

In this sample we are going to build up the appointments page. This will include
creating the entities, creating a fake api (to simulate we are hitting a remote
  server), creating the layout, plus the ui interaction.

We are going to take as startup point _02 Navigation_

# Summary steps:

- Create entities.
- Create api.
- Create Mock data.
- Import bootstrap libraries.
- Create the searchPatient component (dummy).
- Create the listComponent.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample "02 Navigation"

## Steps

### Style

Before getting started building the app, let's install bootstrap and jquery, we will
use bootstrap as a base to generate the layout.

```
npm install bootstrap
npm install jquery
```

### Data

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
import { patientsMockData, specialtiesMockData } from './mockData';

class PatientAPI {
  getAllPatientsAsync(): Promise<Array<Patient>> {
    let patientsPromise = new Promise((resolve, reject) => {
      resolve(patientsMockData);
    });

    return patientsPromise;
  };

  getAllSpecialtiesAsync(): Promise<Array<string>> {
    let specialtiesPromise = new Promise((resolve, reject) => {
      resolve(specialtiesMockData);
    });

    return specialtiesPromise;
  }
}

const patientAPI = new PatientAPI();

export {
  patientAPI
}
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
