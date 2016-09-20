import * as angular from 'angular';

class PatientController {
  sampleBinding : string;

  constructor() {
    this.sampleBinding = "Hello from Patient";
  }
}

export const patient = {
  template: `
      <span>Bindings test: {{$ctrl.sampleBinding}}</h1>      
  `,
  controller: PatientController
}
