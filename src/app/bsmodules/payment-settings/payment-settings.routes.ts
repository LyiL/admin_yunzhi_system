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
import {AddInterfaceConfigComponent} from "./interfacec-config/add-interface-config/add-interface-config.component";

/**
 * 支付设置路由
 * @type {Array}
 */
export const PAYMENT_SETTINGS_ROUTES = [
    {path:'areacodeconfig',component:AreaCodeConfigListComponent}, // 地区码配置
    {path:'paymentchannel',component:PaymentChannelListComponent}, // 支付渠道
    {path:'jdmerchanttype',component:JDMchTypeListComponent}, // 京东商户类型
    {path:'qqmerchanttype',component:QQMchTypeListComponent}, // QQ商户类型
    {path:'merchanttype',component:MchTypeListComponent}, // 商户类型
    {path:'paymentinterface',component:PaymentInterfaceListComponent}, // 支付接口
    {path:'bankconfig',component:BankConfigListComponent}, // 银行配置
    {path:'ipwhitelist',component:IpWhiteListComponent},           //ip白名单模块
    {path:'interfacecfglist',component:InterfaceConfigComponent},  //接口配置模块
    {path:'banknumlist',component:BankNumManagerListComponent},     //联行号管理模块
    {path:'additerfaceconfig',component:AddInterfaceConfigComponent},     //新增接口配置模块

];


