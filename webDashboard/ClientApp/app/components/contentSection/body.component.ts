import {
    Component,
    ElementRef,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    ComponentFactoryResolver,
    AfterViewInit, ChangeDetectorRef
} from "@angular/core";
import * as $ from 'jquery';
import {TabType} from "../services/widgetType";
import {TabContentDirective} from "../directives/widget/tab.content.directive";
import {MainServices} from "../services/MainServices";
import {DashboardWidgetUI} from "./tabContents/dashboard/dashboardViewer/dashboard.component";
import {AnalyserWidgetUI} from "./tabContents/dashboard/gadgetAnalyser/analyser.component";
import {WorkflowDesignerUI} from "./tabContents/workflow/designer/workflowDesigner.component";
import {ExplorerWidgetUI} from "./tabContents/dashboard/dashboardExploere/explorer.component";
// import {BPMNWidget} from "./tabContents/widgets/BPMN";
// import BPMNActivity = ej.datavisualization.Diagram.BPMNActivity;
// import BPMNLoops = ej.datavisualization.Diagram.BPMNLoops;


@Component({
    selector: '[body-app]',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BodyComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

    @ViewChild(TabContentDirective) adHost: TabContentDirective | undefined;

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngOnInit(): void {
        this.initialTabPanel();
        this.addTabPanel();


    }


    private initialTabPanel() {


        this.tabService.mainTab = new ej.Tab($(this.el.nativeElement), {
            showCloseButton: true,
            enableRTL: true,
            headerPosition: ej.Tab.Position.Top,
            width: "100%",
            height: "100%",
            itemActive: (args) => {
                console.log(args);
            },
            create: (args: ej.Tab.CreateEventArgs) => {
                console.log(args);
            },
            itemAdd: (args: ej.Tab.ItemAddEventArgs) => {
                console.log(args);
            },
            itemRemove: (args: ej.Tab.ItemRemoveEventArgs) => {
                this.tabService.removeTabItem();
                console.log(args);
            },
            beforeActive: (args) => {
                //  alert();
            },
            heightAdjustMode: ej.Tab.HeightAdjustMode.Fill
        });
    }

    private addTabPanel() {
        // $('ul').bind('click', () => {
        //     $('body-app').attr('height', '100%');
        // });
    }

    constructor(private tabService: MainServices, private changeDetector: ChangeDetectorRef, private el: ElementRef, private componentFactoryResolver: ComponentFactoryResolver) {

        tabService.getWidgetOservable().subscribe(
            (data: TabType) => {
                if (this.adHost != undefined)
                    if (data === TabType.dashboardViewer) {
                        this.tabService.addComponent(DashboardWidgetUI, componentFactoryResolver, this.adHost.viewContainerRef, TabType.dashboardViewer);
                    } else if (data === TabType.dashboardDesigner) {
                        this.tabService.addComponent(AnalyserWidgetUI, componentFactoryResolver, this.adHost.viewContainerRef, TabType.dashboardDesigner);
                    } else if (data === TabType.workflowDesigner) {
                        this.tabService.addComponent(WorkflowDesignerUI, componentFactoryResolver, this.adHost.viewContainerRef, TabType.workflowDesigner);
                    }else if (data === TabType.dashboardExplorer) {
                        this.tabService.addComponent(ExplorerWidgetUI, componentFactoryResolver, this.adHost.viewContainerRef, TabType.dashboardExplorer);

                    }
            },
            (error: any) => {
            },
            () => {

            }
        );
    }


}