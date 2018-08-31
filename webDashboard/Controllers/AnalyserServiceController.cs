using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Data;
using webDashboard.Models;
using webDashboard.Models.dashboard;

namespace webDashboard.Controllers
{
    [Route("api/[controller]")]
    public class AnalyserServiceController : Controller
    {
        
        private IConfigurationRoot _config;
        private DashboardContext _dashboardContext;
        Repository repository;
        
        public AnalyserServiceController(DashboardContext dashboardContext,IConfigurationRoot configurationRoot)
        {
            _config = configurationRoot;
            _dashboardContext = dashboardContext;
            repository = new Repository(_dashboardContext, _config);
        }
        [HttpGet("[action]")]
      
        public string getExistWorkTypeValues()
        {

            var dt = repository.GetJsonFromSP("");
            return dt;
        }
       
    }
}