import {NgModule} from "@angular/core";
import {SharedModule} from "app/shared/shared.module";
import {RouterModule} from "@angular/router";
import {CENTER_MANAGE_ROUTING} from "./center-manage.routing";
import {acceptingInstitutionListComponent} from './accepting-institution/accepting-institution-list.component';
import {ExamstateWinComponent} from './accepting-institution/examstate-win.component';
import {mchNoCfgListComponent} from './accepting-institution/mchNo-cfg/mchNo-cfg-list.component';
import {acceptingInstitutionAddComponent} from './accepting-institution/accept-instiution-add.component';
import {mchNocfgAddComponent} from './accepting-institution/mchNo-cfg/mchNo-cfg-add.component';
import {settleAccountComponent} from './accepting-institution/settle-account.component';
import {serviceAccountComponent} from './accepting-institution/service-account.component';
import {payManageListComponent} from './accepting-institution/pay-manage/pay-manage-list.component';
import {payCfgAddComponent} from './accepting-institution/pay-manage/pay-cfg-add.component';
import {payCfgPlusComponent} from './accepting-institution/pay-manage/pay-cfg-plus.component';
import {categoryRefundWinComponent} from './accepting-institution/pay-manage/category-refund-win.component';
import {accountCfgListComponent} from './accepting-institution/account-cfg/account-cfg-list.component';
import {accountCfgWinComponent} from './accepting-institution/account-cfg/account-cfg-win.component';
import {syncMchWinComponent} from './accepting-institution/sync-mch-win.component';
import {safetyCertificateListComponent} from './safety-certificate/safety-certificate-list.component';
import {safetyCertificateAddWinComponent} from './safety-certificate/safety-certificate-add-win.component';
import {uploadWinComponent} from './safety-certificate/upload-win.component';

/**
 * create by hsz 2018-2-26
 * 中心管理模块
 */

@NgModule({
    declarations: [
        acceptingInstitutionListComponent,
        ExamstateWinComponent,
        mchNoCfgListComponent,
        acceptingInstitutionAddComponent,
        mchNocfgAddComponent,
        settleAccountComponent,
        serviceAccountComponent,
        payManageListComponent,
        payCfgAddComponent,
        payCfgPlusComponent,
        categoryRefundWinComponent,
        accountCfgListComponent,
        accountCfgWinComponent,
        syncMchWinComponent,
        safetyCertificateListComponent,
        safetyCertificateAddWinComponent,
        uploadWinComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(CENTER_MANAGE_ROUTING)
    ],
    entryComponents: [
        ExamstateWinComponent,
        categoryRefundWinComponent,
        accountCfgWinComponent,
        syncMchWinComponent,
        safetyCertificateAddWinComponent,
        uploadWinComponent
    ]
})
export class CenterManageModule { }

