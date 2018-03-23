import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {MARKETING_MANAGE_ROUTING} from "./marketing-manage.routing";
import {WxPublicAuthListComponent} from './wx-public-auth/wx-public-auth-list.component';
import {WxBusinessAuthListComponent} from './wx-business-auth/wx-business-auth-list.component';
import {WxPublicAuthDetailComponent} from './wx-public-auth/detail/wx-public-auth-detail.component';
import {WxBusinessAuthAddComponent} from './wx-business-auth/wx-business-auth-add.component';
import {WxDevPlatformListComponent} from "./wx-developer-platform/wx-developer-platform-list.component";
import {WxDevPlatformEditComponent} from "./wx-developer-platform/wx-developer-platform-edit.component";
import {WxPublicAuthUploadWinComponent} from './wx-public-auth/upload/wx-public-auth-upload-win.component';

/**
 * 营销管理模块
 */

@NgModule({
    declarations: [
        WxPublicAuthListComponent,
        WxPublicAuthDetailComponent,
        WxPublicAuthUploadWinComponent,
        WxBusinessAuthListComponent,
        WxBusinessAuthAddComponent,
        WxDevPlatformListComponent,
        WxDevPlatformEditComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(MARKETING_MANAGE_ROUTING)
    ],
    entryComponents: [
        WxPublicAuthUploadWinComponent
    ]
})
export class MarketingManageModule { }

