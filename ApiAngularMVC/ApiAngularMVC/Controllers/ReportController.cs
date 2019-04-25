using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ApiAngularMVC.Models;

namespace ApiAngularMVC.Controllers
{
    public class ReportController : Controller
    {
        public class HistoryTransaction1
        {
            public Guid CatId { get; set; }
            public string CatName { get; set; }
            public int NumberCat { get; set; }
            public string ToAddress { get; set; }
            public string StatusSend { get; set; }
            public string CreatedBy { get; set; }
            public string CreatedDate { get; set; }
            public string ConfirmedBy { get; set; }
            public string ConfirmedDate { get; set; }
        }
        public class CategoryReport
        {
          
            public string CatName { get; set; }
            public int SLTon { get; set; }
            public int SLNhap { get; set; }
            public int SLBan { get; set; }
            public int TienBan { get; set; }
           
        }
        public class ProductReport
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public int TongHDNhap { get; set; }
            public int TongHDBan { get; set; }
        }
        public class ExpenseReport
        {

            public string Name { get; set; }
            public string Address { get; set; }
            public string Phone { get; set; }
            //   public Guid CompanyId { get; set; }

            public int TongTien { get; set; }

        }
        private DemoApiEntities dbContext = new DemoApiEntities();

        [HttpPost]
        public ActionResult ReportByDay(string fromDate, string toDate, string agent, string typeReport)
        {
            DateTime from1 = DateTime.ParseExact(fromDate, "dd/MM/yyyy", null);
            DateTime to = DateTime.ParseExact(toDate, "dd/MM/yyyy", null);
            to = to.AddDays(1);
            string companyId = Session["companyId"].ToString();
            if (agent != null && agent != "")
            {
                if (typeReport == "1")
                {
                    var lst = (from a in dbContext.SaleInvoice
                               join b in dbContext.Custormer on a.CustormerID equals b.Id
                               where a.CompanyId.ToString() == companyId && a.CreatedDate >= from1 && a.CreatedDate <= to && a.UserId.ToString() == agent
                               select new { a.Id, b.Name, a.SumMoney, a.CreatedBy, a.CreatedDate }).ToList();
                    return Json(lst, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var lst = (from a in dbContext.ImportInvoice
                               join b in dbContext.Supplier on a.SupplierId equals b.Id
                               where a.CompanyId.ToString() == companyId && a.CreatedDate >= from1 && a.CreatedDate <= to && a.UserId.ToString() == agent
                               select new { a.Id, b.Name, a.SumMoney, a.CreatedBy, a.CreatedDate }).ToList();
                    return Json(lst, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                if (typeReport == "1")
                {
                    var lst = (from a in dbContext.SaleInvoice
                               join b in dbContext.Custormer on a.CustormerID equals b.Id
                               where a.CompanyId.ToString() == companyId && a.CreatedDate >= from1 && a.CreatedDate <= to
                               select new { a.Id, b.Name, a.SumMoney, a.CreatedBy, a.CreatedDate }).ToList();
                    return Json(lst, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var lst = (from a in dbContext.ImportInvoice
                               join b in dbContext.Supplier on a.SupplierId equals b.Id
                               where a.CompanyId.ToString() == companyId && a.CreatedDate >= from1 && a.CreatedDate <= to
                               select new { a.Id, b.Name, a.SumMoney, a.CreatedBy, a.CreatedDate }).ToList();
                    return Json(lst, JsonRequestBehavior.AllowGet);
                }
            }

        }
        [HttpPost]
        public ActionResult ReportExpense(string fromDate, string toDate, string typeReport)
        {
            string from1 = DateTime.ParseExact(fromDate, "dd/MM/yyyy", null).ToString("yyyy-MM-dd HH:mm:ss.fff");
            string to = (DateTime.ParseExact(toDate, "dd/MM/yyyy", null).AddDays(1)).ToString("yyyy-MM-dd HH:mm:ss.fff");
        
            string sql = "";
            if (typeReport == "1") sql = "select a.CompanyId, CAST(sum(a.SumMoney) as int) as TongTien into #temp1 from SaleInvoice a where a.CreatedDate>= '" + from1 + "' and a.CreatedDate<='" + to + "' group by a.CompanyId select b.Name,b.Address,b.Phone,(Case when a.TongTien is Null then '0' else a.TongTien end) as TongTien from Company b left join #temp1  a on a.CompanyId=b.Id ";
            else
                sql = "select a.CompanyId, CAST(sum(a.SumMoney) as int) as TongTien into #temp1 from ImportInvoice a where a.CreatedDate>= '" + from1 + "' and a.CreatedDate<='" + to + "' group by a.CompanyId select b.Name,b.Address,b.Phone,(Case when a.TongTien is Null then '0' else a.TongTien end) as TongTien from Company b left join #temp1  a on a.CompanyId=b.Id ";
            var lst1 = dbContext.Database.SqlQuery<ExpenseReport>(sql).ToList();


            //linq left join
            //var lst = (from a in dbContext.Company
            //           from b in dbContext.ImportInvoice.Where(x=>x.CompanyId==a.Id).DefaultIfEmpty()
            //           //join b in dbContext.ImportInvoice on a.Id equals b.CompanyId
            //           where b.CreatedDate >= from1 && b.CreatedDate <= to
            //           group b by new { a.Name, a.Phone, a.Address, b.CompanyId } into c
            //           select new { ID = c.Key.CompanyId, Phone = c.Key.Phone, Name = c.Key.Name, Address = c.Key.Address, TongTien = c.Sum(d => d.SumMoney == null ? 0 :d.SumMoney) }).ToList();


            //     var lst = dbContext.Database.SqlQuery<ExpenseReport>("select a.CompanyId, sum(a.SumMoney) as TongTien into #temp1 from ImportInvoice a group by a.CompanyId select b.Id,b.Name,b.Address,b.Phone,(Case when a.TongTien is Null then '0' else a.TongTien end) as TongTien from Company b left join #temp1  a on a.CompanyId=b.Id").ToList();
            //  var lst = dbContext.Database.SqlQuery<ExpenseReport>("select b.Name,b.Address,b.Phone,a.CompanyId,sum(a.SumMoney) as TongTien from Company b inner join ImportInvoice  a on b.Id=a.CompanyId Group by b.Name,b.Address,b.Phone,a.CompanyId ").ToList();
            return Json(lst1, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ReportProductivity(string fromDate, string toDate, string agent)
        {

            string from1 = DateTime.ParseExact(fromDate, "dd/MM/yyyy", null).ToString("yyyy-MM-dd HH:mm:ss.fff");
            string to = (DateTime.ParseExact(toDate, "dd/MM/yyyy", null).AddDays(1)).ToString("yyyy-MM-dd HH:mm:ss.fff");
        
            string companyId = Session["companyId"].ToString();
            string sql = "select a.ID,a.Name,count(c.Id) as TongHDNhap into #temp1  ";
            sql += " from aspnet_User a left join ";
            sql += " (select *from ImportInvoice ";
            sql += " Where CreatedDate>= '" + from1 + "' and CreatedDate<='" + to + "'";

            sql += " ) c on a.ID = c.UserId ";
            sql += " where a.CompaID='" + companyId + "'";
            if (agent != "" && agent != null) sql += " and a.ID='" + agent + "' ";
            sql += " group by a.ID,a.Name ";
            sql += " select a.ID,a.Name,count(b.Id) as TongHDBan into #temp2 ";
            sql += " from aspnet_User a left join ";
            sql += " (select *from SaleInvoice ";
            sql += " Where CreatedDate>= '" + from1 + "' and CreatedDate<='" + to + "'";
            sql += " ) b on a.ID = b.UserId ";
            sql += " where a.CompaID='" + companyId + "'";
            if (agent != "" && agent != null) sql += " and a.ID='" + agent + "' ";
            sql += " group by a.ID,a.Name ";
            sql += " select a.Id,a.Name,a.TongHDNhap,b.TongHDBan ";
            sql += " from #temp1 a join #temp2 b on a.ID=b.ID ";
            var lst = dbContext.Database.SqlQuery<ProductReport>(sql).ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult ReportDetailHDNhap(Guid UserId, string fromDate, string toDate)
        {
            DateTime from1 = DateTime.ParseExact(fromDate, "dd/MM/yyyy", null);
            DateTime to = DateTime.ParseExact(toDate, "dd/MM/yyyy", null);
            to = to.AddDays(1); var lst = (from a in dbContext.ImportInvoice
                       join b in dbContext.DetailInvoiceImport on a.Id equals b.ImportId
                       join c in dbContext.aspnet_User on a.UserId equals c.ID
                       join d in dbContext.Category on b.CatId equals d.ID
                       where c.ID == UserId && a.CreatedDate >= from1 && a.CreatedDate <= to
                       orderby a.Id ascending
                       select new { d.CatName, CatNumber = b.CatNumberImport, d.Price, b.VAT, b.SumMoney, c.UserName, a.Id,a.CreatedDate }).ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ReportDetailHDBan(Guid UserId, string fromDate, string toDate)
        {
            DateTime from1 = DateTime.ParseExact(fromDate, "dd/MM/yyyy", null);
            DateTime to = DateTime.ParseExact(toDate, "dd/MM/yyyy", null);
            to = to.AddDays(1);
            var lst = (from a in dbContext.SaleInvoice
                       join b in dbContext.DetailInvoiceSale on a.Id equals b.SaleId
                       join c in dbContext.aspnet_User on a.UserId equals c.ID
                       join d in dbContext.Category on b.CatId equals d.ID
                       where c.ID == UserId && a.CreatedDate >= from1 && a.CreatedDate <= to
                       orderby a.Id ascending
                       select new { d.CatName, CatNumber = b.CatNumberSale, d.Price, b.VAT, b.SumMoney, c.UserName, a.Id,a.CreatedDate }).ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult HistoryTransaction(string fromDate, string toDate, string agent, string status)
        {
            string companyId = Session["companyId"].ToString();
            string from1 = DateTime.ParseExact(fromDate, "dd/MM/yyyy", null).ToString("yyyy-MM-dd HH:mm:ss.fff");
            string to = (DateTime.ParseExact(toDate, "dd/MM/yyyy", null).AddDays(1)).ToString("yyyy-MM-dd HH:mm:ss.fff");
            string sql = " select a.*,b.CatName into #temp3 ";

            sql += " from HistoryMoveCat a join Category b on a.CatId=b.ID ";
            sql += " where (a.FromCompanyId='" + companyId + "' or a.ToCompanyId='" + companyId + "') and a.CreatedDate>= '" + from1 + "' and a.CreatedDate<='" + to + "' ";
            sql += " select a.CatId,a.CatName,a.NumberCat,a.ToAddress, ";
            sql += " (Case when a.StatusSend=1 and a.FromCompanyId='" + companyId + "' then N'Đang chuyển giao' ";
            sql += "  when a.StatusSend=1 and a.ToCompanyId='" + companyId + "' then N'Hàng đang về' ";
            sql += "  when a.StatusSend=2 and a.FromCompanyId='" + companyId + "' then N'Chuyển giao hàng thành công' ";
            sql += " when a.StatusSend=2 and a.ToCompanyId='" + companyId + "' then N'Nhận hàng thành công' ";
            sql += "  when a.StatusSend=0 and a.FromCompanyId='" + companyId + "' then N'Bị hủy đơn hàng' ";
            sql += " when a.StatusSend=0 and a.ToCompanyId='" + companyId + "' then N'Hủy đơn hàng' ";
            sql += " End) as StatusSend,a.CreatedBy,(CASE WHEN a.CreatedDate IS NULL THEN '' ELSE CONVERT(varchar(50), a.CreatedDate, 103) END) as CreatedDate,a.ConfirmedBy,(CASE WHEN a.ConfirmedDate IS NULL THEN '' ELSE CONVERT(varchar(50), a.ConfirmedDate, 103) END) as ConfirmedDate ";
            sql += " from #temp3 a Where 1=1 ";
            if (status == "0") sql += " and a.StatusSend=1 and a.FromCompanyId='" + companyId + "'";
            if (status == "1") sql += " and a.StatusSend=2 and a.ToCompanyId='" + companyId + "'";
            if (status == "2") sql += " and  a.StatusSend=0 and a.ToCompanyId='" + companyId + "'";
            if (status == "3") sql += " and a.StatusSend=1 and a.ToCompanyId='" + companyId + "'";
            if (status == "4") sql += " and  a.StatusSend=2 and a.FromCompanyId='" + companyId + "'";
            if (status == "5") sql += " and a.StatusSend=0 and a.FromCompanyId='" + companyId + "'";
            if (agent != null && agent != "") sql += " and  a.ConfirmedBy ='" + agent + "'";
            var lst = dbContext.Database.SqlQuery<HistoryTransaction1>(sql).ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);


        }

        [HttpPost]
        public ActionResult ReportCategory(string fromDate, string toDate, string typeReport,string count)
        {
            string from1 = DateTime.ParseExact(fromDate, "dd/MM/yyyy", null).ToString("yyyy-MM-dd HH:mm:ss.fff");
            string to = (DateTime.ParseExact(toDate, "dd/MM/yyyy", null).AddDays(1)).ToString("yyyy-MM-dd HH:mm:ss.fff");
            string companyId = Session["companyId"].ToString();
            string sql = "select a.ID, a.CatName into #temp ";
            sql += " from Category a join Cat_Company b on a.ID=b.CatId ";
            sql += " where b.CompanyId='" + companyId + "' ";
            sql += " select b.CatId,Cast(sum(b.CatNumberSale)as int) TongBan, Case when sum(b.SumMoney) is null then 0 else sum(b.SumMoney) end AS TienBan INTO #temp1 ";
            sql += " from SaleInvoice a join DetailInvoiceSale b on a.Id=b.SaleId ";
            sql += " where a.CompanyId='" + companyId + "' and a.CreatedDate>= '" + from1 + "' and a.CreatedDate<='" + to + "' ";
            sql += " group by b.CatId ";
            sql += " select b.CatId,Cast(sum(b.CatNumberImport)as int) TongNhap into #temp2 ";
            sql += " from ImportInvoice a join DetailInvoiceImport b on a.Id=b.ImportId ";
            sql += " where a.CompanyId='" + companyId + "' and a.CreatedDate>= '" + from1 + "' and a.CreatedDate<='" + to + "' ";
            sql += " group by b.CatId select ";
            if(count!="" && count!=null) sql+=" top "+count;
            sql += @"  a.CatName,   Cast(Case when b.TongBan is null and c.TongNhap is null then 0 when b.TongBan is null and c.TongNhap is not null then c.TongNhap when b.TongBan is not null and c.TongNhap is null then 0 else (c.TongNhap-b.TongBan) end  AS int) AS SLTon,
                                  Cast(Case when c.TongNhap is null then 0 else  c.TongNhap end  AS int) AS SLNhap,
                                 Cast(Case when b.TongBan is null then 0 else  b.TongBan end AS int) AS SLBan,
                                 Cast(Case when b.TienBan is null then 0 else  b.TienBan end AS int) AS TienBan ";
            sql += " from #temp a left join #temp1 b on a.ID=b.CatId left join #temp2 c on a.ID=c.CatId ";
            if (typeReport == "1") sql += " order by b.TongBan desc ,TienBan desc";
            else sql += " order by (c.TongNhap-b.TongBan) desc ,TienBan asc";
            var lst = dbContext.Database.SqlQuery<CategoryReport>(sql).ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

    }
}