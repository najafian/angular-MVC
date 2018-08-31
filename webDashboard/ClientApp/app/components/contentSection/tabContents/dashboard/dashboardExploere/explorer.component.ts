import {ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Inject, Renderer2} from "@angular/core";
import {ContentService} from "../../common/BaseTabContent";
import {MainServices} from "../../../../services/MainServices";
import {DashboardService} from "../dashboardViewer/dashboard.service";
import {HttpClient} from "@angular/common/http";
import {FetchDataValues as OpenDataValues} from "../gadgetAnalyser/manageData/FetchDataValues";
import {Guid} from "../../../../services/GUIDService";
import {ToolbarWidget} from "../../widgets/toolbar.widget";
import {TreeviewWidget} from "../../widgets/treeview.widget";
import {TileViewWidget} from "../../widgets/tileView.widget";
import Tile = ej.Tile;
import Caption = ej.Tile.Caption;
import {Observable, Observer} from "rxjs/index";

@Component({
    selector: '[app-explorer]',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.css']
})
export class ExplorerWidgetUI extends ContentService {
    protected elementRef: ElementRef;
    protected mainService: MainServices;
    protected renderer2: Renderer2;
    protected tabID: string = '';
    protected tabLabel: string = '';
    private toolbarHeaderID: string = '';
    private treeViewID: string = '';
    private tileViewID: string = '';
    private toolbarHeader: ToolbarWidget | undefined;
    private treeView: TreeviewWidget | undefined;
    private tileView: TileViewWidget | undefined;

    constructor(el: ElementRef, ren: Renderer2, mainService: MainServices, private dashboardService: DashboardService, cd: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        super();
        this.componentFactoryResolver = componentFactoryResolver;
        this.elementRef = el;
        this.renderer2 = ren;
        this.mainService = mainService;
        this.changeDetectorRef = cd;
        this.toolbarHeaderID = 'toolbar-' + Guid.newGuid();
        this.treeViewID = 'treeview-' + Guid.newGuid();
        this.tileViewID = 'tileview-' + Guid.newGuid();

    }

    ngAfterViewInit() {
        this.initToolBar();
        this.initTreeView();
        this.initTileView();
    }

    private initTileView(): any {
        // let sss:ej.Tile =new ej.Tile($(''),{imageUrl:'data:image/png;base64,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'})
        let tiles: any = [
            {
                cssClass: 'fdsd',
                imageClass: 'sdfsdf',
                imagePosition: ej.Tile.ImagePosition.Center,
                tileSize: ej.Tile.TileSize.Small,
                allowSelection: true,
                caption: {
                    text: "sddsds",
                    alignment: ej.Tile.CaptionAlignment.Center,
                    position: Tile.CaptionPosition.Outer,
                    icon: 'sdsdsd'
                }
                ,
                imageUrl: 'data:image/png;base64,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'
            },
            {
                cssClass: 'fdsd',
                imageClass: 'sdfsdf',
                imagePosition: ej.Tile.ImagePosition.Center,
                tileSize: ej.Tile.TileSize.Small,
                allowSelection: true,
                caption: {
                    text: "sdxc",
                    alignment: ej.Tile.CaptionAlignment.Center,
                    position: Tile.CaptionPosition.Outer
                },
                imageUrl: 'data:image/png;base64,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'
            },
        ];
        this.tileView = new TileViewWidget();
        this.tileView.init(this.tileViewID);
        this.tileView.setValues(tiles);
        this.tileView.createWidget();
    }

    private initTreeView() {
        this.treeView = new TreeviewWidget($('#' + this.treeViewID).get(0));
        this.treeView.setValues([
            {id: 1, name: "داشبورد تحلیلی ۹۵", cls: "uk-style", hasChild: true, expanded: true, class: 'qwerty'},
            {id: 2, pid: 1, imgId: "1", name: "مالی ۹۵", city: "London", phone: "555-5665-2323"},
            {id: 3, name: "گزارش مالی ۹۵", cls: "usa-style", hasChild: true, expanded: true},
            {id: 5, pid: 3, imgId: "2", name: "فروش", city: "Capital way", phone: "934-8374-2455"},
            {id: 4, pid: 3, imgId: "3", name: "انبار", city: "Dayton", phone: "988-4243-0806"}
        ]);
        this.treeView.width = 200;
        this.treeView.height = '100%';
        this.treeView.rightToLeft = true;
        this.treeView.setCallback();
       // this.selectTreeNode();
        this.treeView.createWidget();
    }

    private initToolBar() {
        this.toolbarHeader = new ToolbarWidget($('#' + this.toolbarHeaderID).get(0));
        this.toolbarHeader.setValues(ExplorerWidgetUI.getToolbarItems());
        this.toolbarHeader.createWidget();
    }

    static getToolbarItems(): any {
        let item1: ej.Toolbar.Items[] = [];
        item1.push({htmlAttributes: {'class': 'e-fileexplorer-toolbar-icon NewFolder', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-fileexplorer-toolbar-icon Upward', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-fileexplorer-toolbar-icon Rename', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-fileexplorer-toolbar-icon Cut', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-fileexplorer-toolbar-icon Copy', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-fileexplorer-toolbar-icon Refresh', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-icon e-save e-tooltxt', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-icon e-delete_01', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-icon e-pie-chart', 'id': 'itemId'}});
        item1.push({htmlAttributes: {'class': 'e-fileexplorer-toolbar-icon Details', 'id': 'itemId'}});
        return item1;
        // return [{
        //      edid: "1",
        //      spriteCss: "editTools cursor",
        //      title:"Cursor",
        //
        //  }, {
        //      edid: "2",
        //      spriteCss: "editTools select",
        //      title:"Select",
        //
        //  }, {
        //      edid: "3",
        //      spriteCss: "editTools move",
        //      title:"Move",
        //
        //  }, {
        //      edid: "4",
        //      spriteCss: "editTools rectselect",
        //      title:"Rectselect",
        //
        //  }, {
        //      edid: "5",
        //      spriteCss: "editTools roundselect",
        //      title:"Roundselect",
        //
        //  }, {
        //      edid: "6",
        //      spriteCss: "editTools brush",
        //      title:"Brush",
        //
        //  }, {
        //      edid: "7",
        //      spriteCss: "editTools pen",
        //      title:"Pen",
        //
        //  }, {
        //      edid: "8",
        //      spriteCss: "editTools gradient",
        //      title:"Gradient",
        //
        //  }, {
        //      edid: "9",
        //      spriteCss: "editTools crop",
        //      title:"Crop",
        //
        //  }, {
        //      edid: "10",
        //      spriteCss: "editTools symbols",
        //      title:"Symbols",
        //
        //  }
        //  ];
    }

    selectTreeNode(observer: Observable<any>) {
        observer.subscribe((e: any) => {
            alert(1);
        }, () => {
        }, () => {
        });
    }
}