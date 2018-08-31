import {BaseWidget} from "./base.widget";

export class ToolbarWidget extends BaseWidget {
    widget!: ej.Toolbar;

    createWidget(): void {
        let items: any = this.getValues();
        
        
        this.widget = new ej.Toolbar($(this.rootEl), {
            //  dataSource: items,
            // items: [
            //     { text: "Bold", type: 'Button', htmlAttributes: { 'class': 'custom_bold', 'id': 'itemId' } },
            //     { text: "Italic", htmlAttributes: { 'class': 'custom_italic' }  },
            //     { text: "Underline", htmlAttributes: { 'class': 'custom_underline' } },
            //     { type: "Separator" },
            //     { text: "Uppercase", cssClass: "e-txt-casing" }
            // ]
            // fields: { spriteCssClass: "spriteCss", tooltipText:"title" },
            width: "100%",
            // height:3,
            // cssClass: "gradient-lime",
            enableSeparator: true,
            Items: items,
            enableRTL:true,
            
            isResponsive: true,
            orientation: ej.Orientation.Horizontal,
            showRoundedCorner: true
        });
        // $("#edittoolsh").ejToolbar({
        //     dataSource: items,
        //     fields: { id: "edid", spriteCssClass: "spriteCss", tooltipText:"title" },
        //     orientation: "horizontal",
        //     width: "100%"
        // });
    }

    constructor(private containerElement: HTMLElement) {
        super();
        this.rootEl.setAttribute("style","border-bottom:3px solid;padding:0;border-radius:6px;height: 30px;display: flex;width: 100%;")
        containerElement.appendChild(this.rootEl);
        
    }

    init(containerID: string): void {
    }

}