app.factory("MemberService", function ($http, $q) {
    var factory = {};


    // TẠO MỚI Menu
    factory.addMember = function (fullname,name,pass,role,company,email,address,phone) {
       
        return $http({
            method: "POST",
            url: "/Member/AddMember",
            dataType: 'json',
            data: {fullName: fullname,name:name,pass:pass,role:role,company:company,email:email,address:address,phone:phone},
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

    factory.getMember = function () {
        return $http.get("/Member/GetMember").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    //lay thong tin user dang nhap
    factory.getInfoUser = function () {
        return $http.get("/Member/GetInfoUser").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    factory.getAgent = function () {
        return $http.get("/Member/GetAgent").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    //get agent by company
    factory.getAgentByCompa = function () {
        return $http.get("/Member/GetAgent").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    //log out
    factory.signOut = function () {
        return $http.get("/Member/SignOut").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    // CẬP NHẬT Menu
    factory.UpdateMenu = function (menu) {

        return $http.post("/MenuMVC/UpdateMenu", menu).then(
                    function (success) {
                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };

    // XÓA MENU
    factory.deleteMenu = function (id) {

        return $http({
            method: "POST",
            url: "/MenuMVC/DeleteMenu",
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
    //Thay doi password
    factory.changePass = function (id,passOld,pass) {

        return $http({
            method: "POST",
            url: "/Member/ChangePass",
            dataType: 'json',
            data: { id: id ,passOld:passOld,pass:pass},
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
    //Import file user
    factory.importFile = function (id) {
    
        return $http({
            method: "post",
            withCredentials: true,
            url: "/Member/ImportMember", headers: {
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

    factory.updateMember = function (x) {

        return $http({
            method: "POST",
            url: "/Member/UpdateMember",
            dataType: 'json',
            data: { x:x },
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
    return factory;

});