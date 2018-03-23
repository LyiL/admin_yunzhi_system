import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {DynamicStepsService, ReuseTabService, SearchWindowConfig} from "@delon/abc";
import {NzMessageService} from "ng-zorro-antd";
import {RoleGroupManageService} from "../../../../common/services/request/system-manage/role-group-manage.service";
import {AddBaseRolegroupModel} from "../../../../common/model/system-manage/rolegoup-manage/add-base-rolegroup.model";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {CommonService} from "../../../../common/services/request/common.service";


/**
 * 新增角色组基本信息
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'add-baseinfo-rolegroup-manage',
    templateUrl: './add-baseinfo-rolegroup-manage.component.html',
    providers: [RoleGroupManageService]
})
export class AddBaseinfoRolegroupManageComponent {

    public model:AddBaseRolegroupModel = new AddBaseRolegroupModel();   //实例AddBaseRolegroupModel
    public addRoleGorupForm: FormGroup;   //表单命名
    public params:any;   //接受保存基本成功后台返回值
    public isLoading = false;  //按钮载入状态样式
    public _isLoading = false;  //按钮载入状态样式
    public isdisabled=false;    //是否允许编辑


    constructor(public fb: FormBuilder,
                public helper:HelperService,
                public roleGroupManageService:RoleGroupManageService,
                protected menuService:MenuService,
                public router:Router,
                public i18n:I18NService,
                public dynamicStepsService:DynamicStepsService,
                public _msg: NzMessageService,
                private reuseTabService:ReuseTabService
    ){

    }


    /**
     * 所属机构控件配置
     */
    public bankNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.title'),
        // url:CommonService.ORGNO_URL,
        url:RoleGroupManageService.BANKNO_URL,
        // params:{},
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.orgNo')
        },{
            field:'orgName',
            label:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.name'),
            index:'orgName'
        }]
    };

    /**
     * 设置所属机构控件配置参数
     * @param data
     */
    appIdChange(data:any){
        this.bankNoCfg.params = {appId:this.model.appId};
    }

    ngOnInit() {
        this.addRoleGorupForm = this.fb.group({
            roleName: [this.model.roleName, [Validators.required]],
            rolecode: [this.model.rolecode, [Validators.required,this.numberValidator]],
            appId: [this.model.appId, [Validators.required]],
            orgNo: [this.model.orgNo],
            description: [this.model.description, [Validators.required]],
        });



        /**
         * 是否编辑状态,加载页面基本信息
         */
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu&&menu['params']['isEedit']){
            this.model=menu['params'];
            this.isdisabled=true;
            // let id = menu['params']['id'];
            // this.roleGroupManageService.loadRoleInfo(id).subscribe((res)=>{
            //     if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
            //         this.model = res[CommonEnum.SERVER_DATA_KEY];
            //     }else {
            //         this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            //     }
            // });
        }


    }

    /**
     * 保存并下一步
     */
    onNextSetp(){
        this.isLoading=true;
        this.model.parentIds='0';
        this.roleGroupManageService.saveRoleInfo(this.model).subscribe(res=>{
            this.isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.params=res[CommonEnum.SERVER_DATA_KEY] ;
                this.roleGroupManageService = Object['assign'](this.roleGroupManageService,this.params);
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
        this.model.parentIds='0';
        this._isLoading=true;
        this.roleGroupManageService.saveRoleInfo(this.model).subscribe(res=>{
            this._isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this._msg.success(this.i18n.fanyi('roleGroup.listPage.alert.opsuc'));
                this.helper.navigate('/admin/system/rolegrouplist',this.i18n.fanyi('roleGroup.listPage.html.title'),{},true);
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 返回
     */
    back():void{
        this.helper.navigate('/admin/system/rolegrouplist',this.i18n.fanyi('roleGroup.listPage.html.title'),{},true);
    }



    /**
     * 表单验证获取别名
     * @param name
     * @returns {AbstractControl}
     */
    getFormControl(name) {
        return this.addRoleGorupForm.controls[ name ];
    }

    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            // var req = /^[0-9]*$/;//整数
            var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            // this.log.debug("数字校验结果是：" + valid);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }
}
