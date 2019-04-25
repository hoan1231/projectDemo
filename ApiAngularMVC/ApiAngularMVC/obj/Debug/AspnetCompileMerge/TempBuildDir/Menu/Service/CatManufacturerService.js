app.factory("CatManufacturerService", function($http, $q) {
    var factory = {};
//Tạo mới loại
factory.createManufacturer = function (name) {
   
    return $http({
        method: "POST",
        url: "/CatManufacturer/CreateManufacturer",
        dataType: 'json',
        data: {name:name},
        headers: { "Content-Manufacturer": "application/json" }
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
factory.updateManufacturer = function (name) {
    return $http({
        method: "POST",
        url: "/CatManufacturer/UpdateManufacturer",
        dataManufacturer: 'json',
        data: { name: name },
        headers: { "Content-Manufacturer": "application/json" }
    }).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
};
factory.getManufacturer = function () {
    return $http.get("/CatManufacturer/GetManufacturer").then(
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