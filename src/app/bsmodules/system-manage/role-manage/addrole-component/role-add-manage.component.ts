import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {DynamicStepsService} from "@delon/abc";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {RoleAddBaseinfoComponent} from "./role-add-baseinfo.component";
import {RoleAddFuncpermissionComponent} from "./role-add-funcpermission.component";
import {RoleAddMenuComponent} from "./role-add-rolemenupermission.component";
import {RoleManageSevice} from "../../../../common/services/request/system-manage/role-manage.sevice";


/**
 *角色新增
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'role-add-manage',
    templateUrl: 'role-add-manage.component.html',
    providers: [RoleManageSevice,DynamicStepsService]
})
export class RoleAddManageComponent implements AfterViewInit{


    constructor(public item: RoleManageSevice,
                public dynamicStepsService:DynamicStepsService,
                public i18n:I18NService,
                public menuService:MenuService,
                public router:Router) {}

    // ngAfterViewInit() {
    // }

    public current:number = 0;

    /**
     * 角色子模块设置
     * RoleAddBaseinfoComponent：基本信息
     * RoleAddMenuComponent：关联菜单
     * RoleAddFuncpermissionComponent：关联功能
     *
     * @type {[{title: (string | any); content: RoleAddBaseinfoComponent} , {title: (string | any); content: RoleAddMenuComponent} , {title: (string | any); content: RoleAddFuncpermissionComponent}]}
     */
    public steps:Array<any> = [{
        title:this.i18n.fanyi('RM.nzTitle.step1Title'),
        content:RoleAddBaseinfoComponent
    },{
        title:this.i18n.fanyi('RM.nzTitle.step2Title'),
        content:RoleAddMenuComponent
    },{
        title:this.i18n.fanyi('RM.nzTitle.step3Title'),
        content:RoleAddFuncpermissionComponent
    }];


    /**
     * step设置
     */
    ngAfterViewInit():void{
        setTimeout(()=>{
            let params =this.menuService.getUrlByMenu(this.router.url);
            let _params = params['params'];
            // console.log('_params::::::::',_params);
            if(_params && _params['step']){
                this.dynamicStepsService.goStep(_params['step']);

            }
        },0);
    }
}
