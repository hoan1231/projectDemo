app.factory("RoleManagerService", function ($http, $q, $rootScope) {

    var factory = {};
    factory.ds = [];

    factory.getRoleName = function () {
        return $http.get("/RoleManager/GetRoleName").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    factory.getRole = function () {
        return $http.get("/RoleManager/GetRole").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };

    //lấy danh sách quyền và thành viên
    
    factory.createRole = function (name) {
     
        return $http({
            method: "POST",
            url: "/RoleManager/CreateRole",
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
    //Lấy quyền theo user
    factory.getRoleForUser = function (id) {

        return $http({
            method: "POST",
            url: "/RoleManager/GetRoleForUser",
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
    //Thiêt lập quyền cho user
    factory.setRoleUser = function (userId, roleId, check) {
      
        return $http({
            method: "POST",
            url: "/RoleManager/SetRoleUser",
            dataType: 'json',
            data: { userId: userId,roleId:roleId,check:check },
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
    //Lấy danh sách menu theo quyền và menu cha
    factory.getRoleMenu = function (menuId,roleName) {
      
        return $http({
            method: "POST",
            url: "/RoleManager/GetRoleMenus",
            dataType: 'json',
            data: { menuId: menuId, roleName: roleName },
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
    factory.activeRole = function (roles) {

        return $http({
            method: "POST",
            url: "/RoleManager/ActiveRole",
            dataType: 'json',
            data: { roles: roles },
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
    //Cập nhật lại danh sách quyền menu theo role
    factory.updateRoleMenu = function (roles) {
        
        return $http({
            method: "POST",
            url: "/RoleManager/UpdateRoleMenu",
            dataType: 'json',
            data: { roles: roles },
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
    //lấy danh sach user theo roleId
    factory.getUserByRole = function (roleId) {
     
        return $http({
            method: "POST",
            url: "/Member/GetUserByRole",
            dataType: 'json',
            data: {roleId: roleId },
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

    factory.addMember = function (fullname, name, pass, role) {
       
        return $http({
            method: "POST",
            url: "/Member/AddMember",
            dataType: 'json',
            data: { fullName: fullname, name: name, pass: pass, role: role },
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