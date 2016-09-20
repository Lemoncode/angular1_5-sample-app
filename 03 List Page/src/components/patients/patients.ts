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
