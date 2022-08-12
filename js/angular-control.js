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
            controller: "aboutController",
        })
        .when('/contact', {
            templateUrl: 'contact.html',
            controller: "contactController",
        });
});

// Config
app.controller("loginController", function ($scope, $location, $http) {
    $scope.scrolllogin = function (event) {
        event.preventDefault();
        const element = document.getElementById("welcome-mess");
        element.scrollIntoView();
    }
    $scope.errMessage = "";
    $scope.handleLogin = function () {
        if (!$scope.name || !$scope.type) {
            alert("eStudiez Name and Role can not empty");
        } else {
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
                                            window.scrollTo(0, 0);
                                            break;
                                        } else {
                                            caseErr = false;
                                        };
                                    };
                                };
                                if (caseErr == false) {
                                    alert("Can not find your eStudies' User");
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
                                            window.scrollTo(0, 0);
                                            break;
                                        } else {
                                            caseErr = false;
                                        };
                                    };
                                };
                                if (caseErr == false) {
                                    alert("Can not find your eStudies' User");
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
                                            window.scrollTo(0, 0);
                                            break;
                                        } else {
                                            caseErr = false;
                                        };
                                    };
                                };
                                if (caseErr == false) {
                                    alert("Can not find your eStudies' User");
                                };
                                break;
                        };
                    },
                    function (error) {
                        // do something when error
                    }
                );
        };
    };
});

app.controller("studentController", function ($scope, $location, $http, $window) {
    /**
     * Block Client Access with Log in
     */
    if (!localStorage['user']) {
        $location.path('/');
    };
    $scope.student = JSON.parse(window.localStorage.getItem('user'));
    let lst_mark_obj = $scope.student.mark;

    let lst_sbuject_name = Object.keys(lst_mark_obj);
    let lst_sbuject_mark = Object.values(lst_mark_obj);

    $scope.lst_subject = [];
    lst_sbuject_name.forEach(function (elm, index) {
        $scope.lst_subject.push({ 'name': elm, 'mark': lst_sbuject_mark[index] });
    });
    $scope.name = $scope.student['name'];
    $scope.progress = $scope.student['progress'];
    $http.get("json/revclass.json")
        .then(function (res) {
            $scope.revclass = res.data;
            $scope.teacher_revclass = $scope.student['teachername'];

            $scope.student_revclass = [];
            $scope.time_revclass = [];
            var length_revclass = $scope.revclass.length
            for (i = 0; i < length_revclass; i++) {
                if ($scope.revclass[i]['teacher'] == $scope.teacher_revclass) {
                    $scope.student_revclass.push($scope.revclass[i]['studentname']);
                    $scope.time_revclass.push($scope.revclass[i]['time']);
                }
            }
        });
    $http.get("json/resources.json")
        .then(function (res) {
            $scope.src = res.data;
        });


    $scope.feedback = []
    $scope.feedbackLC = JSON.parse(window.localStorage.getItem($scope.name));
    if ($scope.feedbackLC != null) {
        $scope.feedback.push($scope.feedbackLC);
    }
    $http.get('json/feedback.json')
        .then(function (res) {
            $scope.jsonfeedback = res.data;
            for (i = 0; i < $scope.jsonfeedback.length; i++) {
                if ($scope.jsonfeedback[i]['from'] == $scope.name) {
                    $scope.feedbackofST = {
                        "nameST": $scope.jsonfeedback[i]['from'],
                        "nameTC": $scope.jsonfeedback[i]['to'],
                        "title": $scope.jsonfeedback[i]['title'],
                        "mess": $scope.jsonfeedback[i]['message']
                    }
                    $scope.feedback.push($scope.feedbackofST)
                }
            }
        });

    $scope.titleST = "";
    $scope.messST = "";
    $scope.feedbackSTtoTC = function (event) {
        if ($scope.titleST != "" && $scope.messST != "") {
            $scope.feedbackofST = {
                "nameST": $scope.name,
                "nameTC": $scope.teacher_revclass,
                "title": $scope.titleST,
                "mess": $scope.messST
            }
            $scope.feedback.push($scope.feedbackofST);
            localStorage.setItem($scope.name, JSON.stringify($scope.feedbackofST));
            $scope.titleST = "";
            $scope.messST = "";
            $scope.errors = "";
        } else {
            $scope.errors = "Please re-check input data and cannot empty !";
        }
    };

    /**
     * Handle Logout Function by clear localStorage
     */
    $scope.handleLogout = function () {
        $window.localStorage.removeItem('user');
        $location.path('/');
    };

});

app.controller("teacherController", function ($scope, $location, $http, $window) {
    /**
     * Block Client Access with Log in
     */
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
            $scope.teachername = check['teachername'];
            // new list
            $scope.list = [];
            for (i = 0; i < length; i++) {
                if ($scope.liststudent[i]['teachername'] === check['teachername']) {
                    $scope.list.push($scope.liststudent[i]);
                }
            }
            $scope.feedback = [];
            $scope.listname = [];
            for (i = 0; i < $scope.list.length; i++) {
                $scope.listname.push($scope.list[i]['name']);
            }
            for (i = 0; i < $scope.list.length; i++) {
                $scope.listname.push($scope.list[i]['parents']);
            }
            for (i = 0; i < $scope.list.length + $scope.list.length; i++) {
                if (JSON.parse(window.localStorage.getItem($scope.listname[i])) != null) {
                    $scope.feedback.push(JSON.parse(window.localStorage.getItem($scope.listname[i])));
                }
            }
            $http.get("json/feedback.json")
                .then(function (res) {
                    $scope.jsonfeedback = res.data;
                    for (i = 0; i < $scope.jsonfeedback.length; i++) {
                        if ($scope.jsonfeedback[i]['to'] == $scope.teachername) {
                            $scope.feedbackofST = {
                                "nameST": $scope.jsonfeedback[i]['from'],
                                "title": $scope.jsonfeedback[i]['title'],
                                "mess": $scope.jsonfeedback[i]['message']
                            }
                            $scope.feedback.push($scope.feedbackofST);
                        }
                    }
                });

        });

    $http.get("json/resources.json")
        .then(function (res) {
            $scope.src = res.data;
        });

    $scope.addDocsubject = "";
    $scope.addDocresource = "";
    $scope.addDoctitle = "";
    $scope.addDoc = function () {
        if ($scope.addDocresource != "" && $scope.addDocsubject != "" && $scope.addDoctitle != "") {
            $scope.list_addDoc = {
                "subject": $scope.addDocsubject,
                "url": $scope.addDocresource,
                "title": $scope.addDoctitle
            }
            $scope.src.push($scope.list_addDoc);
            $scope.errorsadddoc = "";
        } else {
            $scope.errorsadddoc = "Please re-check input data and cannot empty !";
        }
    }

    $scope.edit = function (index) {
        $scope.name = $scope.list[index]['name'];
        $scope.math = $scope.list[index]['mark']['math'];
        $scope.physic = $scope.list[index]['mark']['physic'];
        $scope.chemist = $scope.list[index]['mark']['chemist'];
        $scope.parents = $scope.list[index]['parents'];
        $scope.progress = $scope.list[index]['progress'];
        $scope.teachername = $scope.list[index]['teachername'];
        $scope.index = index;

    };
    $scope.save = function () {
        var index = $scope.index;
        $scope.list[index]['name'] = $scope.name;
        $scope.list[index]['mark']['math'] = $scope.math;
        $scope.list[index]['mark']['physic'] = $scope.physic;
        $scope.list[index]['mark']['chemist'] = $scope.chemist;
        $scope.list[index]['parents'] = $scope.parents;
        $scope.list[index]['progress'] = $scope.progress;
        $scope.list[index]['teachername'] = $scope.teachername;

    };
    $scope.del = function (index) {
        $scope.list.splice(index, 1);
    };
    $scope.addname = "";
    $scope.addmath = "";
    $scope.addphysic = "";
    $scope.addchemist = "";
    $scope.addprogress = "";

    $scope.add = function () {

        if ($scope.addname != "" && $scope.addmath != "" && $scope.addphysic != "" && $scope.addchemist != "" && $scope.addprogress != "" && $scope.addmath < 11 && $scope.addphysic < 11) {

            $scope.addlist = {
                "name": $scope.addname,
                "mark": {
                    "math": $scope.addmath,
                    "physic": $scope.addphysic,
                    "chemist": $scope.addchemist
                },
                "progress": $scope.addprogress
            }
            $scope.list.push($scope.addlist);

            $scope.addname = "";
            $scope.addmath = "";
            $scope.addphysic = "";
            $scope.addchemist = "";
            $scope.addprogress = "";
            $scope.errorsaddst = "";

        } else {
            $scope.errorsaddst = "Please re-check input data ! ";
        }

    }
    $http.get('json/revclass.json')
        .then(function (res2) {
            $scope.listrev = res2.data;
            $scope.time_rev = [];
            var check = JSON.parse(window.localStorage.getItem('user'));
            $scope.teachername = check['teachername'];
            for (i = 0; i < $scope.listrev.length; i++) {
                if ($scope.listrev[i]['teacher'] == $scope.teachername) {
                    $scope.time_rev.push($scope.listrev[i]['time'])
                }
            }
        });
    $scope.addtime = "";
    $scope.adddate = "";
    $scope.addschedule = function () {
        if ($scope.addtime != "" && $scope.adddate != "") {
            $scope.timenew = $scope.adddate + " " + $scope.addtime
            $scope.time_rev.push($scope.timenew);
            $scope.addtime = "";
            $scope.adddate = "";
            $scope.errorsaddschedule = ""
        } else {
            $scope.errorsaddschedule = "Plase re-check input data and cannot empty !";
        }

    };
    $scope.upprogress = function (index) {
        $scope.list[index]['progress']++;
    };
    $scope.downprogress = function (index) {
        $scope.list[index]['progress']--;
    };
    /**
     * Handle Logout Function by clear localStorage
     */
    $scope.handleLogout = function () {
        $window.localStorage.removeItem('user');
        $location.path('/');
    };
});

app.controller("parentController", function ($scope, $location, $window, $http) {
    /**
     * Block Client Access with Log in
     */
    if (!localStorage['user']) {
        $location.path('/');
    };


    $scope.studentLC = JSON.parse(window.localStorage.getItem('user'));
    $scope.student = $scope.studentLC['name'];
    $scope.parent = $scope.studentLC['parents'];
    let lst_mark_obj = $scope.studentLC.mark;

    let lst_sbuject_name = Object.keys(lst_mark_obj);
    let lst_sbuject_mark = Object.values(lst_mark_obj);

    $scope.lst_subject = [];
    lst_sbuject_name.forEach(function (elm, index) {
        $scope.lst_subject.push({ 'name': elm, 'mark': lst_sbuject_mark[index] });
    });

    $scope.progress = $scope.studentLC['progress'];
    $scope.feedbacks = [];
    $http.get("json/feedback.json")
        .then(function (res) {
            $scope.jsonfeedback = res.data;
            for (i = 0; i < $scope.jsonfeedback.length; i++) {
                if ($scope.jsonfeedback[i]['from'] == $scope.parent) {
                    $scope.feedbackofST = {
                        "nameTC": $scope.jsonfeedback[i]['to'],
                        "title": $scope.jsonfeedback[i]['title'],
                        "mess": $scope.jsonfeedback[i]['message']
                    }
                    $scope.feedbacks.push($scope.feedbackofST);
                }
            }
        });
    $scope.feedback = function () {
        $scope.feedbackofST = {
            "nameST": $scope.studentLC['parents'],
            "nameTC": $scope.studentLC['teachername'],
            "title": $scope.title,
            "mess": $scope.mess
        }
        $scope.feedbacks.push($scope.feedbackofST);
        localStorage.setItem($scope.parent, JSON.stringify($scope.feedbackofST));
        $scope.title = "";
        $scope.mess = "";
    };

    $scope.feedbackLC = JSON.parse(window.localStorage.getItem($scope.parent));
    if ($scope.feedbackLC != null) {
        $scope.feedbacks.push($scope.feedbackLC)
    }

    /**
     * Handle Logout Function by clear localStorage
     */
    $scope.handleLogout = function () {
        $window.localStorage.removeItem('user');
        $location.path('/');
    };


});

app.controller("aboutController", function ($scope) {

});

app.controller("contactController", function ($scope) {
    $scope.titleCT = "";
    $scope.messCT = "";
    $scope.list_contactus = [];
    $scope.sendContactus = function () {
        if ($scope.titleCT != "" && $scope.messCT != "") {
            $scope.contactus = {
                "title": $scope.titleCT,
                "mess": $scope.messCT
            }
            $scope.list_contactus.push($scope.contactus)
            $scope.titleCT = "";
            $scope.messCT = "";
        }
    }
});