using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class CatManufacturerController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        // GET: CatManufacturer
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public void CreateManufacturer(string name)
        {
           
            CatManufacturer catManufacturer = new CatManufacturer();
            catManufacturer.Id = Guid.NewGuid();
            catManufacturer.Name = name;   
            catManufacturer.CreatedBy = Session["name"].ToString();
            catManufacturer.CreatedDate = DateTime.Now;
            catManufacturer.IsDelete = false;
            dbContext.CatManufacturer.Add(catManufacturer);
            dbContext.SaveChanges();
        }
        [HttpGet]
        public ActionResult GetManufacturer()
        {
            List<CatManufacturer> lstManufacturer = dbContext.CatManufacturer.OrderBy(x => x.Name).ToList<CatManufacturer>();
            return Json(lstManufacturer, JsonRequestBehavior.AllowGet);
        }
       
    }
}