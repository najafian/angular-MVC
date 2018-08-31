import {Component, OnInit} from "@angular/core";

import {MainServices} from "../services/MainServices";
import {ThemeType, ThemHRef} from "./themeType";

@Component({
    selector: 'header-app',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public changeThemes(themeName: string) {
        let href: string = '';
        switch (themeName) {
            case ThemeType.flatazure:
                href = ThemHRef.flatazure;
                break;
            case ThemeType.flatazuredark:
                href = ThemHRef.flatazuredark;
                break;
            case ThemeType.flatlime:
                href = ThemHRef.flatlime;

                break;
            case ThemeType.flatlimedark:
                href = ThemHRef.flatlimedark;

                break;
            case ThemeType.flatsaffron:
                href = ThemHRef.flatsaffron;

                break;
            case ThemeType.flatsaffrondark:
                href = ThemHRef.flatsaffrondark;

                break;
            case ThemeType.gradientazure:
                href = ThemHRef.gradientazure;

                break;
            case ThemeType.gradientazuredark:
                href = ThemHRef.gradientazuredark;

                break;
            case ThemeType.gradientlime:
                href = ThemHRef.gradientlime;

                break;
            case ThemeType.gradientlimedark:
                href = ThemHRef.gradientlimedark;

                break;
            case ThemeType.gradientsaffron:
                href = ThemHRef.gradientsaffron;

                break;
            case ThemeType.gradientsaffrondark:
                href = ThemHRef.gradientsaffrondark;

                break;
            case ThemeType.flatbootstrap:
                href = ThemHRef.flatbootstrap;
                break;
            case ThemeType.highcontrast01:
                href = ThemHRef.highcontrast01;

                break;
            case ThemeType.highcontrast02:
                href = ThemHRef.highcontrast02;

                break;
            case ThemeType.material:
                href = ThemHRef.material;

                break;
            case ThemeType.office365:
                href = ThemHRef.office365;
                break;
        }
        if (href.length > 0)
            $('#themePageStyle').attr('href', href);

    }

    ngOnInit(): void {
        var that = this;
        this.themeMenu.themeMenu = new ej.Menu($('#themeChangerID'), {
            enableRTL: true,
            menuType: ej.MenuType.NormalMenu,
            orientation: ej.Orientation.Horizontal,
            click: function (args: ej.Menu.ClickEventArgs) {
                that.changeThemes(args.element.id);
            }
        });
        $('#themeChangerID').find('.aschild').remove();
    }


    constructor(private themeMenu: MainServices) {

    }
}