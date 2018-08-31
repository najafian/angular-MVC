import {BaseWidget} from "./base.widget";
import {ElementRef} from "@angular/core";

export class WindowWidget extends BaseWidget{
    private contentElement: any;
    widget: any;
    containerID: string='';
    createWidget(): void {
        
        let windowDialog=new ej.Dialog($(this.contentElement.nativeElement),{
            // target: '',
            create: (e:any)=>{},
            beforeClose: (e:any)=>{},
            close: (e:any)=>{
                windowDialog.destroy();
            },
            beforeOpen: (e:any)=>{},
            open: (e:any)=>{},
            drag: (e:any)=>{},
            dragStart: (e:any)=>{},
            dragStop: (e:any)=>{},
            resize: (e:any)=>{},
            resizeStart: (e:any)=>{},
            resizeStop: (e:any)=>{},
            minHeight: 140,
            minWidth: 240,
            enableModal:true
        });
        // window.open();
    }

    init(containerID: string): void {
        this.containerID=containerID;
    }
    getElementContainer(targetElement:ElementRef){
        this.contentElement=targetElement;
    }
    
}