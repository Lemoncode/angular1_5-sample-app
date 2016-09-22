import { Patient } from '../model/patient';

export class PatientAPI {
  public static $inject: Array<string> = ["$http"];

  private baseUrl: string = './mockData/patients.json';

  constructor(private $http : angular.IHttpService) {

  }

  getAllPatientsAsync(): Promise<Array<Patient>> {
    return this.$http.get(this.baseUrl).then(response => response.data);
  };

  getPatientById(id: number) : Promise<Patient> {
     const promise = new Promise(
       (resolve, reject) => {
         this.getAllPatientsAsync().then((patients) => {
              // refine this later one
              const nonTypedPatient = patients.filter(
                (patient) => {
                  return (patient.id == id);
                }
              )[0];

              const patient : Patient = nonTypedPatient;

              resolve(patient);
         })
       }
     )
     return promise;
  }

}
