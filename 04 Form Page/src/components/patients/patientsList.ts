import * as angular from 'angular';
import {PatientAPI} from "../../api/patientAPI";
import {Patient} from '../../model/patient';

class PatientsListController {
  public static $inject: Array<string> = ["PatientAPI"];
  public patients : Array<Patient> = []

  constructor(patientAPI : PatientAPI) {
    patientAPI.getAllPatientsAsync().then((data) => {
      this.patients = data;
    }
  );
  }
}

export const patientsList = {
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
             <th>Patient</th>
             <th>Specialty</th>
             <th class="hidden-xs hidden-sm hidden-md">Doctor</th>
             <th class="hidden-xs">Cita</th>
             <th class="hidden-xs">Hora</th>
           </tr>
         </thead>
         <tbody>
           <tr ng-repeat="patient in $ctrl.patients">
             <td class="hidden-xs hidden-sm hidden-md">{{patient.dni}}</td>
             <td>{{patient.name}}</td>
             <td>
               {{patient.specialty}}
               <span class="hidden-sm hidden-md hidden-lg pull-right glyphicon glyphicon-pencil"
                 >
               </span>
             </td>
             <td class="hidden-xs hidden-sm hidden-md">{{patient.doctor}}</td>
             <td class="hidden-xs">{{patient.date}}</td>
             <td class="hidden-xs">
               {{patient.time}}
               <a ui-sref="patientEdit({patientId: {{patient.id}}})">
               <span class="pull-right glyphicon glyphicon-pencil"
                 >
               </span>
               </a>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
  `,
  controller: PatientsListController
}
