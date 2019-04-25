using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApiAngularMVC.Models;

namespace ApiAngularMVC.Controllers
{
    public class NhanVienController : ApiController
    {
        //private ModelApiEntities model = new ModelApiEntities();
        //// GET: api/NhanVien
        //[HttpGet]
        //public IEnumerable<NhanVien> Get()
        //{
        //    return model.NhanVien.AsEnumerable();
        //}

        //// GET: api/NhanVien/5
        //public IEnumerable<NhanVien> Get(string id)
        //{
        //    List<NhanVien> lst = new List<NhanVien>();
        //    if (id == "--Chon--")
        //        lst = model.NhanVien.ToList<NhanVien>();
        //    else lst = model.NhanVien.Where(x => x.TenNhanVien == id).ToList<NhanVien>();
        //    return lst;

        //}
        //[HttpPost]
        //// POST: api/NhanVien
        //public void Post(NhanVien nv)
        //{
        //    //  List<NhanVien> s = model.NhanViens.Where(x => x.MaNV == nv.MaNV).ToList<NhanVien>();
        //    // if (s.Count == 0)
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            model.NhanVien.Add(nv);
        //            model.SaveChanges();
        //        }
        //    }

        //}

        //// PUT: api/NhanVien/5
        //// public void Put(int id, [FromBody]string value)
        //[HttpPut]
        //public HttpResponseMessage UpdateEmployee(NhanVien nv)
        //{
        //    NhanVien s = new NhanVien();
        //    s = model.NhanVien.Where(x => x.MaNhanVien == nv.MaNhanVien).FirstOrDefault();
        //    if (s != null)
        //    {

        //        s.TenNhanVien = nv.TenNhanVien;
        //        s.DiaChi = nv.DiaChi;
        //        model.SaveChanges();
        //        return Request.CreateResponse(HttpStatusCode.OK, nv);
        //    }
        //    else
        //        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Something wrong !");
        //}
        //[HttpDelete]
        //// DELETE: api/NhanVien/5

        //public HttpResponseMessage DeleteEmployee(string Id)
        //{
        //    NhanVien emp = new NhanVien();
        //    emp = model.NhanVien.Find(Id);
        //    if (emp != null)
        //    {
        //        model.NhanVien.Remove(emp);
        //        model.SaveChanges();
        //        return Request.CreateResponse(HttpStatusCode.OK, emp);
        //    }
        //    else
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Something wrong !");
        //    }
        //}
        ////public void Delete(string a)
        ////{
        ////    NhanVien nv = new NhanVien();
        ////    nv = model.NhanViens.Where(x => x.MaNV == a).FirstOrDefault();
        ////    model.NhanViens.Remove(nv);
        ////    model.SaveChanges();
        ////}
    }
}
