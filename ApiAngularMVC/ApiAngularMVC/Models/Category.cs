//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ApiAngularMVC.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Category
    {
        public System.Guid ID { get; set; }
        public string CatName { get; set; }
        public string CatCode { get; set; }
        public System.Guid CatTypeId { get; set; }
        public string MatCode { get; set; }
        public Nullable<System.Guid> CatManufacturer { get; set; }
        public Nullable<double> RetailPrice { get; set; }
        public Nullable<double> Price { get; set; }
        public Nullable<double> PurchasePrice { get; set; }
        public Nullable<bool> IsRecyclebin { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string Tag { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> SortIndex { get; set; }
    }
}