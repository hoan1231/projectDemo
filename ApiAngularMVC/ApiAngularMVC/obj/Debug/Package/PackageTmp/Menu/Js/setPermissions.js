app.controller("SetPermissionController", function ($scope, MenuService, RoleManagerService, $routeParams) {
    $scope.role = $routeParams.role;
    $scope.menu = [], $scope.list = [];
    $scope.menuParent = [];
    $scope.cboMenu = ""; $scope.ParentId = "";
    $scope.lstRoleMenus = [];
    MenuService.getMenuParent().then(function (data) {
        $scope.menuParent = data;
    });
    $scope.changeMenu = function () {
        RoleManagerService.getRoleMenu($scope.parentId, $scope.role).then(function (data) {
          
            $scope.lstRoleMenus = data;
  
        });
    };

    //Cập nhật lại quyền
    $scope.updateRoles = function () {
        var itemDisableds = [$('#btnUpdate')];
        var mylop = new myMpLoop($('#btnUpdate'), 'Đang xử lý', $('#btnUpdate').html(), itemDisableds);
        mylop.start();

        angular.forEach($scope.lstRoleMenus, function (value, key) {
            $scope.list.push(value.b);
        });
   
        RoleManagerService.updateRoleMenu($scope.list).then(function (data) {
            if (data == "err") {
                alert("Tiến trình bị lỗi. Vui lòng thử lại");
            }
            else {
                toastr.success('Cập nhật thành công!', "Thông báo");
                 mylop.stop();
              MenuService.sendData("send");
            }
        });
    };

    $scope.changeCheckAll = function (item, index) {
        $scope.lstRoleMenus[index].b.IsAdd = item;
        $scope.lstRoleMenus[index].b.IsEdit = item;
        $scope.lstRoleMenus[index].b.IsDelete = item;
        $scope.lstRoleMenus[index].b.IsEnable = item;
        $scope.lstRoleMenus[index].b.IsShow = item;
        $scope.lstRoleMenus[index].b.IsPrint = item;
        $scope.lstRoleMenus[index].b.IsExport = item;
    }
});