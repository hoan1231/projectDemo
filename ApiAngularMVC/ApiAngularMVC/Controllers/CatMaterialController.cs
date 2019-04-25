using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class CatMaterialController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        [HttpPost]
        public void CreateMaterial(string code,string name,string color)
        {
            Material cat = new Material();
            cat.MatCode = "CL" + code;
            cat.MatName = name;
            cat.Color = color;
            dbContext.Material.Add(cat);
            dbContext.SaveChanges();
        }
        [HttpGet]
        public ActionResult GetMaterial()
        {
            List<Material> lstMaterial = dbContext.Material.ToList<Material>();
            return Json(lstMaterial, JsonRequestBehavior.AllowGet);
        }
      
    }
}