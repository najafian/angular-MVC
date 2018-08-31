using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace webDashboard.Models.dashboard
{
    public class DashboardContext : DbContext
    {
        private IConfigurationRoot _configurationRoot;

        public DashboardContext(IConfigurationRoot configurationRoot,DbContextOptions dbContextOptions)
            :base(dbContextOptions)
        {
            _configurationRoot = configurationRoot;
        }
        public DbSet<DashboardColumn> DashboardColumns { get; set; }
        public DbSet<DashboardFolder> DashboardFolders { get; set; }
        public DbSet<DashboardFolderGadget> DashboardFolderGadgets { get; set; }
        public DbSet<DashboardGadget> DashboardGadgets { get; set; }
        public DbSet<DashboardGadgetColumn> DashboardGadgetColumns { get; set; }
        public DbSet<DashboardStatement> DashboardStatements { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
           // optionsBuilder.UseSqlServer($"{_configurationRoot["dashboard:0:webDashboardConnection"]}");
        }
        public async Task<IEnumerable<object>> GetStoreProcedureAsync()
        {
            var returnObject = new List<dynamic>();

            using (var cmd = Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "store1";
                cmd.CommandType = CommandType.StoredProcedure;
                // set some parameters of the stored procedure
                //cmd.Parameters.Add(new SqlParameter("@someParam",
                //    SqlDbType.TinyInt)
                //{ Value = 1 });

                if (cmd.Connection.State != ConnectionState.Open)
                    cmd.Connection.Open();

                var retObject = new List<dynamic>();
                using (var dataReader = await cmd.ExecuteReaderAsync())
                {
                    while (await dataReader.ReadAsync())
                    {
                        var dataRow = new ExpandoObject() as IDictionary<string, object>;
                        for (var iFiled = 0; iFiled < dataReader.FieldCount; iFiled++)
                        {
                            // one can modify the next line to
                            //   if (dataReader.IsDBNull(iFiled))
                            //       dataRow.Add(dataReader.GetName(iFiled), dataReader[iFiled]);
                            // if one want don't fill the property for NULL
                            // returned from the database
                            dataRow.Add(
                                dataReader.GetName(iFiled),
                                dataReader.IsDBNull(iFiled) ? null : dataReader[iFiled] // use null instead of {}
                            );
                        }

                        retObject.Add((ExpandoObject)dataRow);
                    }
                }
                return retObject;
            }
        }

        public IEnumerable<object> GetStoreProcedure()
        {
            var returnObject = new List<dynamic>();

            using (var cmd = Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "store1";
                cmd.CommandType = CommandType.StoredProcedure;
                // set some parameters of the stored procedure
                //cmd.Parameters.Add(new SqlParameter("@someParam",
                //    SqlDbType.TinyInt)
                //{ Value = 1 });

                if (cmd.Connection.State != ConnectionState.Open)
                    cmd.Connection.Open();

                var retObject = new List<dynamic>();
                using (var dataReader =  cmd.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        var dataRow = new ExpandoObject() as IDictionary<string, object>;
                        for (var iFiled = 0; iFiled < dataReader.FieldCount; iFiled++)
                        {
                            // one can modify the next line to
                            //   if (dataReader.IsDBNull(iFiled))
                            //       dataRow.Add(dataReader.GetName(iFiled), dataReader[iFiled]);
                            // if one want don't fill the property for NULL
                            // returned from the database
                            dataRow.Add(
                                dataReader.GetName(iFiled),
                                dataReader.IsDBNull(iFiled) ? null : dataReader[iFiled] // use null instead of {}
                            );
                        }

                        retObject.Add((ExpandoObject)dataRow);
                    }
                }
                return retObject;
            }
        }
    }
}
