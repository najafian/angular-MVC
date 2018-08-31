import {NgModule} from "@angular/core";
import {DashboardWidgetUI} from "./dashboard/dashboardViewer/dashboard.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {WidgetModule} from "../../widgets/widget.module";
import {BaseWidget} from "../../widgets/baseWidget/base.widget";
import {GridsterModule} from "angular-gridster2";
import {AnalyserWidgetUI} from "./dashboard/gadgetAnalyser/analyser.component";
import {WorkflowDesignerUI} from "./workflow/designer/workflowDesigner.component";
import {ExplorerWidgetUI} from "./dashboard/dashboardExploere/explorer.component";


@NgModule({
    declarations: [
        DashboardWidgetUI,WorkflowDesignerUI,AnalyserWidgetUI,ExplorerWidgetUI
    ],
    imports: [
        BrowserModule,
        CommonModule,
        GridsterModule,
        // GridStackModule,
        WidgetModule],
    exports: [DashboardWidgetUI,AnalyserWidgetUI,ExplorerWidgetUI,WorkflowDesignerUI],
    entryComponents:[BaseWidget]

})
export class TabContentModule {

}