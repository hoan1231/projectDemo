using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class LoginController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
         // GET: /Login/  
        public ActionResult Index()  
        {  
            return View();  
        }
        [HttpPost]
        public string Login(string user,string pass)
        {
           pass= EcryptPass.Encrypt(pass);
             aspnet_User lstUser = new aspnet_User();
             var count = dbContext.aspnet_User.Where(x => x.Name==user).FirstOrDefault();
             if (count == null)
            {
                return "err";
            }
            else
            {
                if (count.Password != pass)
                {
                    HistoryLogin his = new HistoryLogin();
                    his.ID = Guid.NewGuid();
                    his.UserName = user;
                    his.Status = "Thất bại";
                    his.DateLogin = DateTime.Now;
                    his.CompayId = count.CompaID;
                    dbContext.HistoryLogin.Add(his);
                    dbContext.SaveChanges();
                    return "err";
                }
                else
                {
                    HistoryLogin his = new HistoryLogin();
                    his.ID = Guid.NewGuid();
                    his.UserName = user;
                    his.DateLogin = DateTime.Now;
                    his.CompayId = count.CompaID;
                    his.Status = "Thành công";
                    dbContext.HistoryLogin.Add(his);
                    dbContext.SaveChanges();
                    var userSession = new LoginInfo();
                    userSession.userName = count.UserName;
                    userSession.userId = count.ID;
                    Session.Add("USER_SESSION", userSession);
                    Session.Add("name", user);
                    Session.Add("userName", count.UserName);
                    Session.Add("userId", count.ID);
                    Session.Add("companyId", count.CompaID);
                    return "succ";
                }
               
            }
                
        }
      
        [HttpPost]
        public ActionResult HistoryLogin(string fromDate,string toDate,string agent)
        {
            DateTime from1 = DateTime.ParseExact(fromDate, "dd/MM/yyyy", null);
            DateTime to = DateTime.ParseExact(toDate, "dd/MM/yyyy", null);
            to = to.AddDays(1);
            Guid compa = Guid.Parse(Session["companyId"].ToString());
            if (agent == null || agent == "")
            {
                var lst = (from a in dbContext.HistoryLogin where a.DateLogin >= from1 && a.DateLogin <= to && a.CompayId == compa orderby a.DateLogin descending select a).ToList();
                return Json(lst, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var lst = (from a in dbContext.HistoryLogin where a.UserName==agent && a.DateLogin >= from1 && a.DateLogin <= to orderby a.DateLogin descending select a).ToList();
                return Json(lst, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
