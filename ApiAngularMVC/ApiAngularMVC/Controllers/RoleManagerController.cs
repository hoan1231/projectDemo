  using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class RoleManagerController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        // GET: CatManufacturer
        public class AgentRole
        {
            public Guid RoleId { get; set; }
            public string RoleName { get; set; }
            public int SoLuong { get; set; }
            public int IsEnable { get; set; }
        }
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string CreateRole(string name)
        {

            try
            {
                Roles r = dbContext.Roles.Where(x => x.RoleName == name).FirstOrDefault();
                if (r == null)
                {
                    Roles x = new Roles();
                    x.RoleId = Guid.NewGuid();
                    x.RoleName = name;
                    dbContext.Roles.Add(x);
                    dbContext.SaveChanges();
                    return "succ";
                }
                else return "exit";
            }
            catch (Exception e)
            {
                return "err";
            }
           
        }

        [HttpGet]
        public ActionResult GetRole()
        {
            var companyId = Session["companyId"];
            string sql = "select a.* into #temp from UserInRole a join aspnet_User b on a.UserId=b.ID WHERE b.CompaID='"+companyId+"'";
             sql+=@" select a.RoleId,a.RoleName,Case when (a.IsEnable is null or a.IsEnable =0) 
                         then 0 else 1 end IsEnable  ,Case When b.RoleId is null then '0' else count(a.RoleId) end as SoLuong from Roles a 
                        left join #temp b on a.RoleId=b.RoleId 
                        group by a.RoleId,b.RoleId,a.RoleName,a.IsEnable order by a.RoleName ";
            var a1 = dbContext.Database.SqlQuery<AgentRole>(sql).ToList();
            return Json(a1, JsonRequestBehavior.AllowGet);
        }
        //Lay danh sach cac quyền
        [HttpGet]
        public ActionResult GetRoleName()
        {
            List<Roles> lstRoles = dbContext.Roles.Where(x=>x.IsEnable==true).OrderBy(x=>x.RoleName).ToList<Roles>();
            return Json(lstRoles, JsonRequestBehavior.AllowGet);
        }
        //Lay danh sach menu theo quyen và theo menuId
        [HttpPost]
        public ActionResult GetRoleMenus(string menuId,string roleName)
        {
            
            List<Roles> roles = dbContext.Roles.Where(x => x.RoleName == roleName &&x.IsEnable==true).OrderBy(x=>x.RoleName).ToList<Roles>();
           string roleId = roles[0].RoleId.ToString();
            
            List<MenuNew> lstMenu = dbContext.MenuNew.Where(x => x.ParentId.ToString() == menuId && x.IsDeleted == false).OrderBy(x => x.OrderIndex).ToList<MenuNew>();
            for(int i = 0; i < lstMenu.Count; i++)
            {
                string menuId1 = lstMenu[i].MenuId.ToString();
                bool checkRole = true;
                List<RoleInMenu> lst = dbContext.RoleInMenu.Where(x => x.RoleId.ToString() == roleId && x.MenuId.ToString() == menuId1).ToList<RoleInMenu>();
                if (lst.Count == 0) checkRole = false;
                if (checkRole==false)
                {
                    RoleInMenu x = new RoleInMenu();
                    x.Id = Guid.NewGuid();
                    x.MenuId = Guid.Parse(menuId1);
                    x.RoleId = Guid.Parse(roleId);
                    x.RoleName = roleName;
                    x.IsShow = false;
                    x.IsAdd = false;
                    x.IsDelete = false;
                    x.IsEdit = false;
                    x.IsEnable = false;
                    x.IsExport = false;
                    x.IsShow = false;
                    x.IsPrint = false;
                    x.IsAll = false;
                    x.CreatedBy = Session["name"].ToString();
                    x.CreatedDate = DateTime.Now;
                    dbContext.RoleInMenu.Add(x);
                    dbContext.SaveChanges();
                }
            }

            var lstItem=(from a in dbContext.MenuNew join b in dbContext.RoleInMenu on a.MenuId equals b.MenuId where a.ParentId.ToString()==menuId && b.RoleId.ToString()==roleId &&a.IsDeleted==false select new{a.MenuName,b }).ToList();
            return Json(lstItem, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetRoleForUser(string id)
        {
            var lstRoleForUser = (from a in dbContext.Roles join b in dbContext.UserInRole on a.RoleId equals b.RoleId where b.UserId.ToString() == id select a).ToList();
            return Json(lstRoleForUser, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public string SetRoleUser(string userId, string roleId, bool check)
        {

            try
            {
                bool checkRole = true;
                List<UserInRole> lst = dbContext.UserInRole.Where(x => x.UserId.ToString() == userId && x.RoleId.ToString() == roleId).ToList<UserInRole>();
                if (lst.Count == 0) checkRole = false;
                if (checkRole == true)
                {
                    if (check == false)
                    {
                        UserInRole uRole = dbContext.UserInRole.Where(x => x.UserId.ToString() == userId && x.RoleId.ToString() == roleId).FirstOrDefault();
                        dbContext.UserInRole.Remove(uRole);
                        dbContext.SaveChanges();
                    }
                }
                else
                {
                    if (check == true)
                    {
                        UserInRole userR = new UserInRole();
                        userR.RoleId = Guid.Parse(roleId);
                        userR.UserId = Guid.Parse(userId);
                        dbContext.UserInRole.Add(userR);
                        dbContext.SaveChanges();
                    }
                }

            }
            catch (Exception e)
            {
                return "err";
            }
            return "succ";
        }
        //Câp nhật quyền menu 
        public string UpdateRoleMenu(List<RoleInMenu> roles)
        {
            try
            {
                for (int i = 1; i < roles.Count; i++)
                {
                    RoleInMenu role = new RoleInMenu();
                    var item = roles[i];

                    role = dbContext.RoleInMenu.Where(x => x.Id.ToString() == item.Id.ToString() && x.MenuId == item.MenuId && x.RoleId == item.RoleId).FirstOrDefault();
                    if (role != null)
                    {
                        role.IsShow = item.IsShow;
                        role.IsAdd = item.IsAdd;
                        role.IsEdit = item.IsEdit;
                        role.IsDelete = item.IsDelete;
                        role.IsAll = item.IsAll;
                        role.IsExport = item.IsExport;
                        role.IsPrint = item.IsPrint;
                        role.IsEnable = item.IsEnable;
                        dbContext.SaveChanges();

                    }

                }
            }
            catch (Exception e)
            {
                return "err";
            }
            return "succ";
        }
        //Khóa mở quyền
        [HttpPost]
        public string ActiveRole(Roles roles)
        {
            Roles a = dbContext.Roles.Where(x => x.RoleId == roles.RoleId).FirstOrDefault();
            a.RoleName = roles.RoleName;
            a.IsEnable = !roles.IsEnable;
            dbContext.SaveChanges();
            if (!roles.IsEnable == true) return "succ";
            else return "err";
        }


    }

}