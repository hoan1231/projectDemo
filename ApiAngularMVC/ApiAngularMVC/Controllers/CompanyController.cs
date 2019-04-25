using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class CompanyController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        [HttpGet]
        public ActionResult GetCompany()
        {
            List<Company> lstCompany = dbContext.Company.ToList<Company>();
            return Json(lstCompany, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetCompanyLogin()
        {
            var compaId = Session["companyId"];
            Company company = dbContext.Company.Where(x=>x.Id.ToString()==compaId.ToString()).FirstOrDefault();
            return Json(company, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetIdCompany()
        {
            string compaId = Session["companyId"].ToString();
            Company a = dbContext.Company.Where(x => x.Id.ToString() == compaId).FirstOrDefault();
            return Json(a, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetIdCompany1()
        {
            string compaId = Session["companyId"].ToString();
            List<Company> a = dbContext.Company.Where(x => x.Id.ToString() == compaId).ToList();
            return Json(a, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public void CreateCompany(string name, string address, string phone)
        {
            bool gt = false;
            Company cus = new Company();
            cus.Id = Guid.NewGuid();
            cus.Name = name;

            cus.Address = address;
            cus.Phone = phone;
            cus.CreatedBy = Session["name"].ToString();
            cus.CreatedDate = DateTime.Now;
            dbContext.Company.Add(cus);
            dbContext.SaveChanges();
        }
        [HttpPost]
        public void UpdateCompany(string id, string name, string address, string phone)
        {
            bool gt = false;
            Company cus = dbContext.Company.Where(x => x.Id.ToString() == id).FirstOrDefault();
            cus.Name = name;
            cus.Address = address;

            cus.Phone = phone;
            dbContext.SaveChanges();
        }
        [HttpPost]
        public void DeleteCompany(string id)
        {

            Company cus = dbContext.Company.Where(x => x.Id.ToString() == id).FirstOrDefault();
            dbContext.Company.Remove(cus);
            dbContext.SaveChanges();
        }
    }
}