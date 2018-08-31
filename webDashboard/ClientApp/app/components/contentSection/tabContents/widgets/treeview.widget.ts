import {BaseWidget} from "./base.widget";
import CreateEventArgs = ej.TreeView.CreateEventArgs;
import NodeExpandEventArgs = ej.TreeView.NodeExpandEventArgs;
import NodeCollapseEventArgs = ej.TreeView.NodeCollapseEventArgs;
import BeforeExpandEventArgs = ej.TreeView.BeforeExpandEventArgs;
import BeforeCollapseEventArgs = ej.TreeView.BeforeCollapseEventArgs;
import NodeSelectEventArgs = ej.TreeView.NodeSelectEventArgs;
import NodeCheckEventArgs = ej.TreeView.NodeCheckEventArgs;
import NodeUncheckEventArgs = ej.TreeView.NodeUncheckEventArgs;
import NodeDragStartEventArgs = ej.TreeView.NodeDragStartEventArgs;
import NodeDragEventArgs = ej.TreeView.NodeDragEventArgs;
import NodeDragStopEventArgs = ej.TreeView.NodeDragStopEventArgs;
import NodeDroppedEventArgs = ej.TreeView.NodeDroppedEventArgs;
import BeforeEditEventArgs = ej.TreeView.BeforeEditEventArgs;
import NodeEditEventArgs = ej.TreeView.NodeEditEventArgs;
import ReadyEventArgs = ej.TreeView.ReadyEventArgs;
import {DashboardWidgetUI} from "../dashboard/dashboardViewer/dashboard.component";
import {Observable} from "rxjs/index";
import UnderlineSettings = ej.PdfViewer.UnderlineSettings;

export class TreeviewWidget extends BaseWidget {
    public promise:any ;

    get height(): string {
        return this._height;
    }

    set height(value: string) {
        this._height = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get rightToLeft(): boolean {
        return this._rightToLeft;
    }

    set rightToLeft(value: boolean) {
        this._rightToLeft = value;
    }

    get allowEditing(): boolean {
        return this._allowEditing;
    }

    set allowEditing(value: boolean) {
        this._allowEditing = value;
    }

    get showCheckBox(): boolean {
        return this._showCheckBox;
    }

    set showCheckBox(value: boolean) {
        this._showCheckBox = value;
    }

    get allowDropSibling(): boolean {
        return this._allowDropSibling;
    }

    set allowDropSibling(value: boolean) {
        this._allowDropSibling = value;
    }

    get allowDropChild(): boolean {
        return this._allowDropChild;
    }

    set allowDropChild(value: boolean) {
        this._allowDropChild = value;
    }

    private componentUI: any | undefined;
    private _allowDragAndDrop: boolean = false;
    private _allowDropChild: boolean = false;
    private _allowDropSibling: boolean = false;
    private _showCheckBox: boolean = false;
    private _allowEditing: boolean = false;
    private _rightToLeft: boolean = false;
    private _width: number = 0;
    private _height: string = '0';

    get allowDragAndDrop(): boolean {
        return this._allowDragAndDrop;
    }

    set allowDragAndDrop(value: boolean) {
        this._allowDragAndDrop = value;
    }

    init(containerID: string): void {
    }

    widget: ej.TreeView | undefined;

    getSelectNodeCallback(): Observable<any> {
        if (this.promise != undefined)
            return this.promise;
        return new Observable<any>();
    }

    createWidget(): void {
        this.widget = new ej.TreeView($('#' + this.rootElID), {
            loadOnDemand: true,
            width: this.width,
            height: this.height,
            fields: {dataSource: this.getValues(), id: "id", parentId: "pid", text: "name", hasChild: "hasChild"},
            allowDragAndDrop: this.allowDragAndDrop,
            allowDropChild: this.allowDropChild,
            allowDropSibling: this.allowDropSibling,
            showCheckbox: this.showCheckBox,
            allowEditing: this.allowEditing,
            enableRTL: this.rightToLeft,
            create: (e: CreateEventArgs) => {
                console.log(e)
            },
            nodeExpand: (e: NodeExpandEventArgs) => {
                console.log(e)
            },
            nodeCollapse: (e: NodeCollapseEventArgs) => {
                console.log(e)
            },
            beforeExpand: (e: BeforeExpandEventArgs) => {
                console.log(e)
            },
            beforeCollapse: (e: BeforeCollapseEventArgs) => {
                console.log(e)
            },
            nodeSelect: (e: NodeSelectEventArgs) => {
                console.log(e);
               this.promise =Observable.create(this.promise);
            },
            nodeCheck: (e: NodeCheckEventArgs) => {
                console.log(e)
            },
            nodeUncheck: (e: NodeUncheckEventArgs) => {
                console.log(e)
            },
            nodeDragStart: (e: NodeDragStartEventArgs) => {
                console.log(e)
            },
            nodeDrag: (e: NodeDragEventArgs) => {
                console.log(e)
            },
            nodeDragStop: (e: NodeDragStopEventArgs) => {
                console.log(e)
            },
            nodeDropped: (e: NodeDroppedEventArgs) => {
                console.log(e);
                if (this.componentUI != undefined && this.componentUI instanceof DashboardWidgetUI)
                    this.componentUI.addItem('qw', 'wq', 4, 3, 4, 4);
                // var id= e.droppedElementData.id;
            },
            beforeEdit: (e: BeforeEditEventArgs) => {
                console.log(e)
            },
            nodeEdit: (e: NodeEditEventArgs) => {
                console.log(e)
            },
            ready: (e: ReadyEventArgs) => {
                console.log(e)
            }
        })
    }

    constructor(private containerElement: HTMLElement) {
        super();
        containerElement.appendChild(this.rootEl);
    }

    addComponentUI(dashboardUI: any) {
        this.componentUI = dashboardUI;
    }

    setCallback() {

    }
}