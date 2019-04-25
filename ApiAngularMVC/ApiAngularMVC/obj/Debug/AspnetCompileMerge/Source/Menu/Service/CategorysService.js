app.factory("CategorysService", function($http, $q) {
    var factory = {};
    
    // LẤY Danh sach Category
    factory.getCategorys = function () {
       
        return $http.get("/Category/GetCategorys").then(
                    function (success) {
                       
                        return success.data;
                    },
                    function (error) {
                        return $q.reject(error);
                    }
                );
    };
    //Get Category isDelete=false
  
    //lay danh sach san pham theo company
    factory.getCateByCom = function (comp) {
        return $http({
            method: "POST",
            url: "/Category/GetCateByCom",
            dataType: 'json',
            data: { comp: comp },
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
       

    
    // TẠO MỚI Category
    factory.createCategory = function (Category) {
       
        return $http.post("/Category/CreateCategory", Category).then(
                    function(success) {
                        return success.data;
                    },
                    function(error) {
                        return $q.reject(error);
                    }
                );
    };
    
    // CẬP NHẬT Category
    factory.updateCategory = function (Category) {
       
        return $http.post("/Category/UpdateCategory", Category).then(
                    function(success) {
                        return success.data;
                    },
                    function(error) {
                        return $q.reject(error);
                    }
                );
    };
    
    // XÓA Category
    factory.deleteCategory = function (id) {
       
            return $http({
                method: "POST",
                url: "/Category/DeleteCategory",
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
    //lấy category theo id
    factory.getCategoryById = function (id) {

        return $http({
            method: "POST",
            url: "/Category/GetCategoryById",
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
    //lấy category theo id nhập hàng
    factory.getCategoryByIdImport = function (id) {

        return $http({
            method: "POST",
            url: "/Category/GetCategoryByIdImport",
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
    
    //tìm kiếm sản phẩm trong kho hàng
    factory.searchCatInWareHouse= function (CompanyId,NameCat) {
        return $http({
            method: "POST",
            url: "/Category/SearchCatInWareHouse",
            dataType: 'json',
            data: {compaId:CompanyId,nameCat:NameCat },
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
    
    //lưu hàng chuyển giao từ công ty này đên công ty khác
    factory.CatsMove = function (fromCompa, toCompa,CatId,numberCat,address,decription) {
       
        return $http({
            method: "POST",
            url: "/Category/SaveCatsMove",
            dataType: 'json',
            data: { fromCompa: fromCompa, toCompa: toCompa,CatId: CatId,numberCat: numberCat,address: address,decription:decription },
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

    //Lấy danh sách hàng cty trong bảng historyCatCompa
    factory.getCatMove = function (compaId) {
        return $http({
            method: "POST",
            url: "/Category/GetHistoryMoveCat",
            dataType: 'json',
            data: { compaId:compaId },
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
