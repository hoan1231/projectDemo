
app.controller("AddMemberController", function ($scope, MemberService, CompanyService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    $scope.m = { fullName: "", name: "", pass: "", repass: "", role: "3ea6081c-93e4-419b-9d12-f5f70088e9de",Email:"",Address:"",Phone:""};
    CompanyService.getCompany().then(function (data) {
        $scope.lstCompany = data;
    });
    //Add Member
    $scope.addMember = function () {
        if ($scope.m.pass == $scope.m.repass &&$scope.m.pass!="") {
            MemberService.addMember($scope.m.fullName, $scope.m.name, $scope.m.pass, $scope.m.role,$scope.Company,$scope.m.Email,$scope.m.Address,$scope.m.Phone).then(function (data) {
                toastr.success('Thêm mới thành công!', "Thông báo");

                $scope.m = { fullName: "", name: "", pass: "", repass: "", role: "3ea6081c-93e4-419b-9d12-f5f70088e9de", Email: "", Address: "", Phone: "" }; $scope.Company = "";

            });
        }
        else{
            toastr.warning('Mật khẩu không khớp!', "Thông báo");; $scope.m.pass = ""; $scope.m.repass = "";
        }
        
    };
    $scope.downloadFile = function () {
        window.location.href = "/Files/FileImportUser.xls";
    };
    $scope.importFile = function () {
        var filesupload = new FormData();
        filesupload.append('file', $('#fileupload')[0].files[0]);
        MemberService.importFile(filesupload).then(function (data) {
            console.log(data);
            if (data == "errfound") toastr.success("Không tìm thấy bản ghi nào thỏa mãn", "Thông báo");
            else if (data === "errfile") toastr.warning("File không đúng dạng mẫu", "Thông báo");
            else if (data === "errFiles") toastr.warning("Không đọc được file", "Thông báo");
            else {
                var result = data.split(';');
                toastr.success("Thêm mới thành công " + result[0] + " thành viên", "Thông báo");
                toastr.success("Có " + result[1] + " bản ghi bị trùng", "Thông báo");
            }
            $("#fileupload").val('');

        });
    }

 

    $scope.refresh=function()
    {

        $scope.m = { fullName: "", name: "", pass: "", repass: "", role: "3ea6081c-93e4-419b-9d12-f5f70088e9de", Email: "", Address: "", Phone: "" };
    }

});

      