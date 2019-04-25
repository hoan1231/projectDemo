
app.controller("InfoUserController", function ($scope, MemberService, CompanyService, UserFactory) {
    $scope.x = [];
    $scope.passOld = "";
    $scope.pass = "";
    $scope.repass = "";
        MemberService.getInfoUser().then(function (data) {
            console.log(data);
            $scope.x = data;
        });
    $scope.changePass = function () {
        if ($scope.pass == $scope.repass) {
            var itemDisableds = [$('#changePass')];
            var mylop = new myMpLoop($('#changePass'), 'Đang xử lý', $('#changePass').html(), itemDisableds);
            mylop.start();

            MemberService.changePass($scope.x.ID, $scope.passOld, $scope.pass).then(function (data) {
                mylop.stop();
                if (data == "err") {
                    toastr.warning('Mật khẩu không đúng!', "Thông báo");
                    $scope.passOld = "";
                    $scope.pass = "";
                    $scope.repass = "";
                }
                else {
                    toastr.success('Cập nhật thành công mật khẩu mới!', "Thông báo");
                    $scope.passOld = "";
                    $scope.pass = "";
                    $scope.repass = "";
                }
            });
        } else { toastr.warning('Mật khẩu không khớp!', "Thông báo"); $scope.repass = ""; $scope.pass = "";}
    }
   
    $scope.changeInfo = function () {
        MemberService.updateMember($scope.x).then(function (data) {
            if (data == "succ") toastr.success('Cập nhật thành công thông tin tài khoản!', "Thông báo");
        });
    }
});

      