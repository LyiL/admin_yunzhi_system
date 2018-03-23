import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {DynamicStepsService} from "@delon/abc";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {AddBaseinfoRolegroupManageComponent} from "./add-baseinfo-rolegroup-manage.component";
import {RoleGroupManageService} from "../../../../common/services/request/system-manage/role-group-manage.service";
import {AddRolegroupMenuComponent} from "./add-rolegroup-menu.component";
import {AddRolegroupFuncpermissionComponent} from "./add-rolegroup-funcpermission.component";





/**
 *角色组新增
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'add-rolegroup-manage',
    templateUrl: 'add-rolegroup-manage.component.html',
    providers: [RoleGroupManageService,DynamicStepsService]
})
export class AddRolegroupManageComponent implements AfterViewInit{


    constructor(public item: RoleGroupManageService,
                public dynamicStepsService:DynamicStepsService,
                public i18n:I18NService,
                public menuService:MenuService,
                public router:Router) {}

    // ngAfterViewInit() {
    // }



    /**
     * 角色子模块设置
     * AddBaseinfoRolegroupManageComponent：基本信息
     * RoleAddMenuComponent：关联菜单
     * AddRolegroupFuncpermissionComponent：关联功能
     *
     * @type {[{title: (string | any); content: RoleAddBaseinfoComponent} , {title: (string | any); content: RoleAddMenuComponent} , {title: (string | any); content: RoleAddFuncpermissionComponent}]}
     */
    public steps:Array<any> = [{
        title:this.i18n.fanyi('RM.nzTitle.step1Title'),
        content:AddBaseinfoRolegroupManageComponent
    },{
        title:this.i18n.fanyi('RM.nzTitle.step2Title'),
        content:AddRolegroupMenuComponent
    },{
        title:this.i18n.fanyi('RM.nzTitle.step3Title'),
        content:AddRolegroupFuncpermissionComponent
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
