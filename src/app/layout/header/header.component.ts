import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import {Router} from "@angular/router";
import {CommonEnum} from "../../common/enum/common.enum";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    searchToggleStatus: boolean;

    constructor(public settings: SettingsService, private router:Router) { }

    toggleCollapsedSideabar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

    onLockHandler(){
        // this.settings.app['backUrl'] = this.router.url;
        sessionStorage.setItem(CommonEnum.LOCK_URL,this.router.url);
    }

}
