import {NgModule} from "@angular/core";
import {BaseWidget} from "./baseWidget/base.widget";
import {TreeviewWidgetDirective} from "./treeview.widget.directive";

@NgModule({
    declarations: [BaseWidget,TreeviewWidgetDirective],
    imports: [],
    exports: [BaseWidget,TreeviewWidgetDirective]
})
export class WidgetModule {
}