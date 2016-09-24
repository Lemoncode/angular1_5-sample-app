import * as angular from 'angular';
import {PatientAPI} from "../../api/patientAPI";
import {Patient} from '../../model/patient';

class PatientController {
  public static $inject: Array<string> = ['PatientAPI', '$stateParams', '$log'];
  public patient : Patient = null;
  public specialties : Array<string>;
  public doctors : Array<string>;

  constructor(patientAPI : PatientAPI,
             $stateParams : angular.ui.IStateParamsService,
             private $log : angular.ILogService) {
    const patientId : number = $stateParams['patientId'];

    patientAPI.getPatientById(patientId).then((data) => {
      this.patient = data;
    });

    // TODO: We could load this info form a service
    // and use id / value
    this.specialties = ['Traumatology', 'Surgery', 'Ophthalmology']
    this.doctors = ['Karl J. Linville', 'Gladys C. Horton','Ruthie A. Nemeth']
    // More info about how to bind combo's / lists...
    // https://docs.angularjs.org/api/ng/directive/select
    // https://docs.angularjs.org/api/ng/directive/ngOptions
  }

  save() {
    this.$log.log(this.patient);
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
          <form id="edit-patient-form" name="editPatientForm">
            <div class="col-xs-12 form-group">
              <label>Datos Paciente</label>
            </div>
            <div class="col-sm-6 form-group">
              <label for="dni">DNI</label>
              <input type="text"
                class="form-control"
                name="dni"
                id="dni"
                ng-model="$ctrl.patient.dni"
                ng-required="true"
                validate-dni=""
              />
              <div ng-messages="editPatientForm.dni.$error" style="color:maroon" role="alert">
                 <div ng-message="required">You did not enter a field</div>
                 <div ng-message="validateDni">DNI not valid</div>
             </div>

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
            <div class="col-xs-offset-10 col-xs-2 form-group">
              <div class="pull-right">
                <button
                  type="button"
                  class="btn btn-success"
                  ng-click="$ctrl.save()"
                  ng-disabled="editPatientForm.$invalid"
                  >
                Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  `,
  controller: PatientController
}
