
app.controller("ctrl", function ($scope, $http) {
    $scope.custosmers = [];
    $scope.isEdit = true;
    $scope.cus = [];
    $http.get("/api/Custosmer").then(function (response) { $scope.custosmers = response.data; });

    $scope.update = function (cus) {
        $http({
            url: "/api/Custosmer",
            method: "PUT",
            data: JSON.stringify(cus),
            dataType: "json"
        }).then(function (response) { $http.get("/api/Custosmer").then(function (response) { $scope.custosmers = response.data; }); console.log(response.data); $scope.isEdit = true; });
    };
    $scope.edit = function (a) {
        $scope.cus = a;
        $scope.isEdit = false;
    };

});