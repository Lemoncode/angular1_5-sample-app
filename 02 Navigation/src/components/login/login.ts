import * as angular from 'angular';

class LoginController {
  sampleBinding : string;

  constructor() {
    this.sampleBinding = "Hello from Login";
  }
}

export const login = {
  template: `
    <h1>bindings test: {{$ctrl.sampleBinding}}</h1>
    <a ui-sref="patients">Navigate to patients</a>
  `,
  controller: LoginController
}
