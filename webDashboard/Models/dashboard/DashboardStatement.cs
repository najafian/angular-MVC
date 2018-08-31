using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webDashboard.Models.dashboard
{
    [System.ComponentModel.DataAnnotations.Schema.Table("DashboardStatement", Schema = "dbo")]
    public class DashboardStatement
    {
        [Key]
        public int statement_id { get; set; }
        public string queryStatement { get; set; }
        public byte[] connectionInfo { get; set; }
        public string statementName { get; set; }

    }
}
