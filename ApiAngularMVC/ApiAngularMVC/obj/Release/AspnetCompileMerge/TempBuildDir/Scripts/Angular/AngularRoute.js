
app.config(function ($routeProvider) {
    $routeProvider
        .when("/Menu", {
            templateUrl: "/Home/Menu", controller: "myctrl"
        })
         .when("/SetPermissions/:role", {
             templateUrl: "/Home/SetPermissions", controller: "SetPermissionController"
         })
         .when("/ManagerPermissions", {
             templateUrl: "/Home/ManagerPermissions", controller: "RoleManagerController"
         })
        .when("/AddMember", {
            templateUrl: "/Home/AddMember", controller: "AddMemberController"
        })
        .when("/Categorys", {
            templateUrl: "/Home/Categorys", controller: "CategoryController"
        })
     .when("/ListMember", {
         templateUrl: "/Home/ListMember", controller: "ListMemberController"
     })
        .when("/Customer", {
            templateUrl: "/Home/Customer", controller: "CustomerController"
        })
         .when("/Supplier", {
             templateUrl: "/Home/Supplier", controller: "SupplierController"
         })
        .when("/Company", {
            templateUrl: "/Home/Company", controller: "CompanyController"
        })
         .when("/OrderImport", {
             templateUrl: "/Home/CreateOrderImport", controller: "OrderImportController"
         })
         .when("/OrderSale", {
             templateUrl: "/Home/CreateOrderSale", controller: "OrderSaleController"
         })
        .when("/ManagerWareHouse", {
            templateUrl: "/Home/ManagerWareHouse", controller: "WareHouseController"
        })
         .when("/WareHouse", {
             templateUrl: "/Home/WareHouse", controller: "WareHouse1Controller"
         })
         .when("/ManagerTransaction", {
             templateUrl: "/Home/ManagerTransaction", controller: "ManagerTransactionController"
         })
        .when("/ReportByDay", {
            templateUrl: "/Home/ReportByDay", controller: "ReportByDayController"
        })
         .when("/ReportExpense", {
             templateUrl: "/Home/ReportExpense", controller: "ReportExpenseController"
         })
         .when("/ReportProductivity", {
             templateUrl: "/Home/ReportProductivity", controller: "ReportProductivityController"
         })
              .when("/HistoryTransaction", {
                  templateUrl: "/Home/HistoryTransaction", controller: "HistoryTransactionController"
              })
         .when("/ReportCategory", {
             templateUrl: "/Home/ReportCategory", controller: "ReportCategoryController"
         })
        .when("/HistoryLogin", {
            templateUrl: "/Home/HistoryLogin", controller: "HistoryLoginController"
        })
        .when("/InfoUser", {
            templateUrl: "/Home/InfoUser", controller: "InfoUserController"
        })
        .otherwise({
            templateUrl: "/Home/Dashboard", controller: "ReportCategoryController"
        });
});