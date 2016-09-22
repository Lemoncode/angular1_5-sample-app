function routing($locationProvider: ng.ILocationProvider,
                $stateProvider: angular.ui.IStateProvider,
                $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    // html5 removes the need for # in URL
    $locationProvider.html5Mode({
        enabled: false
    });

    $stateProvider.state('home', <ng.ui.IState>{
        url: '/home',
        views: {
            'content@': { template: '<login></login>' }
        }
      }
    );

    $stateProvider.state('patients', <ng.ui.IState>{
        url: '/patients',
        views: {
            'content@': { template: '<patients></patients>' }
        }
      }
    );

    $stateProvider.state('patient', <ng.ui.IState>{
        url: '/patient',
        views: {
            'content@': { template: '<patient></patient>' }
        }
      }
    );

    $stateProvider.state('patientEdit', <ng.ui.IState>{
        url: '/patient/{patientId:[0-9]{1,8}}',
        views: {
            'content@': { template: '<patient></patient>' }
        }
      }
    );


    $urlRouterProvider.otherwise('/home');
}

export default routing;
