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
                    let caseErr = true;
                    switch ($scope.type) {
                        case 1:
                            // get data from json
                            if (Array.isArray(success.data)) {
                                for(i = 0; i < success.data.length; i++) {
                                    if ($scope.name == (success.data[i]).name) {
                                        localStorage.setItem('user', JSON.stringify(success.data[i]));
                                        alert("Login Success!\nRedirecting to the next page...");
                                        $location.path('/student');
                                        break;
                                    } else {
                                        caseErr = false;
                                    };
                                };
                            }; 
                            if(caseErr == false) {
                                alert("khong khop");
                            };
                            break;
                        case 2:
                            // get data from json
                            if (Array.isArray(success.data)) {
                                for(i = 0; i < success.data.length; i++) {
                                    if ($scope.name == (success.data[i]).teachername) {
                                        localStorage.setItem('user', JSON.stringify(success.data[i]));
                                        alert("Login Success!\nRedirecting to the next page...");
                                        $location.path('/teacher');
                                        break;
                                    } else {
                                        caseErr = false;
                                    };
                                };
                            }; 
                            if(caseErr == false) {
                                alert("khong khop");
                            };
                            break;
                        case 3:
                            // get data from json
                            if (Array.isArray(success.data)) {
                                for(i = 0; i < success.data.length; i++) {
                                    if ($scope.name == (success.data[i]).parents) {
                                        localStorage.setItem('user', JSON.stringify(success.data[i]));
                                        alert("Login Success!\nRedirecting to the next page...");
                                        $location.path('/parent');
                                        break;
                                    } else {
                                        caseErr = false;
                                    };
                                };
                            }; 
                            if(caseErr == false) {
                                alert("khong khop");
                            };
                            break;
                    };
                },
                function (error) {
                    // do something when error
                }
            );
    };
});

app.controller("studentController", function ($scope) {
    
});

app.controller("teacherController", function ($scope) {

});

app.controller("parentController", function ($scope) {

});