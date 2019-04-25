app.controller('myMenu', function ($scope, MenuService, MemberService) {
    $scope.Menus = [];
    $scope.menu = [];
    $scope.changData = ""; $scope.change = "1";
    //Lấy tất cả các quyền của menu theo User login 
    MenuService.getRoleMenuByUser().then(function (data) {
        localStorage.setItem("_roleMenu", angular.toJson(data));
    });

    $scope.$on('data_shared', function () {
        $scope.changData = MenuService.getData()+$scope.change+"0";
        $scope.change += "1";
    });
    $scope.$watch('changData', function () {
       
        $scope.menu = [];
        MenuService.getMenuParent().then(function (item) {
            $scope.menu = item;
            MenuService.getAllMenu1().then(function (data) {
               
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
        });
        
    });
    MemberService.getInfoUser().then(function (data) {
        $scope.UserName = data.UserName;
        $scope.Name = data.Name;
    });

});
app.controller('MenuSideBarController', function ($scope, MemberService, $window) {
    MemberService.getInfoUser().then(function (data) {
        $scope.UserName = data.UserName;
        $scope.Name = data.Name;
    });
    $scope.signOut = function () {
        MemberService.signOut().then(function (data) {
            $window.location.href = "/";
        });
       
    }
    
});