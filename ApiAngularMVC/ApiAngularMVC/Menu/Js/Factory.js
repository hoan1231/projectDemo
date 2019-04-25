app.factory("CommonService", function ($http, $q) {

    var factory = {};
    factory.doGet = function (url) {
        return $http.get(url).then(
            function (success) {
                return success.data;
            },
            function (error) {
                return $q.reject(error);
            }
        );
    };
    factory.doPost = function (url, data) {
        return $http({
            method: "POST",
            url: url,
            data: data

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
app.factory("UserFactory", function ($window) {
    var fac = {};
    fac.RoleMenu = null;
    fac.GetRoleMenu = function () {
        fac.RoleMenu = angular.fromJson($window.localStorage['_roleMenu']);
        return fac.RoleMenu;
    }
    var result = [];
    fac.CheckRoleMenu = function () {
        result = [];
        var a = $window.location.href.split("/");
        if (a[3] != "#") {
        
            var link = "#!" + ($window.location.href).split("#!/")[1];
            var listRoleMenu = fac.GetRoleMenu();

            for (var i = 0; i < listRoleMenu.length; i++) {
                if (listRoleMenu[i].MenuUrl === link) {
                    if (listRoleMenu[i].IsShow) {
                        result.push(listRoleMenu[i]);
                        break;
                    }
                }
            }
            if (result.length === 0) {
                alert("Không có quyền truy cập vào menu này!");
                $window.location.href = "/#";
            }
            return result[0];
        }
       

      

    }
    fac.GetTitle = function () {
        if (result.length != 0) {
            return result[0].MenuName;
        }
        else
        return "";
    }
    return fac;
});
