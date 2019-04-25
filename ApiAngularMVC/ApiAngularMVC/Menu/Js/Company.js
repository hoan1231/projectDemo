
app.controller("CompanyController", function ($scope, CompanyService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    console.log($scope.roleMenu);
    $scope.name = "", $scope.address = "", $scope.phone = "", $scope.id = "";
    $scope.isUpdate = true;
    
    $scope.changeCus = true; $scope.lstCus = [];
    $scope.$watch('changeCus', function () {
        CompanyService.getCompany().then(function (data) {
            $scope.lstCus = data;
        });
    });

    $scope.addCompany = function () {
       
        CompanyService.createCompany($scope.name, $scope.address, $scope.phone).then(function (data) {
            toastr.success('Thêm mới thành công!', "Thông báo");
            $scope.changeCus = !$scope.changeCus;
       });
    };
    $scope.editCus = function (item) {
        $scope.isUpdate = false;
        $scope.name = item.Name; $scope.phone = item.Phone;
        $scope.address = item.Address;
        $scope.id = item.Id;
      
    }
    $scope.updateCus = function () {
       
        CompanyService.updateCompany($scope.id, $scope.name, $scope.address, $scope.phone).then(function (data) {
            toastr.success('Cập nhật thành công!', "Thông báo");
            $scope.name = "", $scope.address = "", $scope.phone = "", $scope.id = "";
            $scope.changeCus = !$scope.changeCus;
            $scope.isUpdate = true;
        });
    }
    $scope.deleteCus = function (id) {
        var r = confirm("Bạn có muốn xóa không?");
        if (r == true) {
            CompanyService.deleteCompany(id).then(function (data) {
                toastr.success('Xóa thành công!', "Thông báo");
                $scope.changeCus = !$scope.changeCus;
            });
        }
    }
 
});