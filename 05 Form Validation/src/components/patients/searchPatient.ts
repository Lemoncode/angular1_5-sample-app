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
