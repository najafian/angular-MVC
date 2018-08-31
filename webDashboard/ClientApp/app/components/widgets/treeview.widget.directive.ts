import {Directive, ViewContainerRef, ElementRef, OnInit, AfterViewInit} from '@angular/core';
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


@Directive({
    selector: '[DtTreeView]',
})
export class TreeviewWidgetDirective implements OnInit, AfterViewInit {
    private _treeviewObject!: ej.TreeView;
    private _data: any;
    public ElementID: string='';


    ngAfterViewInit(): void {
        setTimeout(() => {
            this.create();
        }, 100);
    }

    set data(value: any) {
        this._data = value;
    }

    get treeviewObject(): ej.TreeView {
        return this._treeviewObject;
    }

    create() {
        this._data = [
            {id: 1, name: "UK", cls: "uk-style", hasChild: true, expanded: true},
            {id: 2, pid: 1, imgId: "1", name: "Steven John", city: "London", phone: "555-5665-2323"},
            {id: 3, name: "USA", cls: "usa-style", hasChild: true, expanded: true},
            {id: 5, pid: 3, imgId: "2", name: "Andrew", city: "Capital way", phone: "934-8374-2455"},
            {id: 4, pid: 3, imgId: "3", name: "Angelica", city: "Dayton", phone: "988-4243-0806"}
        ];

        this._treeviewObject = new ej.TreeView($('#' + this.ElementID), {
            enableRTL: true,
            loadOnDemand: true,
            width: 200,
            fields: {dataSource: this._data, id: "id", parentId: "pid", text: "name", hasChild: "hasChild"},
            allowDragAndDrop: true,
            allowDropChild: true,
            allowDropSibling: true,
            showCheckbox: true,
            allowEditing: true,
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
                console.log(e)
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
                console.log(e)
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


    ngOnInit(): void {
        console.log('directive', this.ElementID);

    }

    constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) {

    }
}