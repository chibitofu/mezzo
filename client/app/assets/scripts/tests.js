//Todo testing object//
  $http.get('app/assets/files/test_files/todo_test.json')
  .success(function(data){
    $scope.expedia = data.thingsToDo;
  });

//Tags testing object//
  $http.get('app/assets/files/test_files/tags_test.json')
  .success(function(data){
    $scope.instagram = data.tags;
  });

//Weather testing object//
  $http.get('app/assets/files/test_files/weather_test.json')
  .success(function(data){
    $scope.weather = data.weather;
  });

//Alchemy testing object//
  $http.get('app/assets/files/test_files/alchemy_test.json')
  .success(function(data){
    $scope.alchemy = data.articles.result.docs;
  });

//Google places restaurants testing object//
  $http.get('app/assets/files/test_files/restaurants_test.json')
  .success(function(data){
    $scope.restuarants = data.restaurants.results;
  });
