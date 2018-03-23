import {Injectable, Injector} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {MenuService, SettingsService, TitleService} from "@delon/theme";
import {ACLService} from "@delon/acl";
import {I18NService} from "../i18n/i18n.service";
import {CommonService} from "./request/common.service";
import {CommonEnum} from "../enum/common.enum";
import {GlobalMonitorService} from "./global.monitor.service";

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private commonService: CommonService,
        private menuService: MenuService,
        private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private globalMonitor:GlobalMonitorService,
        private titleService: TitleService,
        private injector: Injector) { }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            this.commonService.loadDomainCfg(location.hostname)
                           .subscribe((res: any) => {
                               this.commonService.loadSysCfg().subscribe((cfgRes)=>{
                                   if(cfgRes && cfgRes[CommonEnum.SERVER_STATUS_KEY] == 200){
                                       const sysCfg = cfgRes[CommonEnum.SERVER_DATA_KEY];
                                       if(sysCfg){
                                           sessionStorage.setItem(CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.SYSTEM_CFG,JSON.stringify(sysCfg));
                                       }
                                   }
                               });
                               if(res && res[CommonEnum.SERVER_STATUS_KEY] == 200){
                                   // 应用信息：包括站点名、描述、年份
                                       let data = res[CommonEnum.SERVER_DATA_KEY];
                                           data['name'] = data['TITLE'];
                                       this.settingService.setApp(data);
                               }

                               // 用户信息：包括姓名、头像、邮箱地址
                               let userInfo:any = sessionStorage.getItem(CommonEnum.AUTH_SESSION_STORAGE_KEY.USER_INFO);
                               if(userInfo){
                                   userInfo = JSON.parse(userInfo || 'null') || null;
                                   this.settingService.setUser(userInfo);
                               }
                               let menuData:any = sessionStorage.getItem(CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.TREES);
                               if(menuData){
                                   menuData = JSON.parse(menuData || 'null') || null;
                                   if(menuData != null){
                                       this.menuService.clear();
                                       this.menuService.add(menuData);
                                   }
                               }
                               //  // ACL：设置权限为全量
                               //  this.aclService.setFull(true);
                               //  // 初始化菜单
                               //  this.menuService.add(res.menu);
                                // i18n：设置默认语言
                                this.i18n.use(this.settingService.layout.lang);
                                // 设置页面标题的后缀
                                this.titleService.suffix = this.settingService.app.name;

                                resolve(res);
                            }, (err: HttpErrorResponse) => {
                               reject(null);
                            });
        });
    }
}
