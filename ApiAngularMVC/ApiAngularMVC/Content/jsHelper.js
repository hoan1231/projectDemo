$(function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "allowHtml": true
    };
});
function myMpLoop(ctrItem, textStart, textStop, itemDisabled) {
    this.ctrItem = ctrItem;
    this.textStart = textStart;
    this.textStop = textStop;
    this.itemDisabled = itemDisabled;
    this.stopProgress = false;
    var counterProgress = 1;
    this.timeoutobj;
    this.progress = function () {
        if (this.stopProgress) {
            var evet = this;
            ctrItem.html('<i class="fa fa-spin fa-refresh"></i>  ' + textStart);
        }

    }

    this.start = function () {
        this.stopProgress = true;
        //this.progress(this.ctrItem, this.textStart);
        this.progress();
        for (var i = 0; i < this.itemDisabled.length; i++) {
            this.itemDisabled[i].attr('Disabled', 'Disabled');
        }
    }
    this.stop = function () {
        this.stopProgress = false;
        clearTimeout(this.timeoutobj);
        this.ctrItem.html(this.textStop);
        for (var i = 0; i < this.itemDisabled.length; i++) {
            this.itemDisabled[i].removeAttr('Disabled');
        }
    }
}
function ExportToExcel(data, namFile, nameSheet, nameTitle, nameTables) {
    var size = nameTables.length;
    var html = "";
    html += "<Table border='1' bgColor='#ffffff' " +
        "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
        "style='font-size:10.0pt; font-family:Calibri; background:white;'>";
    html += ("<TR>");
    html += ("<td colspan='" + (size) + "' style='text-align:center;background:#7dbef5;font-size:20px'>" + nameTitle + "</td>");
    html += ("</TR>");
    html += ("<TR>");
    for (var i = 0; i < size; i++) {
        html += ("<Td style='background:#86fdbe'>");
        html += ("<B>");
        html += nameTables[i];
        html += ("</B>");
        html += ("</Td>");
    }
    html += ("</tr>");
    for (var i = 0; i < data.length; i++) {
        html += ("<tr>");
        html += ("<td>");
        html += (i + 1);
        html += ("</td>");
        Object.keys(data[i]).forEach(key => {
            html += ("<td style='mso-number-format:\"\\@\"'>");
            html += data[i][key];

            html += ("</td>");
        });
        html += ("</tr>");
    }
    html += ("</Table>");
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

    var ctx = { worksheet: nameSheet, table: html }
    var link = document.createElement("a");
    link.download = namFile + ".xls";
    link.href = uri + base64(format(template, ctx));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}