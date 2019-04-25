
app.controller("ReportExpenseController", function ($scope, ReportService, MemberService, UserFactory) {
    $scope.roleMenu = UserFactory.CheckRoleMenu();
    $scope.hd = "2";
    
    $scope.nameColumn = "Tên nhà cung cấp";
    $('#fromDate').datepicker({
        format: 'dd/mm/yyyy',
        defaultDate: 'now'
    }).datepicker("setDate", new Date());
    $('#toDate').datepicker({
        format: 'dd/mm/yyyy',
        defaultDate: 'now'
    }).datepicker("setDate", new Date());
    MemberService.getAgent().then(function (data) {
        $scope.lstAgent = data;
        console.log(data);
    });
    
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
        ReportService.ReportExpense($scope.from, $scope.to,$scope.hd).then(function (data) {
            mylop.stop();
            if (data.length == 0) toastr.warning('Không có bản ghi nào!', "Thông báo");
            else toastr.success('Tìm thấy ' + data.length + ' bản ghi thỏa mãn!', "Thông báo");
            $scope.lst = data;
            var lableCircular = [], dataCircular = [];
            for (var i = 0; i < data.length; i++)
            {
                lableCircular.push(data[i].Name);
                dataCircular.push(data[i].TongTien);
            }
           
            $("#pie").html("").html('<canvas id="pie-chart" width="70" height="50"></canvas>');

            var chart = new Chart(document.getElementById("pie-chart"), {
                type: 'pie',
                data: {
                    labels: lableCircular,
                    datasets: [{
                        label: "Số lượng",
                        //  backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: dataCircular
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Báo cáo thống kê doanh thu'
                    }
                }
            });
          
            toastr.success('Cập nhật thành công!', "Thông báo");

           
            
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
        ReportService.ReportExpense($scope.from, $scope.to,$scope.hd).then(function (data) {
            mylop.stop();
            var nameTable = [];
            $scope.lst = data;
            if($scope.hd=="2")
                nameTable = ["STT", "Tên chi nhánh", "Địa chỉ", "Số điện thoại", "Tổng tiền thu "];
            else nameTable = ["STT", "Tên chi nhánh", "Địa chỉ", "Số điện thoại", "Tổng tiền chi"];
            ExportToExcel(data, "Báo cáo doanh thu", "Report", "Báo cáo doanh thu", nameTable);
            console.log(data);

        });
       
    }
});