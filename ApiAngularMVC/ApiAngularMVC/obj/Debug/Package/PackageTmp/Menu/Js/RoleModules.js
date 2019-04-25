
app.controller("RoleModulesController", function ($scope, $routeParams, MenuService, RoleModulesService) {
    $scope.role = $routeParams.role;
    $scope.menu = [], $scope.list = [];
    $scope.cboMenu = ""; $scope.ParentId = "";
    $scope.lstRoleMenus = [];
    MenuService.getParentMenu().then(function (data) {
        $scope.menuParent = data;
    });
    $scope.changeMenu = function () {
        RoleModulesService.getRoleMenu($scope.parentId, $scope.role).then(function (data) {
            var item = JSON.parse(data.d);
            $scope.lstRoleMenus = item;
            debugger;
        });
    };
   
    //Cập nhật lại quyền
    $scope.updateRoles = function () {
        angular.forEach($scope.lstRoleMenus, function (value, key) {
            $scope.list.push(value.b);
        });
            RoleModulesService.updateRoleMenu($scope.list).then(function (data) {
            if (data.d == "err") {
                alert("Tiến trình bị lỗi. Vui lòng thử lại");
            }
            else {          
                toastr.success('Cập nhật thành công!', "Thông báo");
            }
           
            });
           
            MenuService.sendData($scope.list);
    };

    $scope.changeCheckAll = function (item, index) { 
        $scope.lstRoleMenus[index].b.IsAdd = item;
        $scope.lstRoleMenus[index].b.IsEdit = item;
        $scope.lstRoleMenus[index].b.IsDelete = item;
        $scope.lstRoleMenus[index].b.IsEnable = item;
        $scope.lstRoleMenus[index].b.IsShow = item;
        $scope.lstRoleMenus[index].b.IsSearch = item;
        $scope.lstRoleMenus[index].b.IsExport = item;
    }
});