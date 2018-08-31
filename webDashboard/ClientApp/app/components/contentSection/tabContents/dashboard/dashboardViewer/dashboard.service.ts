import { Injectable } from '@angular/core';
import { DashboardWidgetUI } from './dashboard.component';
import { InstanceType } from '../../instance.type';
//import { GridStackItemComponent } from "ng4-gridstack";
import { GridsterItem } from 'angular-gridster2';

@Injectable()
export class DashboardService {

    //private dashbords: { tabID: string, dashboardItems: GridStackItemComponent };
    public dashboard: Array<GridsterItem>=[];

    constructor() {
      
        //this.dashboard = [
        //    { widget: { dashboardID: 1, gadgetID: 2, chart: '' }, cols: 2, rows: 1, y: 0, x: 0 },
        //    { widget: { dashboardID: 1, gadgetID: 3, chart: '' }, cols: 2, rows: 2, y: 0, x: 2 }
        //];
    }
    getDashboards() {
        return [
            new InstanceType(DashboardWidgetUI, { name: 'Bombasto', bio: 'Brave as they come' })
            //new AdItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),

            //new AdItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),

            //new AdItem(HeroJobAdComponent,   {headline: 'Hiring for several positions',
            //    body: 'Submit your resume today!'}),

            //new AdItem(HeroJobAdComponent,   {headline: 'Openings in all departments',
            //    body: 'Apply today'}),
        ];
    }

}