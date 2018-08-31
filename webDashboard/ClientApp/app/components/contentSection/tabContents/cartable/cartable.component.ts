import {ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnChanges, Renderer2} from "@angular/core";
import {ContentService} from "../common/BaseTabContent";
import {MainServices} from "../../../services/MainServices";
import {DashboardService} from "../dashboard/dashboardViewer/dashboard.service";

@Component({
    selector: '[app-cartable]',
    templateUrl: './cartable.component.html',
    styleUrls: ['./cartable.component.css']
})
export class CartableWidgetUI {
    // extends ContentService implements OnChanges{
    // tabID!: string;
    // tabLabel!: string;
    // elementRef!: ElementRef;
    // renderer2!: Renderer2;
    // mainService!: MainServices;
    // constructor(el: ElementRef, ren: Renderer2, mainService: MainServices, private dashboardService: DashboardService, cd: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver) {
    //     super()
    // }
}