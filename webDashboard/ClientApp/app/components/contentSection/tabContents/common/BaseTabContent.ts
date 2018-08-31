import {
    ChangeDetectorRef, ComponentFactoryResolver, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2,
    SimpleChanges
} from "@angular/core";
import {AfterViewInit} from "@angular/core/src/metadata/lifecycle_hooks";
import {TabType} from "../../../services/widgetType";
import {MainServices} from "../../../services/MainServices";
import {Guid} from "../../../services/GUIDService";

export abstract class ContentService implements OnInit,OnChanges,AfterViewInit,OnDestroy{
    protected abstract tabID: string='';
    protected abstract tabLabel: string='';
    protected abstract elementRef: ElementRef;
    protected abstract renderer2: Renderer2;
    protected abstract mainService: MainServices;
    protected componentFactoryResolver!: ComponentFactoryResolver;
    protected changeDetectorRef!: ChangeDetectorRef;
    protected constructor(){}
    ngOnDestroy(): void {
    }
    ngOnInit(): void {
        this.tabInit(this.renderer2,this.elementRef,this.mainService);
    }

    protected tabInit(renderer: Renderer2,elementRef: ElementRef,mainService: MainServices) {
        this.tabID = "tabPanel" + mainService.getLastDigit();
        this.tabLabel = " داشبورد " + mainService.getLastDigit();
        renderer.setAttribute(elementRef.nativeElement, "tabID", this.tabID);
        renderer.setAttribute(elementRef.nativeElement, "id", this.tabID);
        renderer.setAttribute(elementRef.nativeElement, "class", 'e-content');
        renderer.setStyle(elementRef.nativeElement, "height", "calc(100% - 30px)");
        //renderer.setStyle(elementRef.nativeElement, "padding", "0px");

        this.mainService.addTabAndSaveComponent(this.tabID, TabType.dashboardViewer, this.tabLabel);
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngAfterViewInit(): void {
    }

    static getNewID():string{
        return 'container-'+Guid.newGuid();
    }
   
}