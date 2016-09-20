import * as angular from 'angular';

class PatientsListController {
  constructor() {
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
             <th>Paciente</th>
             <th>Especialidad</th>
             <th class="hidden-xs hidden-sm hidden-md">Doctor</th>
             <th class="hidden-xs">Cita</th>
             <th class="hidden-xs">Hora</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td class="hidden-xs hidden-sm hidden-md">Sample DNI</td>
             <td>Sample Name</td>
             <td>
               Sample Specialty
               <span class="hidden-sm hidden-md hidden-lg pull-right glyphicon glyphicon-pencil"
                 >
               </span>
             </td>
             <td class="hidden-xs hidden-sm hidden-md">Sample Doctor</td>
             <td class="hidden-xs">Sample Date</td>
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
