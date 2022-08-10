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
    $scope.scrolllogin = function(event){
        event.preventDefault();
        const element = document.getElementById("loginform");
        console.log(element);
        element.scrollIntoView();
    }
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
                                        caseErr = true;
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
                                        caseErr = true;
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
                                        caseErr = true;
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

app.controller("studentController", function ($scope, $location) {
    if(!localStorage['user']){
        $location.path('/');
    };
});

app.controller("teacherController", function ($scope, $location , $http) {
    if(!localStorage['user']){
        $location.path('/');
    };
    $http.get("json/students.json")
        .then(function(res){
            $scope.liststudent = res.data ;
            var length = $scope.liststudent.length ;
            console.log(length);
            var check = JSON.parse(window.localStorage.getItem('user'));
            console.log(check['teachername']);
            $scope.list = [] ;
            for(i=0 ; i < length ; i++){
                if($scope.liststudent[i]['teachername'] == check['teachername']){
                    $scope.list[i] = $scope.liststudent[i] ;
                }
            }
        });
});

app.controller("parentController", function ($scope, $location) {
    if(!localStorage['user']){
        $location.path('/');
    };
});

app.directive('header', function () {
    return {
        restrict: 'EAC',
        templateUrl: 'header.html'
    };
});

app.directive('footer', function () {
    return {
        restrict: 'EAC',
        templateUrl: 'footer.html'
    };
});