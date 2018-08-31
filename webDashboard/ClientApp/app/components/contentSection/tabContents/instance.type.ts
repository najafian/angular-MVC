import { Type } from '@angular/core';

export class InstanceType {
    constructor(public component: Type<any>, public data: any) {}
}