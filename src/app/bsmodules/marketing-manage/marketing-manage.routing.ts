import {WxPublicAuthListComponent} from './wx-public-auth/wx-public-auth-list.component';
import {WxBusinessAuthListComponent} from './wx-business-auth/wx-business-auth-list.component';
import {WxPublicAuthDetailComponent} from './wx-public-auth/detail/wx-public-auth-detail.component';
import {WxBusinessAuthAddComponent} from './wx-business-auth/wx-business-auth-add.component';
import {WxDevPlatformListComponent} from "./wx-developer-platform/wx-developer-platform-list.component";
import {WxDevPlatformEditComponent} from "./wx-developer-platform/wx-developer-platform-edit.component";

/**
 * 营销管理路由配置
 */

export const MARKETING_MANAGE_ROUTING = [
    {path: 'wxopenplatform',component: WxDevPlatformListComponent}, // 微信开发者平台
    {path: 'addwxopenplatform',component: WxDevPlatformEditComponent}, // 新增|编辑微信开发者平台
    {path:'wxmpauth', component:WxPublicAuthListComponent}, // 公众号授权
    {path:'wxmpauthdetail', component:WxPublicAuthDetailComponent}, // 公众号授权详情
    {path:'wxbsauth', component:WxBusinessAuthListComponent}, // 微信业务授权
    {path:'addbsauth', component:WxBusinessAuthAddComponent} // 微信业务授权新增或编辑
];
