import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from "@angular/core";
import {WidgetType} from "./widget.type";
import {BaseWidget} from "./base.widget";

@Injectable()
export class WidgetService {
    private _allWidgets: { component: ComponentRef<any>, id: number, type: WidgetType }[]=[];

    get allWidgets(): { component: ComponentRef<any>; id: number; type: WidgetType }[] {
        return this._allWidgets;
    }

    set allWidgets(value: { component: ComponentRef<any>; id: number; type: WidgetType }[]) {
        this._allWidgets = value;
    }

    public addWidget(componentClass: Type<any>, componentFactoryResolver: ComponentFactoryResolver, container: ViewContainerRef, wtype: WidgetType): void {
        const componentFactory = componentFactoryResolver.resolveComponentFactory(componentClass);
        let componentRef= container.createComponent(componentFactory);
        this._allWidgets.push({component: componentRef, id: 1, type: wtype});
    }
}