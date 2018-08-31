import { Directive, ViewContainerRef, ElementRef, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
    selector: '[adHost]',
})
export class TabContentDirective implements OnInit {
    ngOnInit(): void {
        
    }
    constructor(public viewContainerRef: ViewContainerRef) {

    }
}