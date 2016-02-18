angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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
.controller('RewardsDetailCtrl', function($scope, $stateParams, RewardsService) {
	//console.log($scope.rewards);
	$scope.reward = RewardsService.get({ id: $stateParams.id }, function() {
   
  });
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
