import {Component, ElementRef, OnInit, ViewEncapsulation} from "@angular/core";
import {MainServices} from "../services/MainServices";
import {BodyComponent} from "../contentSection/body.component";
import {TabType} from "../services/widgetType";
import {WidgetType} from "../widgets/baseWidget/widget.type";


@Component({
    selector: 'sidebar-app',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    //  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
    ngOnInit(): void {
        this.mainServices.mainMenu = new ej.Menu($('#menuRTL'), {
            enableRTL: true,
            menuType: ej.MenuType.NormalMenu,
            orientation: ej.Orientation.Vertical
        });
    }

    constructor(private el: ElementRef, private mainServices: MainServices) {

    }

    itemClicked(item: number): void {
        switch (item) {
            case TabType.dashboardViewer:
                this.mainServices.createWidget(TabType.dashboardViewer);
                break;
            case TabType.dashboardDesigner:
                this.mainServices.createWidget(TabType.dashboardDesigner);
                break;
            case TabType.dashboardExplorer:
                this.mainServices.createWidget(TabType.dashboardExplorer);
                break;
            case TabType.formViewer:
                break;
            case TabType.workflowDesigner:
                this.mainServices.createWidget(TabType.workflowDesigner);
                break;

        }

    }
}