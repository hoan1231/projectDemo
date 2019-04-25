var app = angular.module("appLogin", []);
app.controller("ctrlLogin", function ($scope, $http) {
    $scope.userName = "", $scope.passWord = "";
    $scope.login = function () {
        var itemDisableds = [$('#login')];
        var mylop = new myMpLoop($('#login'), 'Đang xử lý', $('#login').html(), itemDisableds);
        mylop.start();
        $http({
            method: "POST",
            url: "/Login/Login",
            dataType: 'json',
            data: { user: $scope.userName, pass: $scope.passWord },
            headers: { "Content-Type": "application/json" }


        }).then(function (msg) {
            
            console.log(msg);
            if (msg.data == "succ") { window.location.href = "/#"; mylop.stop(); }
            else { alert("Đăng nhập không thành công"); mylop.stop(); }
           
        });
    }

});