import {BaseWidget} from "./base.widget";
import {Guid} from "../../../services/GUIDService";
import Caption = ej.Tile.Caption;

export class TileViewWidget extends BaseWidget {
    widget!: ej.Tile[];
    private readonly widgetID:string;
    private readonly widgetEl:HTMLElement;

    constructor(){
        super();
        this.widgetID ='tileWidget-'+ Guid.newGuid();
        this.widgetEl = document.createElement('div');
        this.widgetEl.setAttribute('id', this.widgetID);
        this.widgetEl.setAttribute('style', 'height:100%;width:100%;');
    }
    
    createWidget(): void {
        let values: any = this.getValues();
        for (let i = 0; values.length > i; i++) {
            let tileElement:HTMLElement=this.createDiv();
            let tileView=new ej.Tile($(tileElement),values[i]);
            tileElement.setAttribute("data-ej-text","gadget");
        }
    }

    private createDiv():HTMLElement{
        let tileElement = document.createElement('div');
       
        tileElement.setAttribute('style', 'height:40px;width:100px;');
        this.widgetEl.appendChild(tileElement);
        return tileElement;
    }
    init(containerID: string): void {
       $('#'+containerID).append(this.widgetEl);
    }

}