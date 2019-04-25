
app.controller("HistoryTransactionController", function ($scope, ReportService, MemberService) {
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
    });
    $scope.isDetail = false; $scope.status = "";
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
        ReportService.HistoryTransaction($scope.from, $scope.to,$scope.agent,$scope.status).then(function (data) {
            mylop.stop();
            if (data.length == 0) toastr.warning('Không có bản ghi nào!', "Thông báo");
            else toastr.success('Tìm thấy ' + data.length + ' bản ghi thỏa mãn!', "Thông báo");

            $scope.lst = data;
            console.log(data);
           // toastr.success('Tìm kiếm thành công!', "Thông báo");    
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
        ReportService.HistoryTransaction($scope.from, $scope.to, $scope.agent, $scope.status).then(function (data) {
            mylop.stop();
            $scope.lst = data;
            var nameTable = [];
             nameTable = ["STT", "Mã hàng", "Tên sản phẩm", "Số lượng","Vận chuyển từ","Trạng thái","Người chuyển","Ngày chuyển","Người xác nhận","Ngày xác nhận" ];
            ExportToExcel(data, "Lịch sử chuyển giao", "Report", "Lịch sử chuyển giao hàng", nameTable);
            console.log(data);

        });
       
    }
});