app.factory("OrderImportService", function($http, $q) {
    var factory = {};
//Tạo mới loại
factory.createOrderImport = function (list,supp,comp,date,sum) {
    
    return $http({
        method: "POST",
        url: "/OrderImport/CreateOrderImport",
        dataOrderImport: 'json',
        data: { list:list,supp:supp,comp:comp,date:date,sum},
        headers: { "Content-OrderImport": "application/json" }
    }).then(
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