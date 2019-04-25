app.factory("CompanyService", function ($http, $q) {
    var factory = {}; 
    factory.getCompany = function () {
        return $http.get("/Company/GetCompany").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    factory.getCompanyLogin = function () {
        return $http.get("/Company/GetCompanyLogin").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    factory.getIdCompany = function () {
        return $http.get("/Company/GetIdCompany").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    //Tạo mới loại
    factory.createCompany = function (name, address, phone) {

        return $http({
            method: "POST",
            url: "/Company/CreateCompany",
            dataCompany: 'json',
            data: { name: name, address: address, phone: phone },
            headers: { "Content-Company": "application/json" }
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
    factory.updateCompany = function (id, name, address, phone) {
        return $http({
            method: "POST",
            url: "/Company/UpdateCompany",
            dataCompany: 'json',
            data: { id: id, name: name, address: address, phone: phone },
            headers: { "Content-Company": "application/json" }
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
    factory.deleteCompany = function (id) {

        return $http({
            method: "POST",
            url: "/Company/DeleteCompany",
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
    factory.getIdCompany1 = function () {
        return $http.get("/Company/GetIdCompany1").then(
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