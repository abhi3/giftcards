angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
      function(result) {
        $scope.response = result;
      });
  };

  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };

  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
console.log("in Ctrl");
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('RewardsCtrl',function($scope, RewardsService){

	 $scope.rewards = RewardsService.query();

 // var entry = RewardsService.get({ id: $scope.id }, function() {
 //   console.log(RewardsService);
 // }); // get() returns a single RewardsService

 // var entries = RewardsService.query(function() {
 //   console.log(entries);
 // }); //query() returns all the entries

 // $scope.RewardsService = new RewardsService(); //You can instantiate resource class

 // $scope.RewardsService.data = 'some data';

 // RewardsService.save($scope.RewardsService, function() {
    //data saved. do something here.
 // }); //saves an RewardsService. Assuming $scope.RewardsService is the RewardsService object
})
.controller('RewardsDetailCtrl', function($scope, $stateParams,$ionicPopup,$state, RewardsService,RewardTransactionService) {
	//console.log($scope.rewards);
	$scope.reward = RewardsService.get({ id: $stateParams.id }, function() {

  });
  // Called when the form is submitted
  $scope.requestReward = function(reward) {
   // $scope.reward.push({
   //   title: task.title
   // });
  //  $scope.taskModal.hide();
   // task.title = "";

   RewardTransactionService.save({
	   reward:reward.id,
	   status:"pending",
	   email:reward.email

   },function() {

		 $ionicPopup.alert({title: 'Requested !'
				}).then(function(res) {
					console.log("in then");
						$state.go('tab.rewards');

				});
		}   // An alert dialog
	);



   console.log(reward);
  };
})

.controller('OffersCtrl',function($scope, OffersService){

	 $scope.Offers = OffersService.query();
})
.controller('OfferCtrl',function($scope,$cordovaInAppBrowser){
	$scope.offerHandler = function(){
  //  console.log($event.target);
		var url='http://google.com';
		var target = "_blank";
    console.log(guid());

		 var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes',
      closebuttoncaption: 'DONE?'
    };

		var inAppBrowserRef = $cordovaInAppBrowser.open(url, target, options);
      console.log(inAppBrowserRef);
	};

})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})
.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};
var locked = false;
  $scope.login = function(data) {
    if (locked != false) {
      return;
    }
    locked = true;
    setTimeout(function(){ locked = false; }, 50);
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})
;
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
