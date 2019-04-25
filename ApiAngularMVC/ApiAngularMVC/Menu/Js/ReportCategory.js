
app.controller("ReportCategoryController", function ($scope, ReportService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    $scope.typeReport = "1";
    $('#fromDate').datepicker({
        format: 'dd/mm/yyyy',
        defaultDate: 'now'
    }).datepicker("setDate", new Date());
    $('#toDate').datepicker({
        format: 'dd/mm/yyyy',
        defaultDate: 'now'
    }).datepicker("setDate", new Date());
   
    
    $scope.lsCategory = [];
    $scope.search = function () {
      
        if ($scope.hd == "1") $scope.nameColumn = "Tên khách hàng";
        else $scope.nameColumn = "Tên nhà cung cấp";
        var itemDisableds = [$('#btnSearch'),$('#btnExcel')];
        var mylop = new myMpLoop($('#btnSearch'), 'Đang xử lý', $('#btnSearch').html(), itemDisableds);
        mylop.start();
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.reportCategory($scope.from, $scope.to,$scope.typeReport,$scope.count).then(function (data) {
            mylop.stop();
            if (data.length == 0) toastr.warning('Không có bản ghi nào!', "Thông báo");
            else toastr.success('Tìm thấy ' + data.length + ' bản ghi thỏa mãn!', "Thông báo");
            $scope.lst = data;
           
            
        });
    }
    $scope.btnExport = function () {
        var itemDisableds = [$('#btnSearch'), $('#btnExcel')];
        var mylop = new myMpLoop($('#btnSearch'), 'Đang xử lý', $('#btnSearch').html(), itemDisableds);
        mylop.start();
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.reportCategory($scope.from, $scope.to, $scope.typeReport, $scope.count).then(function (data) {
            mylop.stop();
            var nameFile;
            if ($scope.typeReport == "1") nameFile = "sản phẩm bán chạy nhất";
            else nameFile=" sản phẩm tồn kho nhiều nhất"
            var nameTable = [];
              var  nameTable = ["STT", "Tên sản phẩm", "Số lượng tồn kho", "Số lượng nhập", "Số lượng bán ","Tổng tiền bán"];
             ExportToExcel(data, "Báo cáo "+nameFile, "Report", "Báo cáo "+nameFile, nameTable);
            console.log(data);

        });
       
    }
});