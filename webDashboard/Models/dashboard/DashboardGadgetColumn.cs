using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webDashboard.Models.dashboard
{
    [System.ComponentModel.DataAnnotations.Schema.Table("DashboardGadgetColumn", Schema = "dbo")]
    public class DashboardGadgetColumn
    {
        [Key]
        public int gadgetColumn_id { get; set; }
        public int gadget_id { get; set; }
        public int column_id { get; set; }
        public Nullable<bool> isDeleted { get; set; }
        public Nullable<bool> isActive { get; set; }
        [ForeignKey("gadget_id")]
        public ICollection<DashboardGadget> DashboardGadgets { get; set; }
        [ForeignKey("column_id")]
        public ICollection<DashboardColumn> DashboardColumns { get; set; }
    }
}
