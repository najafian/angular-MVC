using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using webDashboard.Models.dashboard;

namespace webDashboard.Models
{
    interface IRepository
    {
        DashboardContext getDashboardContext();
        string GetJsonFromSP(string query);
        DataTable  GetDataTableFromSP(string query);

    }
}
