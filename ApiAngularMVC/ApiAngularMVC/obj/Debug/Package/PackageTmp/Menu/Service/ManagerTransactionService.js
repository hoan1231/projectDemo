app.factory("ManagerTransactionService", function ($http, $q) {
    var factory = {};
//Tạo mới loại
factory.createManagerTransaction = function (name) {

    return $http({
        method: "POST",
        url: "/CatManagerTransaction/CreateManagerTransaction",
        dataManagerTransaction: 'json',
        data: { name: name },
        headers: { "Content-Type": "application/json" }
    }).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
};
    //xác nhận sản phẩm vào kho
factory.saveCatTransaction = function (Cat) {

    return $http({
        method: "POST",
        url: "/Category/SaveCatTransaction",
        dataManagerTransaction: 'json',
        data: { Cat: Cat },
        headers: { "Content-Type": "application/json" }
    }).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
};
factory.cancleTransaction = function (Cat) {

    return $http({
        method: "POST",
        url: "/Category/cancleTransaction",
        dataManagerTransaction: 'json',
        data: { Cat: Cat },
        headers: { "Content-Type": "application/json" }
    }).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
};
    //cập nhât
factory.getCatTransaction = function () {

    return $http({
        method: "POST",
        url: "/Category/GetCatTransaction",
        dataManagerTransaction: 'json',
        data: {},
        headers: { "Content-Type": "application/json" }
    }).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
};
factory.getManagerTransaction = function () {
    return $http.get("/CatManagerTransaction/GetManagerTransaction").then(
                function (success) {

                    return success.data;
                },
                function (error) {
                    return $q.reject(error);
                }
            );
};
return factory;

});