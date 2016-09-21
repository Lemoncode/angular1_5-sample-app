import { Patient } from '../model/patient';

export class PatientAPI {
  public static $inject: Array<string> = ["$http"];

  private baseUrl: string = './mockData/patients.json';

  constructor(private $http : angular.IHttpService) {

  }

  getAllPatientsAsync(): Promise<Array<Patient>> {
    return this.$http.get(this.baseUrl).then(response => response.data);
  };
}
