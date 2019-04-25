using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Supplier()
        {
            return View();
        }
        public ActionResult SetPermissions()
        {
            return View();
        }
        public ActionResult ManagerPermissions()
        {
            return View();
        }
        public ActionResult AddMember()
        {
            return View();
        }
        public ActionResult Categorys()
        {
            return View();
        }
        public ActionResult Customer()
        {
            return View();
        }
        public ActionResult RoleModules()
        {
            return View();
        }
        public ActionResult ListMember()
        {
            return View();
        }
        public ActionResult TemplateAnswer()
        {
            return View();
        }
        public ActionResult Menu()
        {
            return View();
        }
        public ActionResult CreateOrderImport()
        {
            return View();
        }
        public ActionResult CreateOrderSale()
        {
            return View();
        }

        public ActionResult ManagerWareHouse()
        {
            return View();
        }
        public ActionResult WareHouse()
        {
            return View();
        }
        public ActionResult ManagerTransaction()
        {
            return View();
        }
        public ActionResult ReportByDay()
        {
            return View();
        }
        public ActionResult ReportExpense()
        {
            return View();
        }
        public ActionResult HistoryTransaction()
        {
            return View();
        }
        public ActionResult ReportTopProduct()
        {
            return View();
        }
        public ActionResult ReportCategory()
        {
            return View();
        }
        public ActionResult ReportProductivity()
        {
            return View();
        }
        public ActionResult Company()
        {
            return View();
        }
        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult HistoryLogin()
        {
            return View();
        }
        public ActionResult InfoUser()
        {
            return View();
        }
    }
}
