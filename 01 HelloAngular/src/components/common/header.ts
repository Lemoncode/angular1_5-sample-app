import * as angular from 'angular';

class HeaderController {
  sampleBinding : string;

  constructor() {
    this.sampleBinding = "Testing binding header component";
  }
}

export const header = {
  template: '<h1>Header testing bindings: {{$ctrl.sampleBinding}}',
  controller: HeaderController
}
