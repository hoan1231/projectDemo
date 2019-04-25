
app.controller("ListMemberController", function ($scope, MemberService, RoleManagerService, MenuService) {
    $scope.userId = ""; $scope.users = []; $scope.Id = ""; $scope.change = true, $scope.isAdd = true; $scope.userId = ""; $scope.isUpdate = true;
   
    $scope.$watch('change', function () {
        MemberService.getMember().then(function (data) {
            debugger;
            console.log(data);
            $scope.users = data;
            console.log(data);
        });
    });

    RoleManagerService.getRoleName().then(function (data) {
        $scope.roles = data.map(function (e) {
            return {name: e, check: false };

        });
        console.log($scope.roles);

    });
    $scope.setRole = function (item) {
        $scope.userId = item;
        RoleManagerService.getRoleForUser(item).then(function (data) {
            $scope.roleAgent = data;
            console.log($scope.roleAgent);
        
            for (var i = 0; i < $scope.roles.length; i++) {
                $scope.roles[i].check = false;
                for (var j = 0; j < $scope.roleAgent.length; j++) {
                    var a = $scope.roleAgent[j].RoleName;
                    var b = $scope.roles[i].name;
                    if ($scope.roles[i].name.RoleName == $scope.roleAgent[j].RoleName) {
                        $scope.roles[i].check = true;
                        break;
                    }
                     $scope.roles[i].check = false;
                }
            }


            console.log($scope.roles);
        });

    }
  
    $scope.saveRole = function () {
        angular.forEach($scope.roles, function (value, key) {
            RoleManagerService.setRoleUser($scope.userId, value.name.RoleId, value.check).then(function (data) {
                if (data == "succ") {
                  
                    $scope.isAdd = true;
                    $scope.roleName = "";
                }
                else alert("Tiến trình bị lỗi. Vui lòng thực hiện lại");
            });
          
        });
        toastr.success('Cập nhật thành công!', "Thông báo"); $scope.change = !$scope.change;;
        MenuService.sendData($scope.roles);
       // ManagerMenuService.sendData($scope.roles);
        $('#modal_theme_primary').modal('toggle');


    }
    //cập nhật user
    $scope.editMember = function (item) {
        debugger;
        $scope.isUpdate = false;
        $scope.id = item.ProviderUserKey;
        $scope.checkname = item.UserName;
        $scope.name = item.UserName;
        $scope.email = item.Email;

    }
    $scope.cancel = function () {
        $scope.isUpdate = true;
    };

    $scope.updateUser = function () {
        ListMemberService.updateMember($scope.id, $scope.name, $scope.email, $scope.checkname).then(function (data) {

            try {
                if (data.d == "succ") {
                    toastr.success('Cập nhậ thành công!', "Thông báo");
                    $scope.change = !$scope.change;
                    $scope.name = "";
                    $scope.checkname = "";
                    $scope.email = "";
                    $scope.id = "";
                    $scope.isUpdate = true;
                }
                if (data.d == "err1") {
                    alert("Username đã tồn tại! ");
                }
            } catch (e) {
                alert("Tiến trình bị lỗi. Vui lòng thực hiện lại");
            }
        });
        
    }


});