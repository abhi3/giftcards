// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic','ngResource','ngCordova', 'starter.controllers', 'starter.services'])

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
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
})
.directive('myclick', function() {
        return function(scope, element, attrs) {
            element.bind('touchstart click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                if (event.type === 'click') {
                    scope.$apply(attrs['myclick']);
                }
            });
        };
    })

.config(function($stateProvider, $urlRouterProvider,USER_ROLES) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.rewards', {
      url: '/rewards',
      views: {
        'tab-rewards': {
          templateUrl: 'templates/tab-rewards.html',
          controller: 'RewardsCtrl'
        }
      }
    })
	.state('tab.reward-detail', {
      url: '/rewards/:id',
      views: {
        'tab-rewards': {
          templateUrl: 'templates/tab-reward.html',
          controller: 'RewardsDetailCtrl'
        }
      }
    })

	.state('tab.offers', {
      url: '/offers',
      views: {
        'tab-offers': {
          templateUrl: 'templates/tab-offers.html',
          controller: 'OffersCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
   //$urlRouterProvider.otherwise('/tab/dash');
	$urlRouterProvider.otherwise(function ($injector, $location) {
		var $state = $injector.get("$state");
		$state.go("tab.dash");
	});

});
