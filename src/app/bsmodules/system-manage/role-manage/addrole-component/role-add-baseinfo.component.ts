import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {DynamicStepsService, ReuseTabService} from "@delon/abc";
import {NzMessageService} from "ng-zorro-antd";
import {RoleManageSevice} from "../../../../common/services/request/system-manage/role-manage.sevice";
import {addRoleBaseForm} from "../../../../common/model/system-manage/role-manage/role-add.model";



/**
 * 新增角色基本信息
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'role-add-step1',
    templateUrl: 'role-add-baseinfo.component.html',
    providers: [RoleManageSevice]
})
export class RoleAddBaseinfoComponent {
    // [x: string]: any;
    public model:addRoleBaseForm = new addRoleBaseForm();  //实列addRoleBaseForm
    public roleAdd: FormGroup;   //表单名
    public params:any;   //接受保存基本成功后台返回值
    public isLoading = false;  //按钮载入状态样式
    public _isLoading = false;  //按钮载入状态样式
    /**
     * 角色组数据定义
     */
    public parentIdsDate:Array<string>= [];



    constructor(public fb: FormBuilder,
                public helper:HelperService,
                public rolemanaeSev:RoleManageSevice,
                protected menuService:MenuService,
                public router:Router,
                public i18n:I18NService,
                public dynamicStepsService:DynamicStepsService,
                public _msg: NzMessageService,
                private reuseTabService:ReuseTabService
    ){


    }


    ngOnInit() {
        this.roleAdd = this.fb.group({
            roleName: [this.model.roleName, [Validators.required]],
            description: [this.model.description, [Validators.required]],
            parentIds: [this.model.parentIds, [Validators.required]],
        });
        this.roleAdd.patchValue(this.rolemanaeSev);

        /**
         * 加载角色组数据
         */

        this.rolemanaeSev.loadGetExtends().subscribe(res =>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.parentIdsDate = res[CommonEnum.SERVER_DATA_KEY];
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })

        /**
         * 是否编辑状态,加载页面基本信息
         */
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu&&menu['params']['id']){
            let id = menu['params']['id'];
            this.rolemanaeSev.loadRoleInfo(id).subscribe((res)=>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.model = res[CommonEnum.SERVER_DATA_KEY];
                }else {
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            });
        }


    }

    /**
     * 保存并下一步
     */
    onNextSetp(){
        this.isLoading=true;
        this.rolemanaeSev.saveRoleInfo(this.model).subscribe(res=>{
            this.isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.params=res[CommonEnum.SERVER_DATA_KEY] ;
                this.rolemanaeSev = Object['assign'](this.rolemanaeSev,this.params);
                // ++this.rolemanaeSev.step;
                // this.dynamicStepsService.nextStep();
                this.dynamicStepsService.nextStep();//下一步

            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 保存
     */
    onSubmit() {
        this._isLoading=true;
        this.rolemanaeSev.saveRoleInfo(this.model).subscribe(res=>{
            this._isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this._msg.success(this.i18n.fanyi('RM.listPage.alert.opsuc'));
                this.helper.navigate('/admin/system/rolemanagelist',this.i18n.fanyi('RM.listPage.html.title'),{},true);
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 返回
     */
    back():void{
        this.helper.navigate('/admin/system/rolemanagelist',this.i18n.fanyi('RM.listPage.html.title'),{},true);
    }



    /**
     * 表单验证获取别名
     * @param name
     * @returns {AbstractControl}
     */
    getFormControl(name) {
        return this.roleAdd.controls[ name ];
    }
}
