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

export const patient = {
  template: `
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
  `,
  controller: PatientController
}
