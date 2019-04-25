using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class MenuMVCController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        public class RoleMenuModel
        {
            public Guid RoleId { get; set; }
            public string RoleName { get; set; }
            public Guid MenuId { get; set; }
            public string MenuUrl { get; set; }
            public bool IsShow { get; set; }
            public bool IsAdd { get; set; }
            public bool IsEdit { get; set; }
            public bool IsDelete { get; set; }

            public bool IsEnable { get; set; }
            public bool IsExport { get; set; }
            public bool IsAll { get; set; }
        }

        [HttpGet]
        public ActionResult GetAll1()
        {
            var userId = Session["userId"];
            var roles = (from b in dbContext.UserInRole join c in dbContext.Roles on b.RoleId equals c.RoleId  where b.UserId.ToString() == userId.ToString()&& c.IsEnable==true select c.RoleName).ToList();
                var lstMenu1 = (from a in dbContext.RoleInMenu where roles.Contains(a.RoleName) && a.IsShow == true && a.IsEnable == true select a.MenuId).ToList();
            var lstItem = (from a in dbContext.MenuNew
                           where lstMenu1.Contains(a.MenuId) && a.IsDeleted==false
                           select a).ToList();

            //List<MenuNew> lstMenu = dbContext.MenuNew.Where(x => x.IsDeleted == false).OrderBy(x => x.OrderIndex).ToList<MenuNew>();

            return Json(lstItem, JsonRequestBehavior.AllowGet);
        }

        //[HttpGet]
        //public ActionResult GetAll()
        //{
        //    List<MenuNew> lstMenu = dbContext.MenuNew.Where(x=>x.IsDeleted==false).OrderBy(x=>x.OrderIndex).ToList<MenuNew>();
        //    return Json(lstMenu, JsonRequestBehavior.AllowGet);
        //}
        [HttpGet]
        public ActionResult GetMenuParent()
        {
            List<MenuNew> lstMenu = dbContext.MenuNew.Where(x=>x.IsDeleted==false &&x.MenuUrl=="/").OrderBy(x => x.OrderIndex).ToList<MenuNew>();
            return Json(lstMenu, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetAll()
        {
            List<MenuNew> lstMenu = dbContext.MenuNew.Where(x=>x.IsDeleted==false).OrderBy(x => x.OrderIndex).ToList<MenuNew>();
            return Json(lstMenu, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetRoleMenuByUser()
        {
            var userId = Session["userId"];

            StringBuilder sql = new StringBuilder();
            sql.Append("SELECT a.RoleId,a.RoleName, a.MenuId,  c.MenuUrl,a.IsShow,  a.IsAdd,a.IsExport,  a.IsEdit,a.IsDelete,a.IsEnable, a.IsAll ");
            sql.Append(" FROM RoleInMenu a ");
             sql.Append("LEFT JOIN UserInRole b  ON a.RoleId = b.RoleId ");
             sql.Append("LEFT JOIN MenuNew c  ON c.MenuId = a.MenuId ");
             sql.Append("LEFT JOIN aspnet_User d ON d.Id=b.UserId");
            sql.Append(" WHERE d.Id = '" + userId + "'");

            var lstRoleMenu = dbContext.Database.SqlQuery<RoleMenuModel>(sql.ToString()).ToList();
            return Json(lstRoleMenu, JsonRequestBehavior.AllowGet);
        }

       [HttpPost]
        public ActionResult GetMenu(string id)
        {
            List<MenuNew> lstMenu = dbContext.MenuNew.Where(x => x.ParentId.ToString() == id &&x.IsDeleted==false).OrderBy(x => x.OrderIndex).ToList<MenuNew>();
            return Json(lstMenu, JsonRequestBehavior.AllowGet);
        }

        // GET: MenuMVC/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: MenuMVC/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MenuMVC/Create
        [HttpPost]
        public void CreateMenu(MenuNew x)
        {
            MenuNew menu = new MenuNew();
            //if (ModelState.IsValid)
            {
                menu.MenuId = Guid.NewGuid();
                menu.ParentId = x.ParentId;
                menu.OrderIndex = x.OrderIndex;
                menu.Note = x.Note;
                menu.IsEnable = x.IsEnable;
                menu.MenuName = x.MenuName;
                menu.MenuUrl = x.MenuUrl;
                menu.IsDeleted = false;
                dbContext.MenuNew.Add(menu);
                dbContext.SaveChanges();
            }
        }

            [HttpPost]
        public void UpdateMenu(MenuNew menu)
        {
            MenuNew s = new MenuNew();
            s = dbContext.MenuNew.Where(x => x.MenuId == menu.MenuId).FirstOrDefault();
            if (s != null)
            {
                s.MenuName = menu.MenuName;
                s.MenuUrl = menu.MenuUrl;
                s.Note = menu.Note;
                s.OrderIndex = menu.OrderIndex;
                s.ParentId = menu.ParentId;
                s.UpdatedDate = DateTime.Now;
                s.IsEnable = menu.IsEnable;
                dbContext.SaveChanges();
            }
        }

        // POST: MenuMVC/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: MenuMVC/Delete/5
        public void DeleteMenu(string id)
        {
            MenuNew s = new MenuNew();
            s = dbContext.MenuNew.Where(x => x.MenuId.ToString() == id).FirstOrDefault();
            if (s != null)
            {
                s.IsDeleted = true;
                dbContext.SaveChanges();
            }
        }

        // POST: MenuMVC/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
