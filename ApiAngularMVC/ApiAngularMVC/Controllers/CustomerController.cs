using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ApiAngularMVC.Models;

namespace ApiAngularMVC.Controllers
{
    public class CustomerController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        [HttpGet]
        public ActionResult GetCustomer()
        {
            var lstCustomer = (from a in dbContext.Custormer select new{ a.Id,a.Name,a.Phone,a.Address,a.BirthDay,a.Email}).ToList();
          //  List<Custormer> lstCustomer = dbContext.Custormer.ToList<Custormer>();
            return Json(lstCustomer, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public void CreateCustomer(string name, string address,string phone,string date,string sex,string email)
        {
            bool gt = false;
            Custormer cus = new Custormer();
            cus.Id = Guid.NewGuid();
            cus.Name = name;
            if (sex == "1") gt = true;
            cus.Sex = gt;
            cus.Address = address;
            cus.Email = email;
            cus.BirthDay = DateTime.ParseExact(date, "dd/MM/yyyy", null);
            cus.Phone = phone;
            cus.CreatedBy = Session["name"].ToString();
            cus.CreatedDate = DateTime.Now;
            dbContext.Custormer.Add(cus);
            dbContext.SaveChanges();
        }
        [HttpPost]
        public void UpdateCustomer(string id,string name, string address, string phone, string date, string sex, string email)
        {
            bool gt = false;
            Custormer cus = dbContext.Custormer.Where(x => x.Id.ToString() == id).FirstOrDefault();
            cus.Name = name;
            if (sex == "1") gt = true;
            cus.Sex = gt;
            cus.Address = address;
            cus.Email = email;
            cus.BirthDay = DateTime.Parse(date);
            cus.Phone = phone;
            cus.UpdatedBy = Session["userName"].ToString();
            cus.UpdatedDate = DateTime.Now;
            dbContext.SaveChanges();
        }
        [HttpPost]
        public void DeleteCustomer(string id)
        {
            
            Custormer cus = dbContext.Custormer.Where(x => x.Id.ToString() == id).FirstOrDefault();
            dbContext.Custormer.Remove(cus);
            dbContext.SaveChanges();
        }
    }
}