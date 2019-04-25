using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiAngularMVC.Controllers
{
    [Serializable]
    public class LoginInfo
    {
        // GET: LoginInfo
        public Guid userId { set; get; }
        public string userName { set; get; }
    }
}