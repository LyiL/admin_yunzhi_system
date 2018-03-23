import {CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {HelperService} from "./helper.service";
import {SettingsService, MenuService} from "@delon/theme";
import {Injectable} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd";
import {I18NService} from "../i18n/i18n.service";
/**
 * 路由拦截器服务
 */
@Injectable()
export class RouterInterceptService implements CanActivate, CanActivateChild{

    constructor(private helper:HelperService,private setting:SettingsService,private menuService:MenuService,private msg:NzMessageService,private i18n:I18NService){}

    /**
     * 父级路由拦截器
     * @param route
     * @param state
     * @returns {undefined}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if(this.setting.user == null){
            return false;
        }
        if(this.setting.user && this.setting.user['lock'] && this.setting.user['lock']  === true){
            return false;
        }
        return true;
    }

    /**
     * 子级路由拦截器
     * @param childRoute
     * @param state
     * @returns {undefined}
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if(this.setting.user == null){
            return false;
        }
        if(this.setting.user && this.setting.user['lock'] && this.setting.user['lock']  === true){
            return false;
        }
        if(!this.checkRouterAuth(state)){
            this.msg.warning(this.i18n.fanyi("default.hint.noAuthFuncs"));
            return false;
        }

        return true;
    }

    /**
     * 交验路由地址
     * @param state
     */
    private checkRouterAuth(state: RouterStateSnapshot){
        const _funcsData:Array<any> = this.helper.funcsData();
        let _url:string = state.url;
        let flag:boolean = false;
        //先检查菜单路由是否存在
        let menu = this.menuService.getUrlByMenu(_url);
        if(menu && menu._depth <= 2){
            flag = true;
        }

        //在检查按钮路由是否存在
        for(let key in _funcsData){
            if(_funcsData[key] != '-' && _funcsData[key] == _url){
                flag = true;
            }
        }

        return flag;
    }

}
