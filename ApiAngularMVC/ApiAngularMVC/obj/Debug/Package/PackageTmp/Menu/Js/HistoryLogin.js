
app.controller("HistoryLoginController", function ($scope, ReportService, MemberService) {
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
    $scope.isDetail = false;
    $scope.lsCategory = [];
    $scope.search = function () {
       
        var itemDisableds = [$('#btnSearch'),$('#btnExcel')];
        var mylop = new myMpLoop($('#btnSearch'), 'Đang xử lý', $('#btnSearch').html(), itemDisableds);
        mylop.start();
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.historyLogin($scope.from, $scope.to,$scope.agent).then(function (data) {
            mylop.stop();
            if (data.length == 0) toastr.warning('Không có bản ghi nào!', "Thông báo");
            else toastr.success('Tìm thấy ' + data.length + ' bản ghi thỏa mãn!', "Thông báo");
            $scope.lst = data; 
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
        ReportService.historyLogin($scope.from, $scope.to, $scope.agent).then(function (data) {
            mylop.stop();
            for (var i = 0; i < data.length; i++) {
                var date = new Date(parseInt(data[i].DateLogin.replace(/(^.*\()|([+-].*$)/g, '')));
                var dateString = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                data[i].DateLogin = dateString;
            }
            var nameTable = [];
             nameTable = ["STT", "Tên đăng nhập", "Trạng thái", "Ngày đăng nhập"];
            ExportToExcel(data, "Lịch sử đăng nhập", "history", "Lịch sử đăng nhập", nameTable);
           
        });
       
    }
});