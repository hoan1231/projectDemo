
app.controller("CategoryController", function ($scope, CatTypeService, CatMaterialService, CompanyService, CategorysService, CatManufacturerService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    $scope.lstType = [], $scope.lstMaterial = [], $scope.matCode = "", $scope.matColor = "", $scope.matName = "", $scope.cat = [];
    $scope.changeType = true, $scope.changeMaterial = true, $scope.changeManufacturer = true; $scope.NameType = true, $scope.isValidateLabel = true, $scope.isValidateType = true; $scope.isValidateManufacturer = true;
   $scope.lstCategorys = [], $scope.isAdd = true; $scope.changeCat = true; $scope.isInsert = false; $scope.isList = true;
    $scope.c = {};
    $scope.$watch('changeType', function () {
        CatTypeService.getType().then(function (data) {
            $scope.lstType = data;
        });
    });
    $scope.$watch('changeManufacturer', function () {
        CatManufacturerService.getManufacturer().then(function (data) {
            $scope.lstManufacturer = data;
        });
    });
    $scope.$watch('changeCat', function () {
        CategorysService.getCategorys().then(function (data) {
            console.log(data);
            $scope.lstCategorys = data;
        });

    });
    $scope.$watch('changeMaterial', function () {
        CatMaterialService.getMaterial().then(function (data) {
            $scope.lstMaterial = data;
        });
    });
    CompanyService.getCompany().then(function (data) {
        $scope.lstCompany = data;
    });
    $scope.NameType = "";
    $scope.saveType = function (name) {
        if (name == "") $scope.isValidateType = false;
        else {
            CatTypeService.createType(name).then(function (data) {
                $('#modalType').modal('toggle');
                $scope.changeType = !$scope.changeType;
                $scope.NameType = "";
                alert("Thêm mới thành công");
            });
        }
      
    };
    $scope.NameManufacturer = "";
    $scope.saveManufacturer = function (name) {
        if (name == "") $scope.isValidateManufacturer = false;
        else {
            CatManufacturerService.createManufacturer(name).then(function (data) {
                $('#modalManufacturer').modal('toggle');
                $scope.changeManufacturer = !$scope.changeManufacturer;
                $scope.NameManufacturer = "";
                toastr.success('Thêm mới thành công!', "Thông báo");
            });
        }

    };
    $scope.saveMaterial = function () {
        if ($scope.matCode == "" || $scope.matColor == "" || $scope.matName == "") $scope.isValidateLabel = false;
        else {
            CatMaterialService.createMaterial($scope.matCode, $scope.matName, $scope.matColor).then(function (data) {
                $('#modalLabel').modal('toggle');
                $scope.changeMaterial = !$scope.changeMaterial;
                $scope.matCode = "", $scop.matName = "", $scope.matColor = "";
                alert("Thêm mới thành công");
            });
        }
    }
    $scope.addCat = function (item) {
        console.log(item);
        CategorysService.createCategory(item).then(function (data) {
            toastr.success('Thêm mới thành công!', "Thông báo");
            $scope.isList = false;
            $scope.changeCat = !$scope.changeCat;
        });
    };
    
  
    $scope.updateCat = function () {
        CategorysService.updateCategory($scope.c).then(function (data) {
            console.log(data);
            if (data == "succ") {
                $scope.changeCat = !$scope.changeCat;
                toastr.success('Cập nhật thành công!', "Thông báo");
            }
            else alert("Tiến trình bị lỗi. Vui lòng thực hiện lại");
        });
        $scope.isAdd = true;
    }
    $scope.editCategory = function (item) {
        $scope.c = item;
        $scope.isAdd = false;
        $scope.isInsert = false;
        $scope.isList = false;
    };
    $scope.deleteCategory = function (item) {
        CategorysService.deleteCategory(item).then(function (data) {

            if (data == "succ") {
                $scope.changeCat = !$scope.changeCat;
                toastr.success('Xóa thành công!', "Thông báo");
            }
            else alert("Tiến trình bị lỗi. Vui lòng thực hiện lại");
        });
        $scope.isAdd = false;
       
    }
    $scope.lstCat = function () {
        $scope.isAdd = false;
        $scope.isInsert = true;
        $scope.isList = false;
    };
    $scope.lstAdd = function () {
        $scope.isAdd = true;
        $scope.isList = true;
        $scope.isInsert = false;
        $scope.c = {};
    }
    });

    
  
