using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webDashboard.Models.dashboard;

namespace webDashboard.Models
{
    enum DataTypeRetun
    {
        json,
        datatable,
        dataset,
        text,
        number
    }
    public class Repository : IRepository
    {
        private DashboardContext _context;
        private IConfigurationRoot _config;

        public Repository(DashboardContext context, IConfigurationRoot configurationRoot)
        {
            _context = context;
            _config = configurationRoot;
        }
        public DashboardContext getDashboardContext()
        {
            return _context;
        }

        public DataTable GetDataTableFromSP(string query)
        {
            return (DataTable)GetStoreProcedure(2, DataTypeRetun.datatable);
        }
        public string GetJsonFromSP(string query)
        {
            return (GetStoreProcedure(2, DataTypeRetun.json)).ToString();
        }

        private async Task<IEnumerable<object>> GetStoreProcedureAsync(int wt_id)
        {
            var returnObject = new List<dynamic>();
            SqlConnection con = new SqlConnection($"{_config["dashboard:1:officeConnection"]}");
            using (var cmd = new SqlCommand())
            {
                cmd.Connection = con;
                cmd.CommandText = "web_sp_FormBuilder_getReportOnWType";
                cmd.CommandType = CommandType.StoredProcedure;
                // set some parameters of the stored procedure
                cmd.Parameters.AddWithValue("wt_id", wt_id);
                //cmd.Parameters.Add(new SqlParameter("wt_id",
                //    SqlDbType.Int)
                //{ Value = wt_id });

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
                            try
                            {
                                dataRow.Add(
                                    dataReader.GetName(iFiled),
                                    dataReader.IsDBNull(iFiled) ? null : dataReader[iFiled] // use null instead of {}
                                );
                            }
                            catch (Exception e) { }
                        }

                        retObject.Add((ExpandoObject)dataRow);
                    }
                }
                return retObject;
            }
        }
        private object GetStoreProcedure(int wt_id, DataTypeRetun returntype)
        {
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection($"{_config["dashboard:1:officeConnection"]}");
            using (var cmd = new SqlCommand())
            {
                cmd.Connection = con;
                cmd.CommandText = "web_sp_FormBuilder_getReportOnWType";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("wt_id", wt_id);
                if (cmd.Connection.State != ConnectionState.Open)
                    cmd.Connection.Open();
                using (var dataReader =  cmd.ExecuteReader())
                {
                    if (returntype == DataTypeRetun.datatable)
                    {
                        dt.Load(dataReader);
                        return dt;
                    }
                    else if (returntype == DataTypeRetun.json)
                    {
                        return ToJson(dataReader);
                    }
                }
            }
            return null;
        }
        private String ToJson(SqlDataReader rdr)
        {
            StringBuilder sb = new StringBuilder();
            StringWriter sw = new StringWriter(sb);

            using (JsonWriter jsonWriter = new JsonTextWriter(sw))
            {
                jsonWriter.WriteStartArray();

                while (rdr.Read())
                {
                    jsonWriter.WriteStartObject();

                    int fields = rdr.FieldCount;

                    for (int i = 0; i < fields; i++)
                    {
                        jsonWriter.WritePropertyName(rdr.GetName(i));
                        jsonWriter.WriteValue(rdr[i].ToString());
                    }

                    jsonWriter.WriteEndObject();
                }

                jsonWriter.WriteEndArray();

                return sw.ToString();
            }
        }
        private Dictionary<string, List<string>> f1(DataTable dataTable)
        {
            var dictionary = new Dictionary<string, List<string>>();
            foreach (DataColumn dataColumn in dataTable.Columns)
            {
                var columnValueList = new List<string>();

                foreach (DataRow dataRow in dataTable.Rows)
                {
                    columnValueList.Add(dataRow[dataColumn.ColumnName].ToString());
                }

                dictionary.Add(dataColumn.ColumnName, columnValueList);
            }
            return dictionary;
        }
    }
}

