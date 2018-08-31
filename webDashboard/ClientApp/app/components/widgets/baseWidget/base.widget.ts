import {Component, ElementRef, OnInit, Renderer2} from "@angular/core";

// import {WidgetType} from "./widget.type";


@Component({
    selector: '[myBaseWidget]',
    template:'',
    styleUrls: ['./base.widget.css']
})
export class BaseWidget implements OnInit{
    ngOnInit(): void {
        this.renderer.setAttribute(this.elementRef.nativeElement,'id',this.elementID);
        console.log('baseWidget',this.elementID);
    }
    public data: any;
    public widget: any;
    public elementID:string='';



    constructor(private elementRef: ElementRef,private renderer:Renderer2) {

    }

}
