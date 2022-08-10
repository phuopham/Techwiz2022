var app = angular.module('myApp', ['ngRoute']);

// Config Route AngularJS
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'landingpage.html',
            controller: "loginController",
        })
        .when('/student', {
            templateUrl: 'student.html',
            controller: "studentController",
        })
        .when('/teacher', {
            templateUrl: 'teacher.html',
            controller: "teacherController",
        })
        .when('/parent', {
            templateUrl: 'parent.html',
            controller: "parentController",
        });
});

// Config
app.controller("loginController", function ($scope, $location,$http) {
    $scope.errMessage = "";
    $scope.handleLogin = function () {
        $http({
            method: 'GET',
            url: '/json/students.json',
            headers: {
                'Content-Type': 'application/json'
            } // optional
        })
            .then(
                function (success) {
                    console.log(success);
                    // do something when success
                },
                function (error) {
                    // do something when error
                }
            );
        if ($scope.name == "nam") {
            console.log($scope.type);

            switch ($scope.type) {
                case '1':
                // get data from json

                // alert("Login Success!\nRedirecting to the next page...");
                // $location.path('/student');
                case '2':
                    alert("Login Success!\nRedirecting to the next page...");
                    $location.path('/teacher');
                case '3':
                    alert("Login Success!\nRedirecting to the next page...");
                    $location.path('/parent');
            };

        } else {
            alert("Login Fail!\nInvalid studentname or id");
        };
    }
});

app.controller("studentController", function ($scope) {

});

app.controller("studentController", function ($scope) {

});

app.controller("studentController", function ($scope) {

});