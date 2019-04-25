
app.controller("ReportProductivityController", function ($scope, ReportService, MemberService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    console.log($scope.roleMenu);
    $('#fromDate').datepicker({
        format: 'dd/mm/yyyy',
        defaultDate: 'now'
    }).datepicker("setDate", new Date());
    $('#toDate').datepicker({
        format: 'dd/mm/yyyy',
        defaultDate: 'now'
    }).datepicker("setDate", new Date());
    MemberService.getAgentByCompa().then(function (data) {
        $scope.lstAgent = data;
        console.log(data);
    });
    $scope.isDetail = false;
    $scope.lsCategory = [];
    $scope.search = function () {
        $scope.isDetail = false;
        var itemDisableds = [$('#btnSearch'),$('#btnExcel')];
        var mylop = new myMpLoop($('#btnSearch'), 'Đang xử lý', $('#btnSearch').html(), itemDisableds);
        mylop.start();
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.ReportProductivity($scope.from, $scope.to,$scope.agent).then(function (data) {
            mylop.stop();
            $scope.lst = data;
            console.log(data);
            toastr.success('Tìm kiếm thành công!', "Thông báo");    
        });
    }
    $scope.detailHDNhap = function (item) {
        $scope.isDetail = true;
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.detailHDNhap(item,$scope.from,$scope.to).then(function (data) {
            if (data.length == 0) { toastr.warning("Không có dữ liệu","Thông báo"); $scope.isDetail = false; }
            $scope.lstDetailHD = data;
            console.log(data);
        });
    }
    $scope.detailHDBan = function (item) {
        $scope.isDetail = true;
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.detailHDBan(item, $scope.from, $scope.to).then(function (data) {
            if (data.length == 0) { toastr.warning("Không có dữ liệu","Thông báo"); $scope.isDetail = false; }
            $scope.lstDetailHD = data;
            
        });
    }
    $scope.btnExport = function () {
        var itemDisableds = [$('#btnSearch'), $('#btnExcel')];
        var mylop = new myMpLoop($('#btnExcel'), 'Đang xử lý', $('#btnExcel').html(), itemDisableds);
        mylop.start();
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.ReportProductivity($scope.from, $scope.to, $scope.agent).then(function (data) {
            mylop.stop();
            $scope.lst = data;
            var nameTable = [];
             nameTable = ["STT", "Tên nhân viên", "Tổng hóa đơn nhập", "Tổng hóa đơn bán"];
            ExportToExcel(data, "Báo cáo năng suất", "Report", "Báo cáo năng suất", nameTable);
            console.log(data);

        });
       
    }
});