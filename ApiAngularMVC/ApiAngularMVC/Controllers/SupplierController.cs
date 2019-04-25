using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ApiAngularMVC.Models;

namespace ApiAngularMVC.Controllers
{
    public class SupplierController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        [HttpGet]
        public ActionResult GetSupplier()
        {
            List<Supplier> lstSupplier = dbContext.Supplier.ToList<Supplier>();
            return Json(lstSupplier, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public void CreateSupplier(string name, string address,string phone)
        {
            bool gt = false;
            Supplier cus = new Supplier();
            cus.Id = Guid.NewGuid();
            cus.Name = name;
           
            cus.Address = address;
            cus.Phone = phone;
            cus.CreatedBy = Session["userName"].ToString();
            cus.CreatedDate = DateTime.Now;
            dbContext.Supplier.Add(cus);
            dbContext.SaveChanges();
        }
        [HttpPost]
        public void UpdateSupplier(string id,string name, string address, string phone)
        {
            bool gt = false;
            Supplier cus = dbContext.Supplier.Where(x => x.Id.ToString() == id).FirstOrDefault();
            cus.Name = name;
            cus.Address = address;
          
            cus.Phone = phone;
            cus.UpdatedBy = Session["userName"].ToString();
            cus.UpdatedDate = DateTime.Now;
            dbContext.SaveChanges();
        }
        [HttpPost]
        public void DeleteSupplier(string id)
        {
            
            Supplier cus = dbContext.Supplier.Where(x => x.Id.ToString() == id).FirstOrDefault();
            dbContext.Supplier.Remove(cus);
            dbContext.SaveChanges();
        }
    }
}