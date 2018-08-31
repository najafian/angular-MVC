import {NgModule} from "@angular/core";
import {BodyComponent} from "./body.component";
import {DashboardService} from "./tabContents/dashboard/dashboardViewer/dashboard.service";
import { DashboardWidgetUI } from "./tabContents/dashboard/dashboardViewer/dashboard.component";
import { TabContentDirective } from "../directives/widget/tab.content.directive";
import {TabContentModule} from "./tabContents/tab.content.module";
// import {BaseWidget} from "../widgets/baseWidget/base.widget";
// import {WidgetModule} from "../widgets/widget.module";
import {AnalyserWidgetUI} from "./tabContents/dashboard/gadgetAnalyser/analyser.component";
import {WorkflowDesignerUI} from "./tabContents/workflow/designer/workflowDesigner.component";
import {ExplorerWidgetUI} from "./tabContents/dashboard/dashboardExploere/explorer.component";

@NgModule({
    declarations: [BodyComponent, TabContentDirective  ],
    imports: [TabContentModule],
    exports: [BodyComponent],
    entryComponents: [DashboardWidgetUI,AnalyserWidgetUI,ExplorerWidgetUI,WorkflowDesignerUI],
    providers:[DashboardService]
})
export class MaincontentModule{

}