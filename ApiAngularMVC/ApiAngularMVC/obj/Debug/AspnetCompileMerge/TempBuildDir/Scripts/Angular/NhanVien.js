app.controller("myctrl", function ($scope, $http) {
    $scope.nv1 = [];
    $scope.emp = [];
    //$http.get("/api/NhanVien").then(function (response) {
    //    $scope.nhanviens = response.data;
    //    $scope.emp = response.data;
    //});

    $scope.droplst = "";
    $scope.isAdd = true;
    $scope.isUpdate = true;
    $scope.Add = function () { $scope.isAdd = !$scope.isAdd; $scope.isUpdate = true; };
    $scope.showAll = function () {
        $http.get("/api/NhanVien").then(function (response) {
            $scope.nhanviens = response.data;
            $scope.emp = response.data;
        });
    };
    $scope.insert = function (a) {
        $http({
            url: "/api/NhanVien",
            method: "POST",
            data: JSON.stringify(a),
            dataType: "json"
        }).then(function (response) {
            $http.get("/api/NhanVien").then(function (response) {
                $scope.nhanviens = response.data;
                //   $scope.nv = [{ MaNV: "", TenNV: "", DiaChi: "" }];
                $scope.isAdd = true;
            });
        });

    };

    $scope.delete = function (nv) {
        $http({
            url: "/api/NhanVien?id=" + nv,
            method: "Delete",
            data: nv
        }).then(function (response) {
            $http.get("/api/NhanVien").then(function (response) {
                $scope.nhanviens = response.data;
                //   $scope.nv = [{ MaNV: "", TenNV: "", DiaChi: "" }];
            });
            alert("xoa thanh cong 1 ban ghi");
        });
    };
    $scope.updateclick = function (nv) {
        $http({
            url: "/api/NhanVien",
            method: "PUT",
            data: JSON.stringify(nv),
            dataType: "json"
        }).then(function (response) {
            $http.get("/api/NhanVien").then(function (response) {
                $scope.nhanviens = response.data;
                $scope.nv1 = [];
                $scope.isUpdate = true;
            });
        });
    };
    $scope.changedrop = function () {
        $scope.isAdd = true;
        $scope.isUpdate = true;
        $http({
            method: "GET",
            url: "/api/NhanVien/" + $scope.droplst,
            data: JSON.stringify($scope.droplst),
            dataType: "json"
        }).then(function (response) { $scope.nhanviens = response.data; })
    }
    $scope.updateclick1 = function (a) {
        $scope.isUpdate = false;
        $scope.isAdd = true;
        $scope.nv1 = a;
        console.log($scope.nv1);
    };
});
