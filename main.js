var foodieApp = angular.module('foodieApp', ['ngRoute']);
console.log(foodieApp);
var list;
foodieApp.controller('loginController', function($scope, $location) {
	$scope.goToHome = function() {
		$location.url('home')
	}
})
foodieApp.controller('restaurantController', function($scope, $routeParams, $http) {
	$scope.restaurantId = $routeParams.id;
	var restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg',
		bestDish: {
			name: 'Corn Pizza',
			image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
		}
	}, {
		name: 'Pirates',
		address: '38/39, Level 10, Block F , Inner Circle, Corol bagh',
		location: 'Connaught Place',
		category: 'Bakery',
		vote: '4.4',
		cuisines: 'Desert',
		cost: '200',
		hours: '12 Noon to 10 PM (Mon-Sun)',
		image: 'https://tobuz.com/wp-content/uploads/2016/12/sweet-tooth-fairy-bakery-5.jpg'
	}]
				$scope.x = 0;
				$scope.toggle=function(){
   			$scope.x = 1-$scope.x;
				console.log($scope.x);
				}
	$scope.restaurant = restaurants[$routeParams.id - 1];
	$scope.getIngredients = function(url) {
		var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
		$http({
			'method': 'POST',
			'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
			'headers': {
				'Authorization': 'Key d4aa0fd8f7c94d9a85f0eaddf27c4deb',
				'Content-Type': 'application/json'
			},
			'data': data
		}).then(function(response) {
			var ingredients = response.data.outputs[0].data.concepts;
			$scope.ingredients = [];
			for (var i = 0; i < ingredients.length; i++) {
				$scope.ingredients.push(ingredients[i].name);
			}
			list = $scope.ingredients;
			// $('.ingredients').html(list);
		}, function(xhr) {
			console.log(xhr);
		})


	}

})
foodieApp.controller('mainController', function($scope) {
	$scope.restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg',
		id: 1
	}, {
		name: 'Pirates',
		address: '38/39, Level 10, Block F , Inner Circle, Corol bagh',
		location: 'Connaught Place',
		category: 'Bakery',
		vote: '4.4',
		cuisines: 'Desert',
		cost: '200',
		hours: '12 Noon to 10 PM (Mon-Sun)',
		image: 'https://tobuz.com/wp-content/uploads/2016/12/sweet-tooth-fairy-bakery-5.jpg',
		id: 2
	}];
console.log($scope.restaurants[0].name);
$scope.change = function(){
$scope.restaurants.push({
	name: 'Pirates',
	address: '38/39, Level 10, Block F , Inner Circle, Corol bagh',
	location: 'Connaught Place',
	category: 'Bakery',
	vote: '4.4',
	cuisines: 'Desert',
	cost: '200',
	hours: '12 Noon to 10 PM (Mon-Sun)',
	image: 'https://tobuz.com/wp-content/uploads/2016/12/sweet-tooth-fairy-bakery-5.jpg',
	id: 2
});

console.log($scope);
console.log($scope.$parent.restaurants);

}

})
// Controller for todolist page
foodieApp.controller("todo", function($scope) {
			$scope.list = list;
			$scope.x=1;
			console.log(list);
			$scope.grocery = [];
			//I need to create an array of object because we will need this for keeping track of which has been bought and which not
			for (var i = 0; i < list.length; i++) {
				var a = {
					id: i,
					name: list[i],
					buy: false
				};
				$scope.grocery.push(a);
			}
			console.log($scope);
			$scope.bought = [];
			$scope.nbought = [];
			$scope.see = function() {
				console.log($scope);
				$scope.grocery[19].buy = "ksakdjjjjad";
			}
			$scope.toggle = function(num) {
				// we need to change value dependin
				$scope.grocery[num].buy = !$scope.grocery[num].buy;
				$scope.$parent.grocery[num].buy = !$scope.$parent.grocery[num].buy

			}
			$scope.one =function(){

				$scope.x=1;

			}
			$scope.two =function(){

				$scope.x=2;

			}
			$scope.three =function(){

				$scope.x=3;

			}
			$scope.filter = function() {
$scope.bought=[];
$scope.nbought=[];
				for (var i = 0; i < $scope.grocery.length; i++) {
					if ($scope.grocery[i].buy) {
						$scope.bought.push($scope.grocery[i]);
					} else {
						$scope.nbought.push($scope.grocery[i]);
					}
				}

				console.log($scope.bought);
			}


})
foodieApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	}).when('/home', {
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	}).when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	}).when('/todolist', {
		templateUrl: 'pages/todo.html',
		controller: 'todo'
	})
})
