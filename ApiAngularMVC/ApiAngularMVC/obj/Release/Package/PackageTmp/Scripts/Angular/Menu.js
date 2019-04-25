
app.controller("MenuCtrl", function ($scope, MenuService, UserFactory) {
    

    //   app.controller('MenuCtrl', function ($scope, $http) {
    $scope.cboMenu = ""; $scope.isAdd = true;
    $scope.menu = [];
    $scope.tblMenu = [];
    $scope.m = { MenuId: "", MenuUrl: "", MenuName: "", ParentId: "", Action: "", CreatedDate: "", CreatedBy: "", UpdatedDate: "", UpdatedBy: "", Icon: "", IsDeleted: false, Note: "", IsEnable: true, OrderIndex: "" };
   
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    console.log($scope.roleMenu);

    MenuService.getAllMenu().then(function (data) {

        angular.forEach(data, function (value, key) {
            if (value.ParentId == null) {
                $scope.menu.push(value);
            }
        });

        angular.forEach(data, function (value, key) {
            if (value.ParentId != 0) {
                angular.forEach($scope.menu, function (value2, key2) {
                    if (value.ParentId == value2.MenuId) {
                        if (value2.children == undefined) {
                            value2.children = [];
                            value2.showChildren = false;
                        }
                        value2.children.push(value);
                    }
                });
            }
        });
   
    });
    $scope.changeMenu = function () {
        $scope.m = []; $scope.isAdd = true;
        MenuService.getMenu($scope.cboMenu).then(function (data) {
            $scope.tblMenu = data;
            console.log(data);
        });

    };
    $scope.editMenu = function (x) {
        $scope.isAdd = false;
        $scope.m = x;
       
    }
    $scope.updateMenu = function () {
        MenuService.UpdateMenu($scope.m).then(function (data) {
            toastr.success('Cập nhật thành công!', "Thông báo");
            MenuService.getMenu($scope.cboMenu).then(function (data) {
                $scope.tblMenu = data;
                $scope.m = { MenuId: "", MenuUrl: "", MenuName: "", ParentId: "", Action: "", CreatedDate: "", CreatedBy: "", UpdatedDate: "", UpdatedBy: "", Icon: "", IsDeleted: false, Note: "", IsEnable: true, OrderIndex: "" };
                $scope.isAdd = true;
                MenuService.sendData($scope.m);
            });
        });
    };
    //Add menu
    $scope.addMenu = function (item) {
       
        $scope.a= { MenuId: "", MenuUrl: "", MenuName: "", ParentId: "", Action: "", CreatedDate: "", CreatedBy: "", UpdatedDate: "", UpdatedBy: "", Icon: "", IsDeleted: false, Note: "", IsEnable: true, OrderIndex: "" };
        $scope.a.MenuUrl = item.MenuUrl; $scope.a.ParentId = $scope.cboMenu; $scope.a.Note = item.Note; $scope.a.OrderIndex = item.OrderIndex; $scope.a.IsEnable = item.IsEnable;
        $scope.a.MenuName = item.MenuName;
        MenuService.createMenu($scope.a).then(function (data) {
            toastr.success('Cập nhật thành công!', "Thông báo");
            MenuService.getMenu($scope.cboMenu).then(function (data) {
                $scope.tblMenu = data;
                MenuService.sendData($scope.a);
                $scope.m = [{MenuId:"", MenuUrl: "", MenuName: "",ParentId:"",Action:"",CreatedDate:"",CreatedBy:"",UpdatedDate:"",UpdatedBy:"",Icon:"",IsDeleted:false, Note: "", IsEnable: true, OrderIndex: "" }];
                $scope.isAdd = true;
               
            });
        });

    };
    $scope.deleteMenu = function (item) {
        var r = confirm("Bạn có muốn xóa không?");
        if (r == true) {
            MenuService.deleteMenu(item).then(function (data) {
                MenuService.getMenu($scope.cboMenu).then(function (data) {
                    $scope.tblMenu = data;
                   
                });
                toastr.success('Xóa thành công!', "Thông báo");
            });
        }
    };
    
    //$scope.getMenuChild = function (parentId) {
    //    debugger;
    //    $http.get("/api/Menu/"+parentId).then(function (response) {
    //        debugger;
    //        $scope.menuChilds = response.data;
    //    });
    //};

});

      