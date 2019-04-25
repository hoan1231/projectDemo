using ApiAngularMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    public class OrderImportController : Controller
    {
        private DemoApiEntities dbContext = new DemoApiEntities();
        // GET: OrderImport
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string CreateOrderImport(List<DetailInvoiceImport> list,string supp,string comp,string date,int sum)
        {
            try
            {
                Guid user1 = Guid.Parse(Session["userId"].ToString());
                Guid importId = Guid.NewGuid();
                ImportInvoice x = new ImportInvoice();
                x.Id = importId;
                x.CreatedDate = DateTime.Now;
                x.SupplierId = Guid.Parse(supp);
                x.CompanyId = Guid.Parse(comp);
                x.UserId = user1;
                x.SumMoney = sum;
                x.CreatedBy = Session["name"].ToString();
                dbContext.ImportInvoice.Add(x);
                dbContext.SaveChanges();

                for(int i=0;i<list.Count;i++)
                {
                    DetailInvoiceImport d = new DetailInvoiceImport();
                    d.Id = Guid.NewGuid();
                    d.ImportId = importId;
                    d.CatId = list[i].CatId;
                    d.CatNumberImport = list[i].CatNumberImport;
                    d.PlaceReceive = list[i].PlaceReceive;
                    d.SumMoney = list[i].SumMoney;
                    d.VAT = list[i].VAT;
                    d.Price = list[i].Price;
                    d.Decription = list[i].Decription;
                    d.CreatedBy = Session["name"].ToString();
                    d.CreatedDate = DateTime.Now;
                    dbContext.DetailInvoiceImport.Add(d);
                    dbContext.SaveChanges();
                    var cat = list[i].CatId;
                    var com = comp;
                    Guid comp1 = Guid.Parse(comp);
                    Cat_Company lst = new Cat_Company();
                     lst = dbContext.Cat_Company.Where(m => m.CatId == cat && m.CompanyId==comp1).FirstOrDefault();
                  
                    if(lst !=null)
                    {
                        
                        lst.CatNumber += list[i].CatNumberImport;
                        dbContext.SaveChanges();
                      
                    }
                    else
                    {
                        Cat_Company c = new Cat_Company();
                        c.Id = Guid.NewGuid();
                        c.CompanyId = Guid.Parse(comp);
                        c.CatId = Guid.Parse(list[i].CatId.ToString());
                        c.CatNumber = list[i].CatNumberImport;
                        dbContext.Cat_Company.Add(c);
                        dbContext.SaveChanges();
                    }
                   
                }
                          
                
               
            }
            catch (Exception ex)
            {
                return "err";
            }
            return "succ";


        }
    }
}