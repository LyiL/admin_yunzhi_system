
import {acceptingInstitutionListComponent} from './accepting-institution/accepting-institution-list.component';
import {mchNoCfgListComponent} from './accepting-institution/mchNo-cfg/mchNo-cfg-list.component';
import {acceptingInstitutionAddComponent} from './accepting-institution/accept-instiution-add.component';
import {mchNocfgAddComponent} from './accepting-institution/mchNo-cfg/mchNo-cfg-add.component';
import {serviceAccountComponent} from './accepting-institution/service-account.component';
import {settleAccountComponent} from './accepting-institution/settle-account.component';
import {payCfgAddComponent} from './accepting-institution/pay-manage/pay-cfg-add.component';
import {payManageListComponent} from './accepting-institution/pay-manage/pay-manage-list.component';
import {payCfgPlusComponent} from './accepting-institution/pay-manage/pay-cfg-plus.component';
import {accountCfgListComponent} from './accepting-institution/account-cfg/account-cfg-list.component';
import {safetyCertificateListComponent} from './safety-certificate/safety-certificate-list.component';

/**
 * create by hsz 2018-2-26
 * 中心管理路由配置
 */
export const CENTER_MANAGE_ROUTING = [
        {path:'acceptinstitution',component:acceptingInstitutionListComponent}, //受理机构列表
        {path:'mchNoCfg',component:mchNoCfgListComponent},//商户号管理列表
        { path:'acceptinsadd', component:acceptingInstitutionAddComponent},//新增受理机构
        {path:'mchNocfgAdd', component:mchNocfgAddComponent},//新增或编辑商户号
        {path:'serviceAccount', component:serviceAccountComponent},//设置服务费账户
         {path:'settleAccount', component:settleAccountComponent},//设置结算账户
        {path:'payManage', component:payManageListComponent},//支付管理列表
        {path:'payCfgAdd', component:payCfgAddComponent},//新增或编辑支付中心
        {path:'payCfgPlus', component:payCfgPlusComponent},//新增或编辑支付类型
        {path:'balanceACCount', component:accountCfgListComponent},//对账管理列表
        {path:'securitycertificate', component:safetyCertificateListComponent},//安全证书列表
];
