
app.controller("WareHouseController", function ($scope, CatTypeService, CatMaterialService, CompanyService, CategorysService, CatManufacturerService) {
    $scope.nameCat = ""; $scope.changeData = true; $scope.Company = ""; $scope.lsCategory = [];
    CompanyService.getCompany().then(function (data) {
        $scope.lstCompany = data;
        $scope.lstCompanyMove = data;
       
    });
        CatManufacturerService.getManufacturer().then(function (data) {
            $scope.lstManufacturer = data;
        });
        $scope.search = function () {
            if ($scope.Company == undefined || $scope.Company == "") alert("Chưa chọn chi nhánh");
            else
            $scope.changeData=!$scope.changeData;
        };
    $scope.$watch('changeMaterial', function () {
        CatMaterialService.getMaterial().then(function (data) {
            $scope.lstMaterial = data;
        });
    });
   
    //CompanyService.getIdCompany().then(function (data) {
    //    console.log("getda");
    //    console.log(data);
    //    $scope.dataCompaId = data;
    //});
    $scope.Company = $scope.dataCompaId;
    $scope.lstCat = []; $scope.lstCategory = [];
    $scope.$watch('changeData', function () {
        $scope.lstCat = []; $scope.lstCategory = []; $scope.lstMoveCat = [];
        if ($scope.Company != undefined) {
            CategorysService.searchCatInWareHouse($scope.Company.Id, $scope.nameCat).then(function (data) {
                $scope.lstCat = data;
            });
            CategorysService.getCatMove($scope.Company.Id).then(function (data) {
               
                $scope.lstMoveCat = data
               
                for (var i = 0; i < $scope.lstCat.length; i++) {
                    var CatId = $scope.lstCat[i].ID; var CompanyId = $scope.lstCat[i].CompanyId;
                    for (var j = 0; j < $scope.lstMoveCat.length; j++) {
                        if (CatId == $scope.lstMoveCat[j].CatId) {
                            if (CompanyId == $scope.lstMoveCat[j].FromCompanyId) $scope.lstCat[i].NumberTransfer += $scope.lstMoveCat[j].SumNumber;
                            if (CompanyId == $scope.lstMoveCat[j].ToCompanyId) $scope.lstCat[i].NumberTo += $scope.lstMoveCat[j].SumNumber;
                        }
                        $scope.lstCat[i].NumberTransfer = parseInt($scope.lstCat[i].NumberTransfer, 10);
                        $scope.lstCat[i].NumberTo = parseInt($scope.lstCat[i].NumberTo, 10);
                    }
                }
                $scope.lsCategory = $scope.lstCat;
                if ($scope.lsCategory.length == 0) toastr.warning('Không có bản ghi nào!', "Thông báo");
                else toastr.success('Tìm thấy ' + $scope.lsCategory.length + ' bản ghi thỏa mãn!', "Thông báo");

            });
        }
        
        
    });
    $scope.moveCategory = function (item) {
       
        console.log($scope.Company);
        $scope.nameCatMove = item.CatName;
        $scope.CatIdMove = item.ID;
        $scope.company = item.CompanyId;
        $scope.max = item.SumNumber - item.NumberTransfer;
        $scope.testMax = $scope.max;
    }
    $scope.numberCatMove = "0";
    $scope.changeCompany = function () {
        $scope.addressTo = $scope.Company.Address + " --> " + $scope.CompanyMove.Address;
    };
    $scope.changeNumberMove = function () {
        if (($scope.numberCatMove - $scope.max) > 0) $scope.numberCatMove = $scope.max;
    }
    $scope.saveCatMove = function () {
        if ($scope.numberCatMove == "0" || $scope.numberCatMove == "") alert("Chưa chọn số lượng");
        else {
            if ($scope.CompanyMove == undefined ||$scope.CompanyMove=="") alert("Chưa chọn chi nhánh cần chuyển giao");
            else {
                CategorysService.CatsMove($scope.Company.Id, $scope.CompanyMove.Id, $scope.CatIdMove, $scope.numberCatMove, $scope.addressTo, $scope.Decription).then(function (data) {
                    if (data == "succ") {
                        $scope.numberCatMove="", $scope.addressTo="", $scope.Decription = "";
                        toastr.success('Chuyển giao hàng thành công!', "Thông báo");
                        $scope.changeData=!$scope.changeData;
                    }
                    else alert("Tiến trình bị lỗi. Vui lòng thực hiện lại");
                    console.log(data);
                    $('#modalType').modal('toggle');
                });
            }
        }
    }
    });

    
  
