using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webDashboard.Models.dashboard
{
    [System.ComponentModel.DataAnnotations.Schema.Table("DashboardGadget", Schema = "dbo")]
    public class DashboardGadget
    {
        [Key]
        public int gadget_id { get; set; }
        public Nullable<int> folder_id { get; set; }
        public Nullable<int> value_id { get; set; }
        public Nullable<int> row_id { get; set; }
        public Nullable<int> filter_id { get; set; }
        public Nullable<int> column_id { get; set; }
        public Nullable<int> statement_id { get; set; }
        public Nullable<int> workType_id { get; set; }
        public Nullable<int> record_id { get; set; }
        public string gadgetName { get; set; }
        public string config { get; set; }
        public Nullable<DateTime> createdDate { get; set; }
        public Nullable<int> createdBy { get; set; }

        public Nullable<int> updatedBy { get; set; }
        public Nullable<DateTime> updatedDate { get; set; }
        public string accesibility { get; set; }
        public Nullable<bool> isDeleted { get; set; }
        public Nullable<bool> isReadOnly { get; set; }

        //public ICollection<DashboardStatement> dashboardStatements { get; set; }

    }
}
