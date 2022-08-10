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
        })
        .when('/about', {
            templateUrl: 'about.html',
            controller: "",
        })
        .when('/contact', {
            templateUrl: 'contact.html',
            controller: "",
        });
});

// Config
app.controller("loginController", function ($scope, $location, $http) {
    $scope.scrolllogin = function (event) {
        event.preventDefault();
        const element = document.getElementById("loginform");
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
                    let caseErr = true;
                    switch ($scope.type) {
                        case 1:
                            // get data from json
                            if (Array.isArray(success.data)) {
                                for (i = 0; i < success.data.length; i++) {
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
                            if (caseErr == false) {
                                alert("khong khop");
                            };
                            break;
                        case 2:
                            // get data from json
                            if (Array.isArray(success.data)) {
                                for (i = 0; i < success.data.length; i++) {
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
                            if (caseErr == false) {
                                alert("khong khop");
                            };
                            break;
                        case 3:
                            // get data from json
                            if (Array.isArray(success.data)) {
                                for (i = 0; i < success.data.length; i++) {
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
                            if (caseErr == false) {
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
    if (!localStorage['user']) {
        $location.path('/');
    };
});

app.controller("teacherController", function ($scope, $location, $http) {
    if (!localStorage['user']) {
        $location.path('/');
    };
    $http.get("json/students.json")
        .then(function (res) {
            // all data 
            $scope.liststudent = res.data;
            // length data
            var length = $scope.liststudent.length;
            // get data localstorage
            var check = JSON.parse(window.localStorage.getItem('user'));
            // new list
            $scope.list = [];
            for (i = 0; i < length; i++) {
                if ($scope.liststudent[i]['teachername'] === check['teachername']) {
                    $scope.list.push($scope.liststudent[i]);
                }
            }
        });

    $scope.edit = function (index) {
        $scope.name = $scope.list[index]['name'];
        $scope.math = $scope.list[index]['mark']['math'];
        $scope.physic = $scope.list[index]['mark']['physic'];
        $scope.chemist = $scope.list[index]['mark']['chemist'];
        $scope.parents = $scope.list[index]['parents'];
        $scope.progress = $scope.list[index]['progress'];
        $scope.teachername = $scope.list[index]['teachername'];
        $scope.index = index ;

    };
    $scope.save = function () {
        var index = $scope.index ;
        $scope.list[index]['name'] = $scope.name;
        $scope.list[index]['mark']['math'] = $scope.math;
        $scope.list[index]['mark']['physic'] = $scope.physic;
        $scope.list[index]['mark']['chemist'] = $scope.chemist;
        $scope.list[index]['parents'] = $scope.parents;
        $scope.list[index]['progress'] = $scope.progress;
        $scope.list[index]['teachername'] = $scope.teachername;

    };
    $scope.del = function (index) {
        $scope.list.splice(index,1);
    }
});

app.controller("parentController", function ($scope, $location) {
    if (!localStorage['user']) {
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