app.factory("CatMaterialService", function($http, $q) {
    var factory = {};
//Tạo mới loại
factory.createMaterial = function (matCode,matName,matColor) {
  
    return $http({
        method: "POST",
        url: "/CatMaterial/CreateMaterial",
        dataMaterial: 'json',
        data: { code: matCode,name:matName,color:matColor },
        headers: { "Content-Material": "application/json" }
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
factory.updateMaterial = function (name) {
    return $http({
        method: "POST",
        url: "/CatMaterial/UpdateMaterial",
        dataMaterial: 'json',
        data: { name: name },
        headers: { "Content-Material": "application/json" }
    }).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
};
factory.getMaterial = function () {
    return $http.get("/CatMaterial/GetMaterial").then(
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