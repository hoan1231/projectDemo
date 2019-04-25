app.controller("ManagerTransactionController", function ($scope, ManagerTransactionService) {
    $scope.changeData = true;
    $scope.$watch('changeData', function () {
        ManagerTransactionService.getCatTransaction().then(function (data) {
            console.log(data);
            $scope.lstCat = data;
        });
    });
   
    $scope.saveCat = function (item) {
        var r = confirm("Xác nhận lấy hàng");
        if (r == true) {
            ManagerTransactionService.saveCatTransaction(item).then(function (data) {
                if (data == "succ") {
                    toastr.success('Chuyển hàng vào kho thành công!', "Thông báo");
                    $scope.changeData = !$scope.changeData;
                }
                else alert("Tiến trình bị lỗi. Vui lòng thực hiện lại");

            });
        }
      
    };
    $scope.cancle = function (item) {
        var r = confirm("Xác nhận hủy đơn hàng");
        if (r == true) {
            ManagerTransactionService.cancleTransaction(item).then(function (data) {
                if (data == "succ") {

                    alert("Đơn hàng đã hủy thành công");
                    $scope.changeData = !$scope.changeData;
                }
                else alert("Tiến trình bị lỗi. Vui lòng thực hiện lại");
            });
        }
    }
});