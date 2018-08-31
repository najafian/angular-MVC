using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using webDashboard.Models;
using webDashboard.Models.dashboard;

namespace webDashboard.Controllers
{
    public class HomeController : Controller
    {
        private DashboardContext _dashboardContext;

        public HomeController(DashboardContext dashboardContext,IConfigurationRoot root)
        {
            _dashboardContext = dashboardContext;
           
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

    }
}
