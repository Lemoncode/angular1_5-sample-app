import * as angular from 'angular';

class PatientController {

  constructor() {
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
  `,
  controller: PatientController
}
