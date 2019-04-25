using ApiAngularMVC.Models;
using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class MemberController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult GetInfoUser()
        {
            string userId = Session["userId"].ToString();
            aspnet_User lstUser = dbContext.aspnet_User.Where(x=>x.ID.ToString()==userId).FirstOrDefault();
            return Json(lstUser, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetMember()
        {
            Guid companyId =Guid.Parse(Session["companyId"].ToString());

            var lst = (from a in dbContext.aspnet_User
                       join b in dbContext.Company on a.CompaID equals b.Id
                       where b.Id == companyId
                       select new { a, nameCom=b.Name }).ToList();
          //  List<aspnet_User> lstUser = dbContext.aspnet_User.OrderBy(x => x.Name).ToList<aspnet_User>();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
      
        [HttpGet]
        public void SignOut()
        {
            HistoryLogin his = new HistoryLogin();
            his.ID = Guid.NewGuid();
            his.UserName = Session["name"].ToString();
            his.Status = "Đăng xuất";
            his.DateLogin = DateTime.Now;
            his.CompayId = Guid.Parse(Session["companyId"].ToString());
            dbContext.HistoryLogin.Add(his);
            dbContext.SaveChanges();
            Session["USER_SESSION"] = null;
        }
       
       
        [HttpGet]
        public ActionResult GetAgent()
        {
            var companyId = Session["companyId"];
            List<aspnet_User> lstUser = dbContext.aspnet_User.OrderBy(x => x.Name).Where(x=>x.CompaID.ToString()==companyId.ToString()).ToList<aspnet_User>();
            return Json(lstUser, JsonRequestBehavior.AllowGet);
        }
        //Lay danh sach user theo roleId
        [HttpPost]
        public ActionResult GetUserByRole(string roleId)
        {
            var companyId = Session["companyId"];
            Guid compa = Guid.Parse(companyId.ToString());
            var lstUser=(from a in dbContext.aspnet_User join b in dbContext.UserInRole on a.ID equals b.UserId where b.RoleId.ToString()==roleId && a.CompaID==compa select a).ToList();
            return Json(lstUser, JsonRequestBehavior.AllowGet);
        }
        //Update member
        [HttpPost]
        public string UpdateMember(aspnet_User x)
        {
            aspnet_User u = dbContext.aspnet_User.Where(a => a.ID == x.ID).FirstOrDefault();
            u.Phone = x.Phone;
            u.Address = x.Address;
            u.Email = x.Email;
            u.Name = x.Name;
            u.UserName = x.UserName;
            dbContext.SaveChanges();
            return "succ";
        }
        [HttpPost]
        public string ImportMember()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    string filePath = string.Empty;
                    int ins = 0, upd = 0;
                    if (Request != null)
                    {
                        HttpPostedFileBase file = Request.Files["file"];
                        if ((file != null) && (file.ContentLength > 0) && !string.IsNullOrEmpty(file.FileName))
                        {

                            string fileName = file.FileName;
                            string fileContentType = file.ContentType;
                            string path = Server.MapPath("~/Uploads/");
                            if (!Directory.Exists(path))
                            {
                                Directory.CreateDirectory(path);
                            }
                            filePath = path + Path.GetFileName(file.FileName);
                            string extension = Path.GetExtension(file.FileName);
                            file.SaveAs(filePath);
                            Stream stream = file.InputStream;
                            // We return the interface, so that  
                            IExcelDataReader reader = null;
                            if (file.FileName.EndsWith(".xls"))
                            {
                                reader = ExcelReaderFactory.CreateBinaryReader(stream);
                            }
                            else if (file.FileName.EndsWith(".xlsx"))
                            {
                                reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                            }
                            else
                            {
                                return "errFile";
                            }
                            //  reader.IsFirstRowAsColumnNames = true;
                            DataSet result = reader.AsDataSet();
                            reader.Close();
                            string col = "";
                            //delete the file from physical path after reading   
                            string filedetails = path + fileName;
                            FileInfo fileinfo = new FileInfo(filedetails);
                            if (fileinfo.Exists)
                            {
                                fileinfo.Delete();
                            }
                            DataTable dt = result.Tables[0];
                            for (int i = 1; i < dt.Rows.Count; i++)
                            {
                                if (dt.Rows[0]["Column0"].ToString().Trim() != "UserName" ||
                                    dt.Rows[0]["Column1"].ToString().Trim() != "FullName"
                                    || dt.Rows[0]["Column2"].ToString().Trim() != "Email"
                                    || dt.Rows[0]["Column3"].ToString().Trim() != "Pass" ||
                                    dt.Rows[0]["Column4"].ToString().Trim() != "Phone"||
                                    dt.Rows[0]["Column5"].ToString().Trim() != "Address")
                                {
                                    return "errfile";
                                }
                                else
                                {
                                    string userName = "", pass = "", email = "", phone = "", fullname = "", address = "";
                                    fullname = !Convert.IsDBNull(dt.Rows[i]["Column1"]) ? dt.Rows[i]["Column1"].ToString().Trim() : "";
                                    userName = !Convert.IsDBNull(dt.Rows[i]["Column0"]) ? dt.Rows[i]["Column0"].ToString().Trim() : "";
                                    email = !Convert.IsDBNull(dt.Rows[i]["Column2"]) ? dt.Rows[i]["Column2"].ToString().Trim() : "";
                                    pass = !Convert.IsDBNull(dt.Rows[i]["Column3"]) ? dt.Rows[i]["Column3"].ToString().Trim() : "";
                                    phone = !Convert.IsDBNull(dt.Rows[i]["Column4"]) ? dt.Rows[i]["Column4"].ToString().Trim() : "";
                                    address = !Convert.IsDBNull(dt.Rows[i]["Column5"]) ? dt.Rows[i]["Column5"].ToString().Trim() : "";

                                    if (userName != "" && fullname != "")
                                    {
                                        var users = dbContext.aspnet_User.Where(x=>x.Name==userName).FirstOrDefault();
                                        if (users == null)
                                        {
                                            aspnet_User user = new aspnet_User();
                                            user.ID = Guid.NewGuid();
                                            user.Name = userName;
                                            user.CompaID = Guid.Parse(Session["companyId"].ToString());
                                            user.UserName = fullname;
                                            user.Email = email;
                                            user.Address = address;
                                            user.Phone = phone;
                                            user.Password = EcryptPass.Encrypt(pass);
                                            user.CreateDate = DateTime.Now;
                                            var a = Session["name"];
                                            user.CreateBy = a.ToString();

                                            dbContext.aspnet_User.Add(user);
                                            dbContext.SaveChanges();
                                            ins++;
                                        }
                                        else
                                        {
                                            
                                            upd++;
                                        }
                                    }
                                }

                            }

                        }

                    }
                    string result1 = ins + ";" + upd;
                    return result1;
                }
                catch
                {
                    return "errFiles";
                }
            }
            else return "errfound";
        }

        //change pass
        [HttpPost]
        public string ChangePass(Guid id, string passOld,string pass)
        {
            passOld = EcryptPass.Encrypt(passOld);
           aspnet_User u=new aspnet_User();
            u = dbContext.aspnet_User.Where(x => x.ID==id &&x.Password==passOld).FirstOrDefault();
            if (u == null)
            {
                return "err";
            }
            else
            {
                u.Password = EcryptPass.Encrypt(pass);
                dbContext.SaveChanges();
                return "succ";
            }
        }
        [HttpPost]
        public void AddMember(string fullName,string name,string pass,string role,string company,string email,string address,string phone)
        {
            aspnet_User user = new aspnet_User();
            user.ID = Guid.NewGuid();
            user.Name = name;
            user.CompaID = Guid.Parse(company);
            user.UserName = fullName;
            user.Email = email;
            user.Address = address;
            user.Phone = phone;
            user.Password = EcryptPass.Encrypt(pass);
            user.CreateDate = DateTime.Now;
            var a = Session["userName"];
            user.CreateBy = a.ToString();
           
            dbContext.aspnet_User.Add(user);
            dbContext.SaveChanges();
           // dbContext.aspnet_UsersInRoles.Add(x);
            //dbContext.SaveChanges();
        }
    }
}