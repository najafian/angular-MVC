import {BaseWidget} from "./base.widget";
import RenderSuccessEventArgs = ej.PivotClient.RenderSuccessEventArgs;
import BeforeExportEventArgs = ej.PivotClient.BeforeExportEventArgs;
import SaveReportEventArgs = ej.PivotClient.SaveReportEventArgs;
import FetchReportEventArgs = ej.PivotClient.FetchReportEventArgs;
import LoadReportEventArgs = ej.PivotClient.LoadReportEventArgs;
import {DiagramSegmentDirective} from "ej-angular2";
import {ANY_STATE} from "@angular/animations/browser/src/dsl/animation_transition_expr";

export class PivotclientWidget extends BaseWidget {
    widget!: ej.PivotClient;
    public widgetID!: string;
    public dashboardID!: string;
    public DataSourceColumn: ej.PivotClient.DataSourceColumn[] | undefined;
    public DataSourceRow: ej.PivotClient.DataSourceRow[] | undefined;
    public DataSourceValue: ej.PivotClient.DataSourceValue[] | undefined;
    public DataSourceFilter: ej.PivotClient.DataSourceFilter[] | undefined;

    init(containerID: string): void {
        let containerEl;
        containerEl = $('#' + containerID);
        containerEl.css('direction', 'ltr');
        containerEl.append(this.rootEl);
    }

    createWidget(): void {
        let pivot_dataset = this.getValues();
        ej.PivotGrid.Locale["fa-IR"] = {
            // DeferUpdate: "Différer Mise à jour",
            // MDXQuery: "de requêtes MDX",
            Column: "ستون",
            Row: "ردیف",
            // Slicer: "Tranche",
            // CubeSelector: "Sélecteur de Cube",
            ReportName: "نام گزارش",
            NewReport: "گزارش جدید",
            // CubeDimensionBrowser: "Cube navigateur dimnesion",
            AddReport: "اضافه کردن گزارش",
            RemoveReport: "حذف گزارش",
            Grid:'جدول'

        };
        ej.PivotGrid.Locale["fa-IR"] = {
            ToolTipRow: "ردیف",
            ToolTipColumn: "ستون",
            ToolTipValue: "مقدار"
        };
        ej.PivotChart.Locale["fa-IR"] = {
            Measure: "Mesure",
            Row: "ردیف",
            Column: "ستون",
            Value: "مقدار",
            Expand: "گسترش دادن",
            Collapse: "جمع کردن",
            Exit: "بستن"
        };
        ej.PivotSchemaDesigner.Locale["fa-IR"] = {
            AddToFilter: "اضافه به فیلتر",
            AddToRow: "اضافه به ردیف",
            AddToColumn: "اضافه به ستون",
            AddToValues: "اضافه به مقدار",
            PivotTableFieldList: "Liste des champs PivotTable",

        };
        this.widget = new ej.PivotClient($('#' + this.rootElID), {
            dataSource: {
                data: pivot_dataset,
                // rows: [
                //     {
                //         fieldName: "Country",
                //         fieldCaption: "Country"
                //     },
                //     {
                //         fieldName: "State",
                //         fieldCaption: "State"
                //     },
                //     {
                //         fieldName: "Date",
                //         fieldCaption: "Date"
                //     }
                // ],
                // columns: [
                //     {
                //         fieldName: "Product",
                //         fieldCaption: "Product"
                //     }
                // ],
                // values: [
                //     {
                //         fieldName: "Amount",
                //         fieldCaption: "Amount"
                //     }
                // ]
            },
            // title: "Relational Browser",
            renderSuccess: (args: any) => {
                $(args.element).find('#reportToolbar').remove();
                $(args.element).find('.e-link').attr('style', 'padding:6px 5px 0px 5px !important');

                //this._pivotChart.model.load = "loadTheme";
                // if (args._successAction == undefined || args._successAction == "Filter") {
                //     this.widget.model.legend.rowCount = 2;
                //     this._pivotChart.model.primaryXAxis = { title: { text: "Country" }, labelRotation: 270 };
                //     this._pivotChart.model.primaryYAxis = { title: { text: "Amount" } };
                // }
            },
            showReportCollection: false,
            // isResponsive: true,
            // enableMemberEditorPaging : true,
            // memberEditorPageSize : 100,
            // enableSplitter: true,
            enableLocalStorage: true,
            locale: "fa-IR",
            beforeExport: (e: BeforeExportEventArgs) => {
            },
            saveReport: (e: SaveReportEventArgs) => {
                return false;
            },
            fetchReport: (e: FetchReportEventArgs) => {
            },
            loadReport: (e: LoadReportEventArgs) => {
            },
            load: () => {              
            },
            size: {height: "100%", width: "100%"},
            displaySettings: {

                // controlPlacement: ej.PivotClient.ControlPlacement.Tile,
                // enableFullScreen: false,
                // mode: ej.PivotClient.DisplayMode.GridOnly,
                // defaultView: ej.PivotClient.DefaultView.Grid,
                //  enableTogglePanel: true,

            },
            toolbarIconSettings: {
                enablePdfExport: false,
                enableMDXQuery: false,
                enableWordExport: false,
                enableRemoveReport: false,
                enableRenameReport: false,
                enableNewReport: false,
                enableDBManipulation: false,
                enableSortOrFilterColumn: false,
                enableExcelExport: false,
                enableCalculatedMember: false,
                enableAddReport: false,
                enableSortOrFilterRow: false,
                enableChartTypes: false,
                enableDeferUpdate: false,
                enableFullScreen: false,
                enableToggleAxis: false,

            },
            collapseCubeBrowserByDefault: false,
            // chartType: ej.PivotChart.ChartTypes.Column,
            enablePivotTreeMap: false,
            enableRTL: true,
        });

    }

    constructor(containerID: string) {
        super();
        this.init(containerID);
        // this.setValues([
        //     {Amount: 100, Country: "Canada", Date: "FY 2005", Product: "Bike", Quantity: 2, State: "Alberta"},
        //     {Amount: 200, Country: "Canada", Date: "FY 2006", Product: "Van", Quantity: 3, State: "British Columbia"},
        //     {Amount: 300, Country: "Canada", Date: "FY 2007", Product: "Car", Quantity: 4, State: "Brunswick"},
        //     {Amount: 150, Country: "Canada", Date: "FY 2008", Product: "Bike", Quantity: 3, State: "Manitoba"},
        //     {Amount: 200, Country: "Canada", Date: "FY 2006", Product: "Car", Quantity: 4, State: "Ontario"},
        //     {Amount: 100, Country: "Canada", Date: "FY 2007", Product: "Van", Quantity: 1, State: "Quebec"},
        //     {Amount: 200, Country: "France", Date: "FY 2005", Product: "Bike", Quantity: 2, State: "Charente-Maritime"},
        //     {Amount: 250, Country: "France", Date: "FY 2006", Product: "Van", Quantity: 4, State: "Essonne"},
        //     {Amount: 300, Country: "France", Date: "FY 2007", Product: "Car", Quantity: 3, State: "Garonne (Haute)"},
        //     {Amount: 150, Country: "France", Date: "FY 2008", Product: "Van", Quantity: 2, State: "Gers"},
        //     {Amount: 200, Country: "Germany", Date: "FY 2006", Product: "Van", Quantity: 3, State: "Bayern"},
        //     {Amount: 250, Country: "Germany", Date: "FY 2007", Product: "Car", Quantity: 3, State: "Brandenburg"},
        //     {Amount: 150, Country: "Germany", Date: "FY 2008", Product: "Car", Quantity: 4, State: "Hamburg"},
        //     {Amount: 200, Country: "Germany", Date: "FY 2008", Product: "Bike", Quantity: 4, State: "Hessen"},
        //     {
        //         Amount: 150,
        //         Country: "Germany",
        //         Date: "FY 2007",
        //         Product: "Van",
        //         Quantity: 3,
        //         State: "Nordrhein-Westfalen"
        //     },
        //     {Amount: 100, Country: "Germany", Date: "FY 2005", Product: "Bike", Quantity: 2, State: "Saarland"},
        //     {Amount: 150, Country: "United Kingdom", Date: "FY 2008", Product: "Bike", Quantity: 5, State: "England"},
        //     {Amount: 250, Country: "United States", Date: "FY 2007", Product: "Car", Quantity: 4, State: "Alabama"},
        //     {Amount: 200, Country: "United States", Date: "FY 2005", Product: "Van", Quantity: 4, State: "California"},
        //     {Amount: 100, Country: "United States", Date: "FY 2006", Product: "Bike", Quantity: 2, State: "Colorado"},
        //     {Amount: 150, Country: "United States", Date: "FY 2008", Product: "Car", Quantity: 3, State: "New Mexico"},
        //     {Amount: 200, Country: "United States", Date: "FY 2005", Product: "Bike", Quantity: 4, State: "New York"},
        //     {
        //         Amount: 250,
        //         Country: "United States",
        //         Date: "FY 2008",
        //         Product: "Car",
        //         Quantity: 3,
        //         State: "North Carolina"
        //     },
        //     {
        //         Amount: 300,
        //         Country: "United States",
        //         Date: "FY 2007",
        //         Product: "Van",
        //         Quantity: 4,
        //         State: "South Carolina"
        //     }
        // ]);
    }


}