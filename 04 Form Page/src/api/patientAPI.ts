import { Patient } from '../model/patient';

export class PatientAPI {
  public static $inject: Array<string> = ['$http', '$q'];

  private baseUrl: string = './mockData/patients.json';

  constructor(private $http : angular.IHttpService, private $q : angular.IQService) {

  }

  getAllPatientsAsync(): Promise<Array<Patient>> {
    return this.$http.get(this.baseUrl).then(response => response.data);
  };

  getPatientById(id: number) : Promise<Patient> {
    const defer = this.$q.defer();

    this.getAllPatientsAsync().then((patients) => {
          // refine this later one
          const nonTypedPatient = patients.filter(
            (patient) => {
              return (patient.id == id);
            }
          )[0];

          const patient : Patient = nonTypedPatient;

          // Mapping should be placed in a separate map
          patient.date = new Date(nonTypedPatient.date);
          patient.time = new Date(nonTypedPatient.time)

          defer.resolve(patient);
     });

     return defer.promise;
  }

}
