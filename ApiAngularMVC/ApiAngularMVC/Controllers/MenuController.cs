using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiAngularMVC.Controllers
{
    public class MenuController : ApiController
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        // GET: api/Menu
        [HttpGet]
        public IEnumerable<MenuNew> Get()
        {
            List<MenuNew> lstMenu = dbContext.MenuNew.Where(x=>x.IsDeleted==false).ToList<MenuNew>();
            return lstMenu;
        }

        // GET: api/Menu/5
        public IEnumerable<MenuNew> GetMenu(string id)
        {
            List<MenuNew> lstMenu = dbContext.MenuNew.Where(x => x.ParentId.ToString() == id).OrderBy(x => x.OrderIndex).ToList<MenuNew>();
            return lstMenu;
        }
        // POST: api/Menu
        [HttpPost]
        public void Post(MenuNew x)
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
                dbContext.MenuNew.Add(menu);
                dbContext.SaveChanges();
            }
        }

        // PUT: api/Menu/5
        [HttpPut]
        public void Put(MenuNew menu)
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

        // DELETE: api/Menu/5
        [HttpDelete]
        public HttpResponseMessage DeleteMenu(string id)
        {
            MenuNew s = new MenuNew();
            s = dbContext.MenuNew.Where(x => x.MenuId.ToString() == id).FirstOrDefault();
            if (s != null)
            {
                dbContext.MenuNew.Remove(s);
                dbContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, s);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Something wrong !");
            }
        }
        //public void Delete(string id)
        //{
        //    MenuNew s = dbContext.MenuNew.Where(x => x.MenuId.ToString() == id).FirstOrDefault();
        //    dbContext.MenuNew.Remove(s);
        //    dbContext.SaveChanges();
        //}
    }
}
