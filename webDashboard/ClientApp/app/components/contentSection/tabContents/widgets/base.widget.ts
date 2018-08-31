import {Inject, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
import {Guid} from "../../../services/GUIDService";

export abstract class BaseWidget {
    public abstract widget: any;
    @Inject(DOCUMENT) public document: any;
    public rootEl: HTMLElement;
    public rootElID: string;
    private values: any;

    constructor() {
        this.rootEl = document.createElement('div');
        this.rootElID = this.getNewID();
        this.rootEl.setAttribute('id', this.rootElID);
    }

    public getValues(): any {
        return this.values;
    };

    public setValues(values: any): void {
        this.values = values;
    }

    public abstract createWidget(): void;
    public abstract init(containerID: string):void;
    public getNewID(): string {
        return 'widget-' + Guid.newGuid();
    }
}