angular.module('oldbook', ['ionic', 'ngStorage', 'oldbook.controllers', 'oldbook.services'])
    .constant('urls', {
        BASE: 'http://104.199.159.209:8080/',
        /*BASE: 'http://localhost:8080/',*/
        BASE_API: 'http://104.155.198.134:8000/'
    })
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

.config(function($stateProvider, $httpProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.navBar.alignTitle("center");

    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back');

    //tabs position
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.tabs.style("standard");

    $stateProvider

    //Login
        .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    //Sign Up
    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
    })

    //Forget password
    .state('fpassword', {
        url: '/fpassword',
        templateUrl: 'templates/forget-password.html',
        controller: 'fpasswordCtrl'
    })


    /*
        .state('sidenav', {
            url : '/sidenav',
            templateUrl : 'templates/side-nav.html',
            abstract : true,
            controller : 'sideNavCtrl'
        })
    */

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'tabCtrl'
    })

    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'homeCtrl'
            }
        }
    })

    .state('tab.fav', {
        url: '/fav',
        views: {
            'tab-fav': {
                templateUrl: 'templates/tab-fav.html',
                controller: 'favCtrl'
            }
        }
    })

    .state('tab.search', {
        url: '/search',
        views: {
            'tab-search': {
                templateUrl: 'templates/tab-search.html',
                controller: 'searchCtrl'
            }
        }
    })

    .state('tab.settings', {
        url: '/settings',
        views: {
            'tab-settings': {
                templateUrl: 'templates/tab-settings.html',
                controller: 'settingsCtrl'
            }
        }
    })

    //My History
    .state('tab.history', {
        url: '/history',
        views: {
            'tab-settings': {
                templateUrl: 'templates/history.html',
                controller: 'historyCtrl'
            }
        }

    })

    //Change Password
    .state('tab.chnPwd', {
        url: '/chnPwd',
        views: {
            'tab-settings': {
                templateUrl: 'templates/change-password.html',
                controller: 'chnPwdCtrl'
            }
        }
    })

    //Post a Book
    .state('tab.postBook', {
        url: '/postBook',
        views: {
            'tab-search': {
                templateUrl: 'templates/post-book.html',
                controller: 'postBookCtrl'
            }
        }
    })

    //Request a Book
    .state('tab.requestBook', {
        url: '/requestBook',
        views: {
            'tab-search': {
                templateUrl: 'templates/request-book.html',
                controller: 'requestBookCtrl'
            }
        }
    })

    //Book Details
    .state('tab.bookDetails', {
        url: '/bookDetails/:bookId',
        views: {
            'tab-home': {
                templateUrl: 'templates/book-details.html',
                controller: 'homeCtrl'
            }
        }
    });


    /*$urlRouterProvider.otherwise('/tab/fav');*/
    $urlRouterProvider.otherwise('login');


    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                    delete $localStorage.token;
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);

});
