app.factory("CatTypeService", function($http, $q) {
    var factory = {};
//Tạo mới loại
factory.createType = function (name) {

    return $http({
        method: "POST",
        url: "/CatType/CreateType",
        dataType: 'json',
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
    //cập nhât
factory.updateType = function (name) {
    return $http({
        method: "POST",
        url: "/CatType/UpdateType",
        dataType: 'json',
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
factory.getType = function () {
    return $http.get("/CatType/GetType").then(
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