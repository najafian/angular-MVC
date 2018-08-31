import {
    Component, OnInit, ElementRef, Renderer2,
    ChangeDetectorRef,
    ViewChild, ViewChildren, QueryList, ViewEncapsulation, ComponentFactoryResolver, Inject, ChangeDetectionStrategy,
    OnChanges,
} from "@angular/core";
import {MainServices} from "../../../../services/MainServices";
import {AfterViewInit} from "@angular/core/src/metadata/lifecycle_hooks";
import {TabType} from "../../../../services/widgetType";
//import {GridsterComponent, IGridsterDraggableOptions, IGridsterOptions} from "angular2gridster";
//import {GridStackComponent, GridStackItem, GridStackItemComponent, GridStackOptions} from "ng4-gridstack";
import {Guid} from "../../../../services/GUIDService";
import {ContentService} from "../../common/BaseTabContent";
import {TreeviewWidgetDirective} from "../../../../widgets/treeview.widget.directive";
import {BaseWidget} from "../../../../widgets/baseWidget/base.widget";
import {WidgetType} from "../../../../widgets/baseWidget/widget.type";
import {ChartWidget} from "../../widgets/chart.widget";
import {DOCUMENT} from "@angular/platform-browser";
import {MenuSliderWidget} from "../../widgets/menuSlider.widget";
import {GridsterConfig, GridsterItem, GridType, CompactType, DisplayGrid} from "angular-gridster2";
import {DashboardService} from "./dashboard.service";

@Component({
    selector: '[app-dashboardWidget]',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DashboardWidgetUI extends ContentService implements OnChanges {
    get dashboard(): Array<GridsterItem> {
        return this.dashboardService.dashboard;
    }

    ngOnChanges() {

    }

    options: GridsterConfig | undefined;
    tabID: string='';
    tabLabel: string='';
    elementRef!: ElementRef;
    renderer2!: Renderer2;
    mainService!: MainServices;
    private menuSlider: MenuSliderWidget | undefined;


    constructor(el: ElementRef, ren: Renderer2, mainService: MainServices, private dashboardService: DashboardService, cd: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver) {
        super()
        
        this.initGrid(dashboardService, componentFactoryResolver, el, ren, mainService, cd);
    }

    initGrid(dashboardService: DashboardService, componentFactoryResolver: ComponentFactoryResolver, el: ElementRef, ren: Renderer2, mainService: MainServices, cd: ChangeDetectorRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.elementRef = el;
        this.renderer2 = ren;
        this.mainService = mainService;
        this.changeDetectorRef = cd;
        this.options = {
            itemChangeCallback: (item: GridsterItem, itemComponent:any) => {
            },
            itemResizeCallback: (item: GridsterItem, itemComponent: any) => {
                item.chart.redraw();
            },
            itemRemovedCallback: (item: GridsterItem, itemComponent: any) => {
            },
            itemInitCallback: (item: GridsterItem, itemComponent: any) => {
            },
            initCallback: (itemComponent: any) => {
            },
            gridType: GridType.Fixed,
            compactType: CompactType.CompactUp,
            margin: 10,
            outerMargin: true,
            outerMarginTop: null,
            outerMarginRight: null,
            outerMarginBottom: null,
            outerMarginLeft: null,
            mobileBreakpoint: 640,
            minCols: 1,
            maxCols: 11,
            minRows: 1,
            maxRows: 100,
            maxItemCols: 10,
            minItemCols: 1,
            maxItemRows: 10,
            minItemRows: 1,
            maxItemArea: 2500,
            minItemArea: 1,
            defaultItemCols: 1,
            defaultItemRows: 1,
            fixedColWidth: 105,
            fixedRowHeight: 105,
            keepFixedHeightInMobile: false,
            keepFixedWidthInMobile: false,
            scrollSensitivity: 10,
            scrollSpeed: 20,
            enableEmptyCellClick: false,
            enableEmptyCellContextMenu: false,
            enableEmptyCellDrop: false,
            enableEmptyCellDrag: false,
            emptyCellDragMaxCols: 50,
            emptyCellDragMaxRows: 50,
            ignoreMarginInRow: false,
            draggable: {
                enabled: true,
            },
            resizable: {
                enabled: true,
            },
            swap: true,
            pushItems: true,
            disablePushOnDrag: false,
            disablePushOnResize: false,
            pushDirections: {north: true, east: true, south: false, west: false},
            pushResizeItems: false,
            displayGrid: DisplayGrid.OnDragAndResize,
            disableWindowResize: false,
            disableWarnings: false,
            scrollToNewItems: false,
        };
    }

    ngOnInit() {
        this.tabInit(this.renderer2, this.elementRef, this.mainService);
        this.createMenuSlider();
    }

    private createMenuSlider() {
        this.menuSlider = new MenuSliderWidget(this.elementRef.nativeElement, this.renderer2, this);
        this.changeDetectorRef.detectChanges();
    }

    changedOptions() {
        
        if (this.options!=undefined && this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    removeItem($event: any, item: any) {
        $event.preventDefault();
        $event.stopPropagation();
        this.dashboardService.dashboard.splice(this.dashboardService.dashboard.indexOf(item), 1);
    }

    addItem(dashboardID: string, widgetID: string, col: number, row: number, x: number, y: number) {
        this.dashboardService.dashboard.push({
            chart: new ChartWidget(),
            dashboardID: dashboardID,
            widgetID: widgetID,
            cols: col,
            rows: row,
            y: x,
            x: y,
            initCallback: (e: GridsterItem) => {
                // this.addDashboardEl(e.widget.dashboardID, e.widget.gadgetID);
                let elementID='element-'+Guid.newGuid();
                let element = $('.empty-grid-content').get(0);
                element.setAttribute('class', 'gadget-view');
                element.setAttribute('dashboardid', e.dashboardID);
                element.setAttribute('gadgetID', e.widgetID);
                element.setAttribute('id',elementID)
                e.chart.init(elementID);
                // this.changeDetectorRef.detectChanges();
                e.chart.createWidget();
                //e.widget.chart.redraw();
            }
        });
        this.changeDetectorRef.detectChanges();
    }

}