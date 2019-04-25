app.factory("SupplierService", function($http, $q) {
    var factory = {};
//Tạo mới loại
factory.createSupplier = function (name,address,phone) {
   
    return $http({
        method: "POST",
        url: "/Supplier/CreateSupplier",
        dataSupplier: 'json',
        data: { name:name,address:address,phone:phone},
        headers: { "Content-Supplier": "application/json" }
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
factory.updateSupplier = function (id,name, address, phone) {
    return $http({
        method: "POST",
        url: "/Supplier/UpdateSupplier",
        dataSupplier: 'json',
        data: { id:id,name: name, address: address, phone: phone },
        headers: { "Content-Supplier": "application/json" }
    }).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
};
    //Xóa
factory.deleteSupplier = function (id) {

    return $http({
        method: "POST",
        url: "/Supplier/DeleteSupplier",
        dataType: 'json',
        data: { id: id },
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
factory.getSupplier = function () {
    return $http.get("/Supplier/GetSupplier").then(
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