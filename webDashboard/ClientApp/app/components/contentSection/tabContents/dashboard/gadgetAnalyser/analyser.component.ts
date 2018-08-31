import {ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Inject, Renderer2} from "@angular/core";
import {ContentService} from "../../common/BaseTabContent";
import {MainServices} from "../../../../services/MainServices";
import {DashboardService} from "../dashboardViewer/dashboard.service";
import {PivotclientWidget} from "../../widgets/pivotclient.widget";
import {Guid} from "../../../../services/GUIDService";
import {WindowWidget} from "../../widgets/window.widget";
import {FetchDataValues as OpenDataValues} from "./manageData/FetchDataValues";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: '[app-analyser]',
    templateUrl: './analyser.component.html',
    styleUrls: ['./analyser.component.css']
})
export class AnalyserWidgetUI extends ContentService {
    tabID: string = '';
    tabLabel: string = '';
    public wt_ID: number = 0;
    public record_ID: number = 0;
    readonly elementRef: ElementRef;
    readonly renderer2: Renderer2;
    readonly mainService: MainServices;
    readonly toolbarEvents: string;
    private pivot: PivotclientWidget | undefined;
    private readonly dataManipulator: OpenDataValues;


    constructor(el: ElementRef, ren: Renderer2, mainService: MainServices, private dashboardService: DashboardService, cd: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        super();
        this.componentFactoryResolver = componentFactoryResolver;
        this.elementRef = el;
        this.renderer2 = ren;
        this.mainService = mainService;
        this.changeDetectorRef = cd;
        this.toolbarEvents = 'menu-' + Guid.newGuid();
        this.dataManipulator = new OpenDataValues(http, baseUrl);
    }

    ngOnInit() {
        this.tabInit(this.renderer2, this.elementRef, this.mainService);
        // let elementID = 'element-' + Guid.newGuid();
        this.renderer2.setAttribute(this.elementRef.nativeElement, 'id', this.tabID);
        this.renderer2.setStyle(this.elementRef.nativeElement, 'direction', 'ltr');
        this.pivot = new PivotclientWidget(this.tabID);
       // this.pivot.init(this.tabID);
    }

    ngAfterViewInit() {
        if (this.pivot != undefined)
            this.createMenu(this.pivot);
    }

    private createMenu(pivot: PivotclientWidget): void {
        let windowElementContainer = document.createElement('div');
        let windowContainer = new ElementRef(windowElementContainer);

        new ej.Toolbar($('#' + this.toolbarEvents), {
            orientation: ej.Orientation.Horizontal,
            create: (e: any) => {
            },
            click: (e: any) => {
                // let myWindow = new WindowWidget();
                // myWindow.getElementContainer(windowContainer);
                // myWindow.init(this.tabID);
                if (e.text.indexOf('new') == 0) {
                    this.dataManipulator.fetchData().subscribe(function (result) {
                        pivot.setValues(result);
                        pivot.createWidget();
                    }, error => console.log(error));
                    windowElementContainer.innerText = "new";
                  //  myWindow.createWidget();
                } else if (e.text.indexOf('open') == 0) {
                    windowElementContainer.innerText = "open";
                  //  myWindow.createWidget();
                } else if (e.text.indexOf('save') == 0) {
                    windowElementContainer.innerText = "save";
                  //  myWindow.createWidget();
                    if (pivot.widget.model.dataSource != undefined) {
                        pivot.DataSourceColumn = pivot.widget.model.dataSource.columns;
                        pivot.DataSourceRow = pivot.widget.model.dataSource.rows;
                        pivot.DataSourceValue = pivot.widget.model.dataSource.values;
                        pivot.DataSourceFilter = pivot.widget.model.dataSource.filters;
                    }
                } else if (e.text.indexOf('remove') == 0) {

                }

            },
            itemHover: (e: any) => {

            },
            itemLeave: (e: any) => {
            },
        });

    }

}
