using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webDashboard.Models.dashboard
{
    [System.ComponentModel.DataAnnotations.Schema.Table("DashboardFolderGadget", Schema = "dbo")]
    public class DashboardFolderGadget
    {
        [Key]
        public int foldergadget_id { get; set; }

        public Nullable<int> folder_id { get; set; }
        public Nullable<int> gadget_id { get; set; }
        public Nullable<bool> isShared { get; set; }
        public Nullable<bool> isDeleted { get; set; }
        public Nullable<bool> isActive { get; set; }
        public Nullable<bool> isReadOnly { get; set; }
        [ForeignKey("folder_id")]
        public ICollection<DashboardFolder> DashboardFolders { get; set; }
        [ForeignKey("gadget_id")]

        public ICollection<DashboardGadget> DashboardGadgets { get; set; }

    }
}
