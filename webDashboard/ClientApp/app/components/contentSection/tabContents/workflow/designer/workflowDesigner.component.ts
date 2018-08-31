import {ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnChanges, Renderer2} from "@angular/core";
import {ContentService} from "../../common/BaseTabContent";
import {MainServices} from "../../../../services/MainServices";
import {DashboardService} from "../../dashboard/dashboardViewer/dashboard.service";
// import {Guid} from "../../../../services/GUIDService";
import {BPMNWidget} from "../../widgets/BPMN";


@Component({
    selector: '[app-designer]',
    templateUrl: './workflowDesigner.component.html',
    styleUrls: ['./workflowDesigner.component.css']
})
export class WorkflowDesignerUI extends ContentService implements OnChanges {
    tabID!: string;
    tabLabel!: string;
    elementRef: ElementRef;
    renderer2: Renderer2;
    mainService: MainServices;

    constructor(el: ElementRef, ren: Renderer2, mainService: MainServices, private dashboardService: DashboardService, cd: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.componentFactoryResolver = componentFactoryResolver;
        this.elementRef = el;
        this.renderer2 = ren;
        this.mainService = mainService;
        this.changeDetectorRef = cd;
    }
    ngOnInit() {
        this.tabInit(this.renderer2, this.elementRef, this.mainService);
        // let elementID = 'element-' + Guid.newGuid();
        this.renderer2.setAttribute(this.elementRef.nativeElement, 'id', this.tabID);
        this.renderer2.setStyle(this.elementRef.nativeElement, 'direction', 'ltr');
        let bpmnWidget = new BPMNWidget();
        bpmnWidget.init(this.tabID);
        bpmnWidget.createWidget();
       // this.pivot.push(bpmnWidget);
    }
   
}