import * as angular from 'angular';

class LoginController {
  sampleBinding : string;

  constructor() {
    this.sampleBinding = "Hello from Login";
  }
}

export const login = {
  template: '<h1>bindings test: {{$ctrl.sampleBinding}}</h1>',
  controller: LoginController
}
