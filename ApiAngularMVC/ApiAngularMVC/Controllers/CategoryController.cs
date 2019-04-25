using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class CategoryController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
       
        [HttpGet]
        public ActionResult GetCategorys()
        {
            List<Category> lstCategory = dbContext.Category.Where(x=>x.IsRecyclebin==false).ToList<Category>();
            return Json(lstCategory, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
     public ActionResult GetCateByCom(string comp)
        {
            var lstCat = (from a in dbContext.Category join b in dbContext.Cat_Company on a.ID equals b.CatId where b.CompanyId.ToString() == comp  select a).ToList();

        //    List<Category> lstCategory = dbContext.Category.Where(x=>x.IsRecyclebin==false).ToList<Category>();
            return Json(lstCat, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public string CreateCategory(Category x)
        {
            try
            {
                Category cat = new Category();
                cat.ID = Guid.NewGuid();
                cat.CatCode = x.CatCode;
                cat.CatName = x.CatName;
                cat.CatTypeId = x.CatTypeId;
                cat.CatManufacturer = x.CatManufacturer;
                cat.MatCode = x.MatCode;
                cat.Price = x.Price;
                cat.PurchasePrice = x.PurchasePrice;
                cat.RetailPrice = x.RetailPrice;
                cat.Tag = x.Tag;
                cat.Description = x.Description;
                cat.SortIndex = x.SortIndex;
                cat.CreatedBy = Session["userName"].ToString();
                cat.CreatedDate = DateTime.Now;
                cat.IsRecyclebin = false;
                dbContext.Category.Add(cat);
                dbContext.SaveChanges();
            }
            catch(Exception ex)
            {
                return "err";
            }
            return "succ";
           

        }
        [HttpPost]
        public string UpdateCategory(Category x)
        {
            try
            {
                Category c = dbContext.Category.Where(a => a.ID == x.ID).FirstOrDefault();
                c.CatName = x.CatName;
                c.CatCode = x.CatCode;
                c.CatManufacturer = x.CatManufacturer;
                c.CatTypeId = x.CatTypeId;
                c.Description = x.Description;
                c.MatCode = x.MatCode;
                c.Price = x.Price;
                c.PurchasePrice = x.PurchasePrice;
                c.RetailPrice = x.RetailPrice;
                c.SortIndex = x.SortIndex;
                c.Tag = x.Tag;
                c.UpdatedBy = Session["userName"].ToString();
                c.UpdatedDate = DateTime.Now;
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return "err";
            }
            return "succ";
           
        }
        [HttpPost]
        public string DeleteCategory(string id)
        {
            try
            {
                Category cus = dbContext.Category.Where(x => x.ID.ToString() == id).FirstOrDefault();
                cus.IsRecyclebin = true;
                dbContext.SaveChanges();
            }
             catch(Exception ex)
            {
                return "err";
            }
            return "succ";
        }
        [HttpPost]
        public ActionResult GetCategoryById(string id)
        {
             string compaId = Session["companyId"].ToString();
             var cat = (from a in dbContext.Category
                        join b in dbContext.Cat_Company on a.ID equals b.CatId
                        where b.CompanyId.ToString() == compaId.ToString() && a.ID.ToString() == id
                        select new { a.ID, a.CatCode, a.CatName, a.Price, a.PurchasePrice,
                            a.RetailPrice, a.MatCode, b.CatNumber }).FirstOrDefault();
                //Category c = dbContext.Category.Where(x => x.ID.ToString() == id).FirstOrDefault();
                return Json(cat, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetCategoryByIdImport(string id)
        {

            var cat = (from a in dbContext.Category
                       where a.ID.ToString() == id
                       select new
                       {
                           a.ID,
                           a.CatCode,
                           a.CatName,
                           a.Price,
                           a.PurchasePrice,
                           a.RetailPrice,
                           a.MatCode
                       }).FirstOrDefault();
            //Category c = dbContext.Category.Where(x => x.ID.ToString() == id).FirstOrDefault();
            return Json(cat, JsonRequestBehavior.AllowGet);
        }
         [HttpPost]
        public ActionResult SearchCatInWareHouse(string compaId,string nameCat)
        {
            
            if (nameCat.Trim() == "")
            {
               var lstCat = (from a in dbContext.Category
                              join b in dbContext.Cat_Company on a.ID equals b.CatId
                              where b.CompanyId.ToString() == compaId
                              select new { a.ID, a.CatName, a.CatCode, b.CompanyId, SumNumber = b.CatNumber, NumberTo = "0", NumberTransfer = "0" }).ToList();
                return Json(lstCat, JsonRequestBehavior.AllowGet);
            }
            else
            {
               var lstCat1 = (from a in dbContext.Category
                          join b in dbContext.Cat_Company on a.ID equals b.CatId
                          where b.CompanyId.ToString() == compaId && a.CatName.Contains(nameCat)
                          select new { a.ID, a.CatName, a.CatCode, b.CompanyId, SumNumber = b.CatNumber, NumberTo = "0", NumberTransfer = "0" }).ToList();
                return Json(lstCat1, JsonRequestBehavior.AllowGet);
            }
             
        }
         [HttpPost]
         public ActionResult GetHistoryMoveCat(string compaId)
         {
             var lstMoveCat = dbContext.Database.SqlQuery<MoveCat>("Select c.CatId,c.FromCompanyId,c.ToCompanyId,sum(c.NumberCat) as SumNumber from HistoryMoveCat c where c.StatusSend ='1' and (c.FromCompanyId='" + compaId + "' or c.ToCompanyId='" + compaId + "') group by c.CatId,c.FromCompanyId,c.ToCompanyId ").ToList();
             return Json(lstMoveCat, JsonRequestBehavior.AllowGet);
         }
         [HttpPost]
         public string SaveCatsMove(string fromCompa,string toCompa,string CatId, string numberCat,string address,string decription)
         {
             try
             {
                 HistoryMoveCat c = new HistoryMoveCat();
                 c.Id = Guid.NewGuid();
                 c.FromCompanyId = Guid.Parse(fromCompa);
                 c.ToCompanyId = Guid.Parse(toCompa);
                 c.CatId = Guid.Parse(CatId);
                 c.ToAddress = address;
                 c.NumberCat = Convert.ToInt32(numberCat);
                 c.StatusSend = 1;
                 c.Decription = decription;
                 c.CreatedBy = Session["name"].ToString();
                 c.CreatedDate = DateTime.Now;
                 dbContext.HistoryMoveCat.Add(c);
                 dbContext.SaveChanges();
             }
             catch (Exception ex){
                 return "err";
             }
             return "succ";
            
         }
        //lay danh sach cac san pham dang giao
        [HttpPost]
         public ActionResult GetCatTransaction()
         {
             string compaId = Session["companyId"].ToString();
             var lstCatMove = (from a in dbContext.HistoryMoveCat
                               join b in dbContext.Category on a.CatId equals b.ID
                               where a.StatusSend == 1 && a.ToCompanyId.ToString() == compaId
                               select new { a, b.CatName }).ToList();
             return Json(lstCatMove, JsonRequestBehavior.AllowGet);
         }
        //Xác nhận đơn hàng giao đến
        [HttpPost]
        public string SaveCatTransaction(HistoryMoveCat Cat)
        {
            try
            {
                Cat_Company compa = dbContext.Cat_Company.Where(x => x.CompanyId == Cat.FromCompanyId && x.CatId == Cat.CatId).FirstOrDefault();
                compa.CatNumber = compa.CatNumber - Cat.NumberCat;
                dbContext.SaveChanges();
                Cat_Company c = dbContext.Cat_Company.Where(x => x.CatId == Cat.CatId && x.CompanyId == Cat.ToCompanyId).FirstOrDefault();
                if (c != null)
                {
                    c.CatNumber += Cat.NumberCat;
                    dbContext.SaveChanges();
                }
                else
                {
                    Cat_Company a = new Cat_Company();
                    a.Id = Guid.NewGuid();
                    a.CatId = Guid.Parse(Cat.CatId.ToString());
                    a.CompanyId = Guid.Parse(Cat.ToCompanyId.ToString());
                    a.CatNumber = Cat.NumberCat;
                    dbContext.Cat_Company.Add(a);
                    dbContext.SaveChanges();
                }
                HistoryMoveCat hisCat = dbContext.HistoryMoveCat.Where(x => x.Id == Cat.Id).FirstOrDefault();
                hisCat.StatusSend = 2;
                hisCat.ConfirmedBy = Session["name"].ToString();
                hisCat.ConfirmedDate = DateTime.Now;
                dbContext.SaveChanges();
            }
            catch
            {
                return "err";
            }
            return "succ";
        }
        //Hủy nhận hàng
         [HttpPost]
        public string CancleTransaction(HistoryMoveCat Cat)
        {
            try
            {
                HistoryMoveCat hisCat = dbContext.HistoryMoveCat.Where(x => x.Id == Cat.Id).FirstOrDefault();
                hisCat.StatusSend = 0;
                hisCat.ConfirmedBy = Session["name"].ToString();
                hisCat.ConfirmedDate = DateTime.Now;
                dbContext.SaveChanges();
            }
            catch
            {
                return "err";
            }
             return "succ";
        }

         public class MoveCat
         {
             public Guid CatId { get; set; }
             public Guid FromCompanyId { get; set; }
             public Guid ToCompanyId { get; set; }
             public int SumNumber { get; set; }

         }

    }
}