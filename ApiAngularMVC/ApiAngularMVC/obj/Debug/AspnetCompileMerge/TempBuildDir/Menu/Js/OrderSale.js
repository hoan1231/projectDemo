
app.controller("OrderSaleController", function ($scope, OrderSaleService, CustomerService, UserFactory,CatMaterialService, CompanyService, CategorysService, CatManufacturerService) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    $('.select2').select2();
    $('#txtDate').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    }).datepicker("setDate", new Date());
   
    $scope.a = [], $scope.lstCategory = []; $scope.a.CatId = "", $scope.Decription = ""; $scope.PlaceReceive = "Hà Nội";
    $scope.sumPrice = 0, $scope.sumVat = 0; $scope.sumCount = 0; $scope.CustomerId = "";
    var date = $("input[id$='txtDate']").val();

    CompanyService.getIdCompany1().then(function (data) {
        $scope.lstCompany = data;
        $scope.CompanyId = data[0].Id;
        CategorysService.getCateByCom(data[0].Id).then(function (data) {
            $scope.lstCat = data;

        });
    });
   
    CustomerService.getCustomer().then(function (data) {
        $scope.lstCustomer = data;
    });
    $scope.changeCom = function () {
       
        $scope.sumPrice = 0, $scope.sumVat = 0; $scope.sumCount = 0;
        if ($scope.CompanyId != "") {
            CategorysService.getCateByCom($scope.CompanyId).then(function (data) {
                $scope.lstCat = data;
            });
        }
        $scope.lstCategory = [];
    }
   
   
    $scope.changeCate = function () {
        if ($scope.a.CatId != "") {
            CategorysService.getCategoryById($scope.a.CatId).then(function (data) {
                if (data !=null) {
                    var j = 0;
                    for (var i = 0; i < $scope.lstCategory.length; i++) {
                        var a = $scope.lstCategory[i].Category.ID;
                        var b = data.ID;
                        if ($scope.lstCategory[i].Category.ID == data.ID) {
                            $scope.lstCategory[i].SoLuong += 1;
                            j = 1;
                            break;
                        }
                    }
                    if (j == 0) {
                        var item = { Category: data, SoLuong: 1, Thue: 0 };

                        $scope.lstCategory.push(item);
                        $scope.sumCount = 0; $scope.sumPrice = 0; $scope.sumVat = 0;
                        for (var i = 0; i < $scope.lstCategory.length; i++) {
                            $scope.sumCount += $scope.lstCategory[i].SoLuong;
                            $scope.sumPrice += $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.Price * 1;
                            $scope.sumVat += $scope.lstCategory[i].Thue * ($scope.lstCategory[i].SoLuong * $scope.lstCategory[i].Category.Price) / 100;
                        }
                    }
                }
                
            });
        }
        console.log($scope.lstCategory);
      
    }

    //thay đói số lượng,dongia,vat
    $scope.changePrice = function () {
        $scope.sumCount = 0; $scope.sumPrice = 0; $scope.sumVat = 0;
        for (var i = 0; i < $scope.lstCategory.length; i++) {
            $scope.sumCount += $scope.lstCategory[i].SoLuong;
            $scope.sumPrice += $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.Price * 1;
            $scope.sumVat += $scope.lstCategory[i].Thue * ($scope.lstCategory[i].SoLuong * $scope.lstCategory[i].Category.Price) / 100;
        }
    };
    //thay doi so luong
    $scope.changePriceSL = function (i) {
        if ($scope.lstCategory[i].Category.CatNumber < $scope.lstCategory[i].SoLuong) $scope.lstCategory[i].SoLuong = $scope.lstCategory[i].Category.CatNumber;
        if (($scope.numberCatMove - $scope.max) > 0) $scope.numberCatMove = $scope.max;
        $scope.sumCount = 0; $scope.sumPrice = 0; $scope.sumVat = 0;
        for (var i = 0; i < $scope.lstCategory.length; i++) {
            $scope.sumCount += $scope.lstCategory[i].SoLuong;
            $scope.sumPrice += $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.Price * 1;
            $scope.sumVat += $scope.lstCategory[i].Thue * ($scope.lstCategory[i].SoLuong * $scope.lstCategory[i].Category.Price) / 100;
        }
    }
    //xóa category
    $scope.deleteCategory = function (item) {
        $scope.lstCategory.splice(item, 1);
        $scope.sumCount = 0; $scope.sumPrice = 0; $scope.sumVat = 0;
        for (var i = 0; i < $scope.lstCategory.length; i++) {
            $scope.sumCount += $scope.lstCategory[i].SoLuong;
            $scope.sumPrice += $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.Price * 1;
            $scope.sumVat += $scope.lstCategory[i].Thue * ($scope.lstCategory[i].SoLuong * $scope.lstCategory[i].Category.Price) / 100;
        }
    };
    //thay đổi đơn giá
    $scope.saveOrder = function () {
        date = $("input[id$='txtDate']").val();
        if ($scope.CompanyId == "" || $scope.CustomerId == "") alert("Chưa nhập đầy đủ thông tin");
        else {
            $scope.lstOrder = [];
            for (var i = 0; i < $scope.lstCategory.length; i++) {
                var item = { CatId: $scope.lstCategory[i].Category.ID,Price:$scope.lstCategory[i].Category.Price ,CatNumberSale: $scope.lstCategory[i].SoLuong, SumMoney: $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.Price * 1, VAT: $scope.lstCategory[i].Thue, Decription: $scope.Decription, PlaceReceive: $scope.PlaceReceive };
                $scope.lstOrder.push(item);
            }
            $scope.MonenySum = $scope.sumPrice + $scope.sumVat;
          
            OrderSaleService.createOrderSale($scope.lstOrder, $scope.CustomerId, $scope.CompanyId, date, $scope.MonenySum).then(function (data) {
                toastr.success('Thêm mới thành công!', "Thông báo");
                $scope.lstCategory = [];
                $scope.a.CatId = "";
                 $scope.lstCategory = []; $scope.a.CatId = "", $scope.Decription = ""; $scope.PlaceReceive = "Hà Nội";
                $scope.sumPrice = 0, $scope.sumVat = 0; $scope.sumCount = 0; $scope.CustomerId = "";
            });
        }
       
    }
    $scope.downloadFile = function () {
        window.location.href = "/Files/FileImportOrderSale.xls";
    };
    $scope.importFile = function () {
        var filesupload = new FormData();
        filesupload.append('file', $('#fileupload')[0].files[0]);
        OrderSaleService.importFile(filesupload).then(function (data) {
            console.log(data);
            if (data == "errfound") toastr.success("Không tìm thấy bản ghi nào thỏa mãn", "Thông báo");
            else if (data === "errFile") toastr.warning("File không đúng dạng mẫu", "Thông báo");
            else if (data === "errFiles") toastr.warning("Không đọc được file", "Thông báo");
            else {
                var result = data.split(';');
                toastr.success("Thêm mới thành công " + result[0] + " bản ghi", "Thông báo");
            }
            $("#fileupload").val('');

        });
    }

    
});