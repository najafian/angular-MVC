import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EJAngular2Module } from 'ej-angular2';

import { AppComponent } from './components/initializer/app.component';
import {HeaderModule} from "./components/header/header.module";
import {MaincontentModule} from "./components/contentSection/maincontent.module";
import {SidebarModule} from "./components/control-sidbar/sidebar.module";
import {MainServices} from "./components/services/MainServices";
import { DashboardService } from './components/contentSection/tabContents/dashboard/dashboardViewer/dashboard.service';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        HeaderModule,
        MaincontentModule,
        SidebarModule,
        // RouterModule.forRoot([
        //     { path: '', redirectTo: 'home', pathMatch: 'full' },
        //     { path: '**', redirectTo: 'home' }
        // ]),
    ],
    exports: [],
    providers: [MainServices, DashboardService],
    bootstrap: [AppComponent]
})
export class AppModuleShared {

}
