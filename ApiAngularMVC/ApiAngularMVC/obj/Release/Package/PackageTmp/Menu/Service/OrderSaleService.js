app.factory("OrderSaleService", function($http, $q) {
    var factory = {};
//Tạo mới loại
factory.createOrderSale = function (list,supp,comp,date,sum) {

    return $http({
        method: "POST",
        url: "/OrderSale/CreateOrderSale",
        dataOrderSale: 'json',
        data: { list:list,supp:supp,comp:comp,date:date,sum},
        headers: { "Content-OrderSale": "application/json" }
    }).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
};
factory.importFile = function (id) {
    
    return $http({
        method: "post",
        withCredentials: true,
        url: "/OrderSale/ImportOrderSale", headers: {
            'Content-Type': undefined
        },
        transformRequest: angular.identity,
        data: id,
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