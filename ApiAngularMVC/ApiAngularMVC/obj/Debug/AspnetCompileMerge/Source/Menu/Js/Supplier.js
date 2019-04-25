
app.controller("SupplierController", function ($scope, SupplierService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    console.log($scope.roleMenu);
    $scope.name = "", $scope.address = "", $scope.phone = "", $scope.id = "";
    $scope.isUpdate = true;
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });
    $scope.changeCus = true; $scope.lstCus = [];
    $scope.$watch('changeCus', function () {
        SupplierService.getSupplier().then(function (data) {
            $scope.lstCus = data;
        });
    });

    $scope.addSupplier = function () {
       
        SupplierService.createSupplier($scope.name, $scope.address, $scope.phone).then(function (data) {
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
       
        SupplierService.updateSupplier($scope.id, $scope.name, $scope.address, $scope.phone).then(function (data) {
            toastr.success('Cập nhật thành công!', "Thông báo");
            $scope.name = "", $scope.address = "", $scope.phone = "", $scope.id = "";
            $scope.changeCus = !$scope.changeCus;
            $scope.isUpdate = true;
        });
    }
    $scope.deleteCus = function (id) {
        var r = confirm("Bạn có muốn xóa không?");
        if (r == true) {
            SupplierService.deleteSupplier(id).then(function (data) {
                toastr.success('Xóa thành công!', "Thông báo");
                $scope.changeCus = !$scope.changeCus;
            });
        }
    }
 
});