
app.controller("OrderImportController", function ($scope,OrderImportService, SupplierService,UserFactory, CatMaterialService, CompanyService, CategorysService, CatManufacturerService) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
  
    $('#txtDate').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    }).datepicker("setDate", new Date());
   
    $scope.a = [], $scope.lstCategory = []; $scope.a.CatId = "", $scope.Decription = ""; $scope.PlaceReceive = "Hà Nội";
    $scope.sumPrice = 0, $scope.sumVat = 0; $scope.sumCount = 0; $scope.SupplierId = "";
    var date = $("input[id$='txtDate']").val();
    CompanyService.getCompany().then(function (data) {
  
        $scope.lstCompany = data;
    });
    SupplierService.getSupplier().then(function (data) {
       
        $scope.lstSupplier = data;
    });
    CategorysService.getCategorys().then(function (data) {
        $scope.lstCat = data;
       
    });
   
    $scope.changeCate = function () {
        var lstCatId = $("select[id$='select2']").val();
        if (lstCatId != "") {
            CategorysService.getCategoryByIdImport(lstCatId).then(function (data) {
                
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
                        $scope.sumPrice += $scope.lstCategory[i].SoLuong*1 * $scope.lstCategory[i].Category.PurchasePrice*1;
                        $scope.sumVat += $scope.lstCategory[i].Thue * ($scope.lstCategory[i].SoLuong * $scope.lstCategory[i].Category.PurchasePrice) / 100;
                    }
                }
            });
            $scope.sumCount = 0; $scope.sumPrice = 0; $scope.sumVat = 0;
            for (var i = 0; i < $scope.lstCategory.length; i++) {
                $scope.sumCount += $scope.lstCategory[i].SoLuong;
                $scope.sumPrice += $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.PurchasePrice * 1;
                $scope.sumVat += $scope.lstCategory[i].Thue * ($scope.lstCategory[i].SoLuong * $scope.lstCategory[i].Category.PurchasePrice) / 100;
            }

        }
       
      
    }
    //xóa category
    $scope.deleteCategory = function (item) {
        $scope.lstCategory.splice(item, 1);
        $scope.sumCount = 0; $scope.sumPrice = 0; $scope.sumVat = 0;
        for (var i = 0; i < $scope.lstCategory.length; i++) {
            $scope.sumCount += $scope.lstCategory[i].SoLuong;
            $scope.sumPrice += $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.PurchasePrice * 1;
            $scope.sumVat += $scope.lstCategory[i].Thue * ($scope.lstCategory[i].SoLuong * $scope.lstCategory[i].Category.PurchasePrice) / 100;
        }
    };
    //thay đói số lượng,dongia,vat
    $scope.changePrice = function () {
        $scope.sumCount = 0; $scope.sumPrice = 0; $scope.sumVat = 0;
        for (var i = 0; i < $scope.lstCategory.length; i++) {
            $scope.sumCount += $scope.lstCategory[i].SoLuong;
            $scope.sumPrice += $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.PurchasePrice * 1;
            $scope.sumVat += $scope.lstCategory[i].Thue * ($scope.lstCategory[i].SoLuong * $scope.lstCategory[i].Category.PurchasePrice) / 100;
        }
    };
    $('.select2').select2();
    //thay đổi đơn giá
    $scope.saveOrder = function () {
     
        date = $("input[id$='txtDate']").val();
        if ($scope.CompanyId == "" || $scope.SupplierId == "") alert("Chưa nhập đầy đủ thông tin");
        else {
            $scope.lstOrder = [];
            for (var i = 0; i < $scope.lstCategory.length; i++) {
                var item = { CatId: $scope.lstCategory[i].Category.ID, CatNumberImport: $scope.lstCategory[i].SoLuong, SumMoney: $scope.lstCategory[i].SoLuong * 1 * $scope.lstCategory[i].Category.PurchasePrice * 1, Price: $scope.lstCategory[i].Category.PurchasePrice, VAT: $scope.lstCategory[i].Thue, Decription: $scope.Decription, PlaceReceive: $scope.PlaceReceive };
                $scope.lstOrder.push(item);
            }
            $scope.MonenySum = $scope.sumPrice + $scope.sumVat;
         
            OrderImportService.createOrderImport($scope.lstOrder, $scope.SupplierId, $scope.CompanyId, date, $scope.MonenySum).then(function (data) {
                toastr.success('Thêm mới thành công!', "Thông báo");
                $scope.a = [], $scope.lstCategory = []; $scope.a.CatId = "", $scope.Decription = ""; $scope.PlaceReceive = "Hà Nội";
                $scope.sumPrice = 0, $scope.sumVat = 0; $scope.sumCount = 0; $scope.SupplierId = "";
            });
        }
       
    }
    
    
});