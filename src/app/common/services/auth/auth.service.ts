import {Injectable} from "@angular/core";
import {CommonService} from "../request/common.service";
import {ObjectExtend} from "ng-zorro-antd";
import {CommonEnum} from "../../enum/common.enum";
import {SettingsService, MenuService, Menu} from "@delon/theme";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Md5} from "ts-md5/dist/md5";

/**
 * 用户登录与权限服务类
 */
@Injectable()
export class AuthService{
    constructor(private commonService:CommonService, private objectExtend:ObjectExtend,private settingService:SettingsService,private menuService:MenuService){}

    /**
     * 登录
     * @param val 登录参数
     * @param func 登录回调方法
     * @returns {OperatorFunction<T, R>} 返回登录成功信息
     */
    login(val:any,func:Function):any{
        const userInfo = this.settingService.user;
        if(this.objectExtend.size(userInfo) > 0){
            if(func){
                func();
            }
            return Observable.of({status:CommonEnum.SERVER_STATUS_DATE_KEY,data:userInfo,message:null});
        }
        return this.commonService.login(val).map(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                let userData = res[CommonEnum.SERVER_DATA_KEY];
                userData['userPwd'] = Md5.hashStr(val.userPwd);
                userData['lock'] = false;
                sessionStorage.setItem(CommonEnum.AUTH_SESSION_STORAGE_KEY.USER_INFO,JSON.stringify(userData));
                this.settingService.setUser(res[CommonEnum.SERVER_DATA_KEY]);
                this.commonService.loadMenuData().subscribe(menuRes=>{
                    if(menuRes && menuRes[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        let data = menuRes[CommonEnum.SERVER_DATA_KEY],
                            _trees = data['trees'],
                            _funcs = data['funcs'];

                        if(!this.objectExtend.isEmpty(_trees)){
                            let menuData = this.initMenu(_trees);
                            sessionStorage.setItem(CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.TREES, JSON.stringify(menuData));
                            this.menuService.clear();
                            this.menuService.add(menuData);
                        }
                        if(!this.objectExtend.isEmpty(_funcs)){
                            sessionStorage.setItem(CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.FUNCS, JSON.stringify(_funcs));
                        }
                        if(func){
                            func();
                        }
                    }
                });
            }
            return res;
        });
    }

    /**
     * 退出
     * @returns {OperatorFunction<T, R>} 返回退出信息
     */
    quit():any{
        return this.commonService.quit().map(res=>{
            this.settingService.setUser(null);
            let keys:Array<any> = [];
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == 200){
                for(let i=0,key = undefined; i<sessionStorage.length; i++){
                    key = sessionStorage.key(i);
                    if((key != CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.DOMAIN_CFG && key != CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.SYSTEM_CFG)){
                        keys.push(key);
                    }
                }
                keys.forEach((key)=>{
                    sessionStorage.removeItem(key);
                });
            }
            return res;
        });
    }

    private initMenu(menuData:any){
        let newMenuData:Array<any> = [];
        newMenuData.push({text:'',group:true,children:[]});
        menuData && menuData.forEach((item,index)=>{

            const menu = this.menuStructure(item,index, - 1);

            item['childrens'] && item['childrens'].forEach((subItem,subInd)=>{
                const subMenu = this.menuStructure(subItem,index, subInd);
                menu['children'].push(subMenu);
            });
            newMenuData[0]['children'].push(menu);
        });
        return newMenuData;
    }

    private menuStructure(data:any,index:number,subIndex:number){
        let menu = {
            text:data['name'],
            i18n:data['lang'],
            icon:data['iconClass'],
            link:data['path'],
            children:[],
            externalLink:data['externalLink'],
            target:data['target'],
            badge:data['badge'],
            badge_dot:data['badgeDot'],
            badge_status:data['badgeStatus']
        };
        if(subIndex == -1){
            menu['_open'] = index == 0;
            menu['shortcut'] = index == 0;
        }else{
            menu['_selected'] = index == 0 && subIndex == 0;
        }
        return menu;
    }
}
