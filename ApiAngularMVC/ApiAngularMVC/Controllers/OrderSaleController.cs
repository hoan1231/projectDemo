using ApiAngularMVC.Models;
using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class OrderSaleController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        // GET: OrderSale
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string CreateOrderSale(List<DetailInvoiceSale> list, string supp, string comp, string date, int sum)
        {
            try
            {
                Guid SaleId = Guid.NewGuid();
                SaleInvoice x = new SaleInvoice();
                x.Id = SaleId;
                x.CreatedDate = DateTime.Now;
                x.CustormerID = Guid.Parse(supp);
                x.CompanyId = Guid.Parse(comp);
                x.UserId = Guid.Parse(Session["userId"].ToString());
                x.SumMoney = sum;
                x.CreatedBy = Session["name"].ToString();
                dbContext.SaleInvoice.Add(x);
                dbContext.SaveChanges();

                for (int i = 0; i < list.Count; i++)
                {
                    DetailInvoiceSale d = new DetailInvoiceSale();
                    d.Id = Guid.NewGuid();
                    d.SaleId = SaleId;
                    d.CatId = list[i].CatId;
                    d.Price = list[i].Price;
                    d.CatNumberSale = list[i].CatNumberSale;
                    d.PlaceReceive = list[i].PlaceReceive;
                    d.SumMoney = list[i].SumMoney;
                    d.VAT = list[i].VAT;
                    d.Decription = list[i].Decription;
                    d.CreatedBy = Session["name"].ToString();
                    d.CreatedDate = DateTime.Now;
                    dbContext.DetailInvoiceSale.Add(d);
                    dbContext.SaveChanges();
                    var cat = list[i].CatId;
                    var com = comp;
                    Cat_Company lst = dbContext.Cat_Company.Where(m => m.CatId == cat && m.CompanyId.ToString() == com).FirstOrDefault();
                 
                    if (lst !=null)
                    {        
                        lst.CatNumber -= list[i].CatNumberSale;
                        dbContext.SaveChanges();
                    }

                }



            }
            catch (Exception ex)
            {
                return "err";
            }
            return "succ";


        }
        [HttpPost]
        public string ImportOrderSale()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    string filePath = string.Empty;
                    int ins = 0, upd = 0;
                    if (Request != null)
                    {
                        HttpPostedFileBase file = Request.Files["file"];
                        if ((file != null) && (file.ContentLength > 0) && !string.IsNullOrEmpty(file.FileName))
                        {

                            string fileName = file.FileName;
                            string fileContentType = file.ContentType;
                            string path = Server.MapPath("~/Uploads/");
                            if (!Directory.Exists(path))
                            {
                                Directory.CreateDirectory(path);
                            }
                            filePath = path + Path.GetFileName(file.FileName);
                            string extension = Path.GetExtension(file.FileName);
                            file.SaveAs(filePath);
                            Stream stream = file.InputStream;
                            // We return the interface, so that  
                            IExcelDataReader reader = null;
                            if (file.FileName.EndsWith(".xls"))
                            {
                                reader = ExcelReaderFactory.CreateBinaryReader(stream);
                            }
                            else if (file.FileName.EndsWith(".xlsx"))
                            {
                                reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                            }
                            else
                            {
                                return "errFile";
                            }
                            //  reader.IsFirstRowAsColumnNames = true;
                            DataSet result = reader.AsDataSet();
                            reader.Close();
                            string col = "";
                            //delete the file from physical path after reading   
                            string filedetails = path + fileName;
                            FileInfo fileinfo = new FileInfo(filedetails);
                            if (fileinfo.Exists)
                            {
                                fileinfo.Delete();
                            }
                            string matest = "";
                            DataTable dt = result.Tables[0];
                            Guid idsale = Guid.NewGuid();
                            Guid com = Guid.Parse(Session["companyId"].ToString());
                            for (int i = 1; i < dt.Rows.Count; i++)
                            {
                                if (dt.Rows[0]["Column0"].ToString().Trim() != "MaHoaDon" ||
                                    dt.Rows[0]["Column1"].ToString().Trim() != "TenKhachHang"
                                    || dt.Rows[0]["Column2"].ToString().Trim() != "TenNhanVien"
                                    || dt.Rows[0]["Column3"].ToString().Trim() != "TongTien"
                                    || dt.Rows[0]["Column4"].ToString().Trim() != "TenSanPham"
                                        || dt.Rows[0]["Column5"].ToString().Trim() != "SoLuong" ||
                                    dt.Rows[0]["Column6"].ToString().Trim() != "Thue" ||
                                    dt.Rows[0]["Column7"].ToString().Trim() != "ThanhTien")
                                {
                                    return "errFile";
                                }
                                else
                                {

                                    string mahd = "", tenkh = "", tennv = "", tongtien = "", tensp = "", soluong = "", thue = "", thanhtien = "";
                                    mahd = !Convert.IsDBNull(dt.Rows[i]["Column0"]) ? dt.Rows[i]["Column0"].ToString().Trim() : "";
                                    tenkh = !Convert.IsDBNull(dt.Rows[i]["Column1"]) ? dt.Rows[i]["Column1"].ToString().Trim() : "";
                                    tennv = !Convert.IsDBNull(dt.Rows[i]["Column2"]) ? dt.Rows[i]["Column2"].ToString().Trim() : "";
                                    tongtien = !Convert.IsDBNull(dt.Rows[i]["Column3"]) ? dt.Rows[i]["Column3"].ToString().Trim() : "";
                                    tensp = !Convert.IsDBNull(dt.Rows[i]["Column4"]) ? dt.Rows[i]["Column4"].ToString().Trim() : "";
                                    soluong = !Convert.IsDBNull(dt.Rows[i]["Column5"]) ? dt.Rows[i]["Column5"].ToString().Trim() : "";
                                    thue = !Convert.IsDBNull(dt.Rows[i]["Column6"]) ? dt.Rows[i]["Column6"].ToString().Trim() : "";
                                    thanhtien = !Convert.IsDBNull(dt.Rows[i]["Column7"]) ? dt.Rows[i]["Column7"].ToString().Trim() : "";
                                    int dem=0;
                                   
                                    if (tensp != "" || soluong != "" || thue != "")
                                    {
                                        if (mahd != "")
                                        {
                                            matest = mahd;
                                            dem = 0;

                                        }
                                        else dem = 1;
                                        matest = mahd;
                                        var cus = dbContext.Custormer.Where(x => x.Name == tenkh).FirstOrDefault();
                                        var nv = dbContext.aspnet_User.Where(x => x.Name == tennv).FirstOrDefault();
                                        var sp = dbContext.Category.Where(x => x.CatName == tensp).FirstOrDefault();
                                        if (cus != null && nv != null && sp != null &&dem==0 )
                                        {
                                            SaleInvoice x = new SaleInvoice();
                                            x.Id = Guid.NewGuid();
                                            idsale = x.Id;
                                            x.CreatedDate = DateTime.Now;
                                            x.CustormerID = cus.Id;
                                            x.CompanyId = Guid.Parse(Session["companyId"].ToString());
                                            x.UserId = nv.ID;
                                            x.SumMoney = Convert.ToInt32(tongtien);
                                            x.CreatedBy = Session["name"].ToString();
                                            dbContext.SaleInvoice.Add(x);
                                            dbContext.SaveChanges();
                                            DetailInvoiceSale d = new DetailInvoiceSale();
                                            d.Id = Guid.NewGuid();
                                            d.SaleId = idsale;
                                            d.CatId = sp.ID;
                                            d.CatNumberSale = Convert.ToInt32(soluong);
                                            d.SumMoney = Convert.ToInt32(thanhtien);
                                            d.VAT = Convert.ToInt32(thue);
                                            d.CreatedBy = Session["name"].ToString();
                                            d.CreatedDate = DateTime.Now;
                                            dbContext.DetailInvoiceSale.Add(d);
                                             dbContext.SaveChanges(); 
                                          
                                            Cat_Company lst = dbContext.Cat_Company.Where(m => m.CatId == sp.ID && m.CompanyId==com).FirstOrDefault();

                                            if (lst != null)
                                            {
                                                lst.CatNumber -= Convert.ToInt32(soluong);
                                                dbContext.SaveChanges();
                                            }
                                            ins++;
                                        }
                                        else if ( nv==null&&cus==null &&sp != null && soluong != "" && dem == 1)
                                        {
                                            DetailInvoiceSale d = new DetailInvoiceSale();
                                            d.Id = Guid.NewGuid();
                                            d.SaleId = idsale;
                                            d.CatId = sp.ID;
                                            d.CatNumberSale = Convert.ToInt32(soluong);
                                            d.SumMoney = Convert.ToInt32(thanhtien);
                                            d.VAT = Convert.ToInt32(thue);     
                                            d.CreatedBy = Session["name"].ToString();
                                            d.CreatedDate = DateTime.Now;
                                            dbContext.DetailInvoiceSale.Add(d);
                                            dbContext.SaveChanges();
                                            Cat_Company lst = dbContext.Cat_Company.Where(m => m.CatId == sp.ID && m.CompanyId == com).FirstOrDefault();

                                            if (lst != null)
                                            {
                                                lst.CatNumber -= Convert.ToInt32(soluong);
                                                dbContext.SaveChanges();
                                            }
                                        }
                                    }

                                    else
                                    {
                                      
                                        
                                    }
                                }
                            }

                        }

                    }


                    string result1 = ins + ";";
                    return result1;
                }
                catch
                {
                    return "errFiles";
                }
            }
            else return "errfound";
        }
    }
}