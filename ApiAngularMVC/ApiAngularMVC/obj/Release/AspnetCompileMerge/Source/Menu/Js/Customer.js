
app.controller("CustomerController", function ($scope, CustomerService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    console.log($scope.roleMenu);
    $scope.name = "", $scope.address = "", $scope.phone = "", $scope.date = "23/2/1993", $scope.sex = "", $scope.email = "", $scope.id = "";
    $scope.isUpdate = true;
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    }).datepicker("setDate", new Date());
    $scope.changeCus = true; $scope.lstCus = [];
    $scope.$watch('changeCus', function () {
        CustomerService.getCustomer().then(function (data) {
            $scope.lstCus = data;
        });
    });

    $scope.addCustomer = function () {
        var date = $("#datepicker").datepicker("getDate");
        $scope.date = $.datepicker.formatDate("dd/mm/yy", date);
        CustomerService.createCustomer($scope.name, $scope.address, $scope.phone, $scope.date, $scope.sex, $scope.email).then(function (data) {
            toastr.success('Thêm mới thành công!', "Thông báo");
            $scope.changeCus = !$scope.changeCus;
       });
    };
    $scope.editCus = function (item) {
        $scope.isUpdate = false;
        $scope.name = item.Name; $scope.phone = item.Phone; $scope.date = item.BirthDay; $scope.email = item.Email;
        $scope.address = item.Address;
        $scope.id = item.Id;
        if (item.sex == "1") $scope.sex = "1";
        else $scope.sex = "0";
    }
    $scope.updateCus = function () {
        var date = $("#datepicker").datepicker("getDate");
        $scope.date = $.datepicker.formatDate("dd/mm/yy", date);
        CustomerService.updateCustomer($scope.id, $scope.name, $scope.address, $scope.phone, $scope.date, $scope.sex, $scope.email).then(function (data) {
            toastr.success('Cập nhật thành công!', "Thông báo");
            $scope.name = "", $scope.address = "", $scope.phone = "", $scope.date = "23/2/1993", $scope.sex = "", $scope.email = "", $scope.id = "";
            $scope.changeCus = !$scope.changeCus;
            $scope.isUpdate = true;
        });
    }
    $scope.deleteCus = function (id) {
        var r = confirm("Bạn có muốn xóa không?");
        if (r == true) {
            CustomerService.deleteCustomer(id).then(function (data) {
                toastr.success('Xóa thành công!', "Thông báo");
                $scope.changeCus = !$scope.changeCus;
            });
        }
    }
 
});