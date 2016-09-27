import * as angular from 'angular';

class PatientController {
  sampleBinding : string;

  constructor() {
    this.sampleBinding = "Hello from Patient";
  }
}

export const patient = {
  template: `
      <h1>Bindings test: {{$ctrl.sampleBinding}}</h1>      
  `,
  controller: PatientController
}
