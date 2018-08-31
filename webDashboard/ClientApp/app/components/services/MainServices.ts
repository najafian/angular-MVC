import {ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef, Injectable} from "@angular/core";
import {TabType} from "./widgetType";
import {WidgetType} from "../widgets/baseWidget/widget.type";
import {BaseWidget} from "../widgets/baseWidget/base.widget";
import {DashboardWidgetUI} from "../contentSection/tabContents/dashboard/dashboardViewer/dashboard.component";
import {Subject} from "rxjs/index";

@Injectable()
export class MainServices {
    public mainTab: ej.Tab | undefined;
    public mainMenu: ej.Menu | undefined;
    public themeMenu: ej.Menu | undefined;
    public lastDigitShow: number = 0;
    public allComponents: { component: ComponentRef<any>, id: number, type: string }[] | undefined;
    private lastComponent: ComponentRef<any> | undefined;
    private addComponentObserveable = new Subject();
    private tabComponents: { component: any, type: any }[] = [];

    public addComponent(componentClass: Type<any>, componentFactoryResolver: ComponentFactoryResolver, container: ViewContainerRef, tabtype: TabType): void {
        let tempType: number = TabType.dashboardViewer;
        // if (this.tabComponents.map(function (x: any) {
        //         return x.type;
        //     }).indexOf(0) == -1){
        for (let i = 0; i < this.tabComponents.length; i++) {
            if (this.tabComponents[i].type === tabtype && tabtype === 0) {
                return;
            }
        }
        const componentFactory = componentFactoryResolver.resolveComponentFactory(componentClass);
        this.lastComponent = container.createComponent(componentFactory);

        this.tabComponents.push({component: this.lastComponent, type: tabtype});
    }


    public removeTabItem(): void {

    }

    public addTabAndSaveComponent(tabID: string, type: TabType, label: string): void {
        if (this.mainTab != undefined) {
            this.mainTab.addItem("#" + tabID, label, this.mainTab.getItemsCount(), "padding2px", tabID);
            this.mainTab.showItem(this.mainTab.getItemsCount() - 1);
            this.lastDigitShow++;
        }
    }

    // private removeComponent(componentClass: Type<any>,container: ViewContainerRef) {
    //      // Find the component
    //      const component = this.components.find((component) => {
    //          return component.instance instanceof componentClass;
    //      });
    //      const componentIndex = this.components.indexOf(component);
    //
    //      if (componentIndex !== -1) {
    //          // Remove component from both view and array
    //          container.remove(container.indexOf(component));
    //          this.components.splice(componentIndex, 1);
    //      }
    //  }
    public getLastDigit(): string {
        return (this.lastDigitShow).toString();
    }

    public createWidget(type: TabType): void {
        this.addComponentObserveable.next(type);
    }

    public getWidgetOservable(): Subject<any> {
        return this.addComponentObserveable;
    }

    public onDestroy() {
        this.addComponentObserveable.unsubscribe();
    }

    private _allWidgets: { component: ComponentRef<any>, id: number, type: WidgetType }[] = [];

    get allWidgets(): { component: ComponentRef<any>; id: number; type: WidgetType }[] {
        return this._allWidgets;
    }

    set allWidgets(value: { component: ComponentRef<any>; id: number; type: WidgetType }[]) {
        this._allWidgets = value;
    }

    public addWidget(componentClass: Type<any>, componentFactoryResolver: ComponentFactoryResolver, container: ViewContainerRef, wtype: WidgetType, id: string): void {
        const componentFactory = componentFactoryResolver.resolveComponentFactory(componentClass);
        let componentRef = container.createComponent(componentFactory);
        (<BaseWidget>componentRef.instance).elementID = id;
        this._allWidgets.push({component: componentRef, id: 1, type: wtype});
    }
}