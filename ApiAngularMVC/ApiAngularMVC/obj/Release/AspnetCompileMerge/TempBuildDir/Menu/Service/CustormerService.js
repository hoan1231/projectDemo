app.factory("CustomerService", function($http, $q) {
    var factory = {};
//Tạo mới loại
factory.createCustomer = function (name,address,phone,date,sex,email) {
    return $http({
        method: "POST",
        url: "/Customer/CreateCustomer",
        dataCustomer: 'json',
        data: { name:name,address:address,phone:phone,date:date,sex:sex,email:email },
        headers: { "Content-Customer": "application/json" }
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
factory.updateCustomer = function (id,name, address, phone, date, sex, email) {
    return $http({
        method: "POST",
        url: "/Customer/UpdateCustomer",
        dataCustomer: 'json',
        data: { id:id,name: name, address: address, phone: phone, date: date, sex: sex, email: email },
        headers: { "Content-Customer": "application/json" }
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
factory.deleteCustomer = function (id) {

    return $http({
        method: "POST",
        url: "/Customer/DeleteCustomer",
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
factory.getCustomer = function () {
    return $http.get("/Customer/GetCustomer").then(
       
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