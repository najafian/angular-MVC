using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webDashboard.Models.dashboard
{
    [System.ComponentModel.DataAnnotations.Schema.Table("DashboardColumn", Schema = "dbo")]
    public class DashboardColumn
    {
        [Key]
        public int column_id { get; set; }
        public string translateName { get; set; }
        public string columnName { get; set; }
        public Nullable<bool> isActive { get; set; }
        public Nullable<bool> isDeleted { get; set; }
    }
}
