
app.controller("ReportByDayController", function ($scope, ReportService, MemberService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    $scope.hd = "2";
    $('#fromDate').datepicker({
        format: 'dd/mm/yyyy',
        defaultDate: 'now'
    }).datepicker("setDate", new Date());
    $('#toDate').datepicker({
        format: 'dd/mm/yyyy',
        defaultDate: 'now'
    }).datepicker("setDate", new Date());
    $scope.nameColumn = "Tên nhà cung cấp";
    
    MemberService.getAgent().then(function (data) {
        $scope.lstAgent = data;
        console.log(data);
    });
    
    $scope.lsCategory = [];
    $scope.search = function () {
        if ($scope.hd != "2") $scope.nameColumn = "Tên khách hàng";
        else $scope.nameColumn = "Tên nhà cung cấp";
        var itemDisableds = [$('#btnSearch', '#btnExcel')];
        var mylop = new myMpLoop($('#btnSearch'), 'Đang xử lý', $('#btnSearch').html(), itemDisableds);
        mylop.start();
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.ReportByDay($scope.from, $scope.to, $scope.agent, $scope.hd).then(function (data) {
            mylop.stop();
            if (data.length == 0) toastr.warning('Không có bản ghi nào!', "Thông báo");
            else toastr.success('Tìm thấy ' + data.length + ' bản ghi thỏa mãn!', "Thông báo");
            $scope.lst = data;
          
            
        });
    }
    $scope.btnExport = function () {
        if ($scope.hd == "1") $scope.nameColumn = "Tên khách hàng";
        else $scope.nameColumn = "Tên nhà cung cấp";
        var itemDisableds = [$('#btnSearch', '#btnExcel')];
        var mylop = new myMpLoop($('#btnSearch'), 'Đang xử lý', $('#btnSearch').html(), itemDisableds);
        mylop.start();
        var fromDate = $("#fromDate").datepicker("getDate");
        var toDate = $("#toDate").datepicker("getDate");
        $scope.from = $.datepicker.formatDate("dd/mm/yy", fromDate);
        $scope.to = $.datepicker.formatDate("dd/mm/yy", toDate);
        ReportService.ReportByDay($scope.from, $scope.to, $scope.agent, $scope.hd).then(function (data) {
            mylop.stop();
            for (var i = 0; i < data.length; i++)
            {
                var date = new Date(parseInt(data[i].CreatedDate.replace(/(^.*\()|([+-].*$)/g, '')));
                var dateString = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                data[i].CreatedDate = dateString;
            }
            var nameTable = ["STT", "Mã hóa đơn", "Tên nhà cung cấp", "Tổng tiền", "Nhân viên","Ngày lập hóa đơn"];
            ExportToExcel(data, "Báo cáo hóa đơn theo ngày", "Report", "Báo cáo hóa đơn", nameTable);
            console.log(data);

        });

    }
});