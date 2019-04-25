
app.controller("RoleManagerController", function ($scope, RoleManagerService, MenuService) {
    $scope.roleName = ""; $scope.roles = []; $scope.Id = ""; $scope.change = true, $scope.isAdd = true;
    //lay danh sach cac quyen
    $scope.$watch('change', function () {
        RoleManagerService.getRole().then(function (data) {
           
            $scope.roles = data;
            console.log(data);
        });
    });
    //Thêm mới quyền
    $scope.addRole = function () {
        if ($scope.nameRole == "") alert("Hãy nhập tên quyền");
        else {
            RoleManagerService.createRole($scope.roleName).then(function (data) {
                if (data == "succ") {
                    toastr.success('Thêm mới thành công!', "Thông báo");
                    $scope.change = !$scope.change;
                    $scope.roleName = "";
                }
                else if (data == "exit") toastr.warning('Tên quyền đã tồn tại!', "Thông báo");
                else toastr.warning('Tiến trình bị lỗi. Vui lòng thực hiện lại',"Thông báo");
            });
        }     
    }
    //chỉnh sửa quyền
    $scope.editRole = function (x) {
        $scope.isAdd = false;
        $scope.roleName = x.Name;
        $scope.Id = x.Id;
       
    }
    $scope.updateRole = function () {
     
        RoleManagerService.updateRole($scope.Id, $scope.roleName).then(function (data) {
            if (data.d == "succ") {
                toastr.success('Cập nhật thành công!', "Thông báo"); $scope.change = !$scope.change;
                $scope.isAdd = true;
                $scope.roleName = "";
            }
            else alert("Tiến trình bị lỗi. Vui lòng thực hiện lại");
        });
    }


    $scope.activeRole = function (x) {
        RoleManagerService.activeRole(x).then(function (data) {
            MenuService.sendData("load");
            if (data == "err") toastr.success('Khóa quyền thành công!', "Thông báo");
            else toastr.success('Mở quyền thành công!', "Thông báo");
            $scope.change = !$scope.change;
        });
         
    }
    $scope.detailUser = function (item) {
      
        RoleManagerService.getUserByRole(item.RoleId).then(function (data) {
            $scope.lstUser = data;
        });
        $scope.nameRole = item.RoleName;


    }
});