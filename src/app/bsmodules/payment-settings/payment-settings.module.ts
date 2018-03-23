import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {PAYMENT_SETTINGS_ROUTES} from "./payment-settings.routes";
import {AreaCodeConfigListComponent} from './area-code-config/area-code-config-list.component';
import {PaymentChannelListComponent} from './payment-channel/payment-channel-list.component';
import {JDMchTypeListComponent} from './jd-mch-type/jd-mch-type-list.component';
import {QQMchTypeListComponent} from './qq-mch-type/qq-mch-type-list.component';
import {MchTypeListComponent} from './mch-type/mch-type-list.component';
import {PaymentInterfaceListComponent} from './payment-interface/payment-interface-list.component';
import {BankConfigListComponent} from './bank-config/bank-config-list.component';
import {IpWhiteListComponent} from "./ip-white-list/ip-white-list.component";
import {InterfaceConfigComponent} from "./interfacec-config/interface-config.component";
import {BankNumManagerListComponent} from "./bank-num-manager/bank-num-manager-list.component";
import {AddBankNumManageComponent} from "./bank-num-manager/add-bank-num-manage/add-bank-num-manage.component";
import {AreaCodeConfigWinComponent} from './area-code-config/area-code-config-win.component';
import {PaymentChannelWinComponent} from './payment-channel/payment-channel-win.component';
import {JDMchTypeWinComponent} from './jd-mch-type/jd-mch-type-win.component';
import {QQMchTypeWinComponent} from './qq-mch-type/qq-mch-type-win.component';
import {MchTypeWinComponent} from './mch-type/mch-type-win.component';
import {PaymentInterfaceWinComponent} from './payment-interface/payment-interface-win.component';
import {BankConfigWinComponent} from './bank-config/bank-config-win.component';
import {AddIpWhiteListComponent} from "./ip-white-list/add-white-list/add-ip-white-list.component";
import {AddInterfaceConfigComponent} from "./interfacec-config/add-interface-config/add-interface-config.component";


/**
 * 支付设置模块
 */
@NgModule({
    imports:[
        SharedModule,
        RouterModule.forChild(PAYMENT_SETTINGS_ROUTES)
    ],
    declarations:[
        AreaCodeConfigListComponent,
		AreaCodeConfigWinComponent,
        PaymentChannelListComponent,
		PaymentChannelWinComponent,
        JDMchTypeListComponent,
		JDMchTypeWinComponent,
        QQMchTypeListComponent,
		QQMchTypeWinComponent,
        MchTypeListComponent,
		MchTypeWinComponent,
        PaymentInterfaceListComponent,
		PaymentInterfaceWinComponent,
        BankConfigListComponent,
		BankConfigWinComponent,
        IpWhiteListComponent,
        InterfaceConfigComponent,
        BankNumManagerListComponent,
        AddBankNumManageComponent,
        AddIpWhiteListComponent,
        AddInterfaceConfigComponent

    ],
    entryComponents: [
        AddBankNumManageComponent,
		AreaCodeConfigWinComponent,
        PaymentChannelWinComponent,
        JDMchTypeWinComponent,
        QQMchTypeWinComponent,
        MchTypeWinComponent,
        PaymentInterfaceWinComponent,
        BankConfigWinComponent,
        AddIpWhiteListComponent,
        AddInterfaceConfigComponent
    ]
})
export class PaymentSettingsModule{

}
