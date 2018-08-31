import {Renderer2} from "@angular/core";
import {BaseWidget} from "./base.widget";
import {TreeviewWidget} from "./treeview.widget";
import {DashboardWidgetUI} from "../dashboard/dashboardViewer/dashboard.component";


export class MenuSliderWidget extends BaseWidget {
    init(containerID: string): void {
    }

    widget: ej.NavigationDrawer | undefined;
    public treeview: TreeviewWidget | undefined;
    private treeviewElement: HTMLElement | undefined;
    public sliderID: string = this.getNewID();
    public settingBtnID: string = this.getNewID();
    public isMenuSlideOpen: boolean = false;


    createWidget(): void {
        if (this.treeviewElement != undefined) {
            this.treeview = new TreeviewWidget(this.treeviewElement);
            this.treeview.setValues([
                {id: 1, name: "داشبورد تحلیلی ۹۵", cls: "uk-style", hasChild: true, expanded: true},
                {id: 2, pid: 1, imgId: "1", name: "مالی ۹۵", city: "London", phone: "555-5665-2323"},
                {id: 3, name: "گزارش مالی ۹۵", cls: "usa-style", hasChild: true, expanded: true},
                {id: 5, pid: 3, imgId: "2", name: "فروش", city: "Capital way", phone: "934-8374-2455"},
                {id: 4, pid: 3, imgId: "3", name: "انبار", city: "Dayton", phone: "988-4243-0806"}
            ]);
            this.treeview.allowDragAndDrop=true;
            this.treeview.width=200;
            
            this.treeview.addComponentUI(this.dashboardUI);
            this.treeview.createWidget();
        }

        this.widget = new ej.NavigationDrawer($('#' + this.sliderID), {
            targetId: this.settingBtnID,
            contentId: 'tabPanel1',
            // type: "overlay",
            width: 200,
            direction: ej.Direction.Left,
            enableListView: true,
            listViewSettings: {width: 200, selectedItemIndex: 0, mouseUp: "headChange", persistSelection: true},
            position: "normal",
            open: (args) => {
                console.log('open:'+args);
                this.isMenuSlideOpen = true;
                this.renderer.setStyle(this.rootEl, 'display', 'flex');
            },
            beforeClose: (args) => {
                console.log('close:'+args);
            },

        });


    }

    constructor(private containerElement: HTMLElement, private renderer: Renderer2, private dashboardUI: DashboardWidgetUI) {
        super();
        renderer.appendChild(this.rootEl, this.createSettingContainer());
        renderer.appendChild(this.rootEl, this.createEmpty());
        renderer.appendChild(this.containerElement, this.createSettingBtn());
        this.renderer.setAttribute(this.rootEl, 'style', 'z-index:1;border:1px double;position:absolute;left:10px;top:0px;display:none;width:250px');
        this.renderer.setAttribute(this.rootEl, 'class', 'menusliderDashboard');
        renderer.appendChild(containerElement, this.rootEl);
        this.createWidget();

    }

    private createEmpty(): HTMLElement {
        let root = document.createElement('div');
        // this.renderer.setAttribute(root, 'class', 'e-icon e-settings');
        //  this.renderer.setAttribute(root, 'tabID', this.settingBtnID);
        this.renderer.setAttribute(root, 'style', 'width:1px;height:1px;position:relative;');
        return root;
    }

    private createSettingBtn(): HTMLElement {
        let root = document.createElement('div');
        this.renderer.setAttribute(root, 'class', 'e-icon e-settings');
        this.renderer.setAttribute(root, 'id', this.settingBtnID);
        this.renderer.setAttribute(root, 'style', 'font-size:25px;width:35px;height:25px;position:absolute;top:-32px;left:0px;');
        root.addEventListener('click', () => {
            if (this.isMenuSlideOpen) {
                this.isMenuSlideOpen = false;

                setTimeout(() => {
                    if (this.widget!=undefined) 
                    this.widget.close();
                    this.renderer.setStyle(this.rootEl, 'display', 'none');
                }, 10);
            }
        });
        return root;
    }

    private createSettingContainer(): HTMLElement {
        let root = document.createElement('div');
        this.treeviewElement = document.createElement('div');
        this.renderer.appendChild(root, this.treeviewElement);
        this.renderer.setAttribute(root, 'id', this.sliderID);
        this.renderer.setAttribute(root, 'style', 'left:200px;position:relative;width:200px;');
        this.renderer.setAttribute(root, 'class', 'menusliderDashboard');
        return root;
    }

}