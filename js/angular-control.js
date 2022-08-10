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
app.controller("loginController", function ($scope, $location, $http) {
    $scope.errMessage = "";
    $scope.handleLogin = function () {
        $http({
            method: 'GET',
            url: './json/students.json',
            headers: {
                'Content-Type': 'application/json'
            } // optional
        })
            .then(
                function (success) {
                    console.log(success);
                    // do something when success
                    // console.log(success.data);
                    console.log($scope.type);
                    switch ($scope.type) {
                        case 1:
                            // get data from json
                            if (Array.isArray(success.data)) {
                                success.data.forEach(element => {
                                    if ($scope.name == element.name) {
                                        alert("khop");
                                        // alert("Login Success!\nRedirecting to the next page...");
                                        // $location.path('/student');
                                    } else {
                                        alert("khong khop");
                                    };
                                });
                            };
                            break;
                        case 2:
                            alert("Login Success!\nRedirecting to the next page...");
                            $location.path('/teacher');
                            break;
                        case 3:
                            alert("Login Success!\nRedirecting to the next page...");
                            $location.path('/parent');
                            break;
                    };
                    // if ($scope.name == "nam") {

                    // } else {
                    //     alert("Login Fail!\nInvalid studentname or id");
                    // };
                },
                function (error) {
                    // do something when error
                }
            );
    };
});

app.controller("studentController", function ($scope) {

});

app.controller("studentController", function ($scope) {

});

app.controller("studentController", function ($scope) {

});