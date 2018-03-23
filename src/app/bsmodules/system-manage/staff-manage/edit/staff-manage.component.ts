import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {DynamicStepsService} from "@delon/abc";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {StaffService} from "../../../../common/services/request/system-manage/staff.service";
import {AllotRoleComponent} from "./allot-role.component";
import {StaffEditComponent} from "./staff-edit.component";


/**
 *  新增/编辑员工
 */
@Component({
    selector: 'staff-manage',
    templateUrl: 'staff-manage.component.html',
    providers: [StaffService]
})
export class StaffManageEditComponent implements OnInit{


    constructor(public staffDB: StaffService,
                public i18n:I18NService,
                public dynamicStepsDB:DynamicStepsService,
                public menuService:MenuService,
                public router:Router) {}


    /**
     * 新增员工子组件配置
     * StaffEditComponent：基本信息
     * AllotRoleComponent：分配角色
     */
    public steps:Array<any> = [{
        title:this.i18n.fanyi('staff.allotRole.baseInfo'),
        content:StaffEditComponent
    },{
        title:this.i18n.fanyi('staff.allotRole.allotrole'),
        content:AllotRoleComponent
    }];


    /**
     * step设置
     */
    ngOnInit():void{
        setTimeout(()=>{
            let params =this.menuService.getUrlByMenu(this.router.url);
            let _params = params['params'];
            if(_params && _params['step']){
                this.dynamicStepsDB.goStep(_params['step']);
            }
        },0);
    }

}
