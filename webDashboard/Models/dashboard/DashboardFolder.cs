using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webDashboard.Models.dashboard
{
    [Table("DashboardFolder", Schema = "dbo")]
    public class DashboardFolder
    {
        [Key]
        public int folder_id { get; set; }
        public string folderName { get; set; }
        public string accessibility { get; set; }
        public bool isDeleted { get; set; }
        public Nullable<DateTime> createdDate { get; set; }
        public Nullable<int> createdBy { get; set; }

        public Nullable<int> updatedBy { get; set; }
        public Nullable<DateTime> updatedDate { get; set; }
        public String config { get; set; }


    }
}
