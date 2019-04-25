using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class RoleModulesController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        // GET: RoleModules
        [HttpGet]
        public ActionResult GetAll1()
        {
            List<MenuNew> lstMenu = dbContext.MenuNew.Where(x => x.IsDeleted == false).OrderBy(x => x.OrderIndex).ToList<MenuNew>();
            return Json(lstMenu, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetMenu(string id)
        {
            List<MenuNew> lstMenu = dbContext.MenuNew.Where(x => x.ParentId.ToString() == id).OrderBy(x => x.OrderIndex).ToList<MenuNew>();
            return Json(lstMenu, JsonRequestBehavior.AllowGet);
        }

    }
}