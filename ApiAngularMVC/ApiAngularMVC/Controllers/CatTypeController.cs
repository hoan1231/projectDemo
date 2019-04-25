using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class CatTypeController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        // GET: CatType
        [HttpGet]
        public ActionResult GetType()
        {
            List<CatType> lstType = dbContext.CatType.OrderBy(x => x.CatTypeName).ToList<CatType>();
            return Json(lstType, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public void CreateType(string name)
        {
            CatType catType = new CatType();
            catType.Id = Guid.NewGuid();
            catType.CatTypeName = name;   
            catType.CreatedBy = Session["name"].ToString();
            catType.CreatedDate = DateTime.Now;
            dbContext.CatType.Add(catType);
            dbContext.SaveChanges();
        }
        
       
    }
}