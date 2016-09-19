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

    $urlRouterProvider.otherwise('/home');
}

export default routing;
