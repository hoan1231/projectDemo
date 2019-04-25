app.factory("ReportService", function($http, $q) {
    var factory = {};
//Tìm kiếm theo ngày
    factory.ReportByDay = function (fromDate, toDate, agent, typeReport) {

    return $http({
        method: "POST",
        url: "/Report/ReportByDay",
        dataType: 'json',
        data: { fromDate: fromDate, toDate: toDate, agent: agent, typeReport: typeReport },
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
    factory.ReportExpense = function (fromDate, toDate,typeReport) {
        return $http({
            method: "POST",
            url: "/Report/ReportExpense",
            dataType: 'json',
            data: { fromDate: fromDate, toDate: toDate, typeReport: typeReport },
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
    //bao cao năng suất
    factory.ReportProductivity = function (fromDate, toDate, agent) {
        return $http({
            method: "POST",
            url: "/Report/ReportProductivity",
            dataType: 'json',
            data: { fromDate: fromDate, toDate: toDate, agent: agent },
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
    factory.detailHDNhap = function (UserId, fromDate, toDate) {
        return $http({
            method: "POST",
            url: "/Report/ReportDetailHDNhap",
            dataType: 'json',
            data: { UserId: UserId, fromDate: fromDate, toDate: toDate },
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
    factory.detailHDBan = function (UserId,fromDate,toDate) {
        return $http({
            method: "POST",
            url: "/Report/ReportDetailHDBan",
            dataType: 'json',
            data: { UserId: UserId ,fromDate:fromDate,toDate:toDate},
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
    //báo cáo lịch sử chuyển giao
    factory.HistoryTransaction = function (fromDate, toDate, agent,status) {
        return $http({
            method: "POST",
            url: "/Report/HistoryTransaction",
            dataType: 'json',
            data: { fromDate: fromDate, toDate: toDate, agent: agent,status:status },
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
    //báo cáo sản phẩm
    factory.reportCategory = function (fromDate, toDate, typeReport, count) {
        return $http({
            method: "POST",
            url: "/Report/ReportCategory",
            dataType: 'json',
            data: { fromDate: fromDate, toDate: toDate, typeReport: typeReport, count: count },
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
    //Lịch sử login
    factory.historyLogin = function (fromDate, toDate, agent) {

        return $http({
            method: "POST",
            url: "/Login/HistoryLogin",
            dataType: 'json',
            data: { fromDate: fromDate, toDate: toDate, agent: agent },
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