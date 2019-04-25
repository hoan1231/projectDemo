app.factory("MenuService", function ($http, $q, $rootScope) {
    var factory = {};
    factory.data = false;
    factory.sendData = function (data) {
        this.data = data;
        $rootScope.$broadcast('data_shared');
    };
    factory.getData = function () {
        return this.data;
    }; 
    factory.getRoleMenuByUser = function () {
        return $http.get("/MenuMVC/GetRoleMenuByUser").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    // LẤY Danh sach Menu
    factory.getAllMenu = function () {
        return $http.get("/MenuMVC/GetAll").then(
                    function (success) {
                       
                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    //Get menu isDelete=false
    factory.getAllMenu1 = function () {
        return $http.get("/MenuMVC/GetAll1").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    //Get menu theo ID
    factory.getMenu = function (id) {
       
        return $http({
            method: "POST",
            url: "/MenuMVC/GetMenu",
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
    // LẤY menu cha
    factory.getMenuParent = function () {
        return $http.get("/MenuMVC/GetMenuParent").then(
                    function (success) {

                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    // TẠO MỚI Menu
    factory.createMenu = function (menu) {
       
        return $http.post("/MenuMVC/CreateMenu", menu).then(
                    function(success) {
                        return success.data;
                    },
                    function(error) {
                        return $q.reject(error);
                    }
                );
    };
    
    // CẬP NHẬT Menu
    factory.UpdateMenu = function (menu) {
       
        return $http.post("/MenuMVC/UpdateMenu", menu).then(
                    function(success) {
                        return success.data;
                    },
                    function(error) {
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
                    function(success) {
                        return success.data;
                    },
                    function(error) {
                        return $q.reject(error);
                    }
                );
    };
    
    return factory;
    
});
//use service
//app.controller("ImportDataManagerController", function ($scope, SweetAlert, $uibModal, ngTableParams, ImportDataManagerService, CampaignEmailManagerService) {
    
//    var changedCampaignSuccess = false;
//    var choosenExcelFileSuccess = false;
//    $scope.typeCheckModel = "1";
//    $scope.campaignModel = "";
//    $scope.messageChangeCampaign = "";
//    $scope.disableButtonUpload = true;
//    $scope.fileNameChoosen = "";
//    $scope.messageChoosenFile = "";
//    $scope.fileSizeChoosen="";
//    // DOWNLOAD FILE EXCEL MẪU
//    $scope.downloadTemplateExcel = function () {
//        ImportDataManagerService.downloadTemplateExcel();
//    };
    
    // DANH SÁCH CHIẾN DỊCH GỬI EMAIL CỦA CTY
    
