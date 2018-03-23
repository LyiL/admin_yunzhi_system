import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {AppAdminModel} from "../../../common/model/system-manage/application-manage/application-admin.model";
import {AppManageService} from "../../../common/services/request/system-manage/application-manage.service";
import {Router} from "@angular/router";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../common/enum/common.enum";

/**
 * 添加管理员账号弹窗
 * Created by lyl on 2018/3/1
 */
@Component({
    selector:'application-admin-add-win',
    templateUrl:'./application-admin-add-win.component.html',
    providers:[AppManageService]
})
export class AppAdminAddWinComponent implements OnInit{
    public appId: string;   //接收应用id的值
    public isLoading:boolean = false;//按钮加载效果
    public isDisabled:boolean = false; //用于接收判断用户名是否禁用的值
    public appAdminForm:FormGroup;
    public model:AppAdminModel = new AppAdminModel();

    constructor(
        protected appManageService:AppManageService,
        protected fb:FormBuilder,
        public subject: NzModalSubject,
        public msg: NzMessageService,
        protected router: Router,
        protected i18n:I18NService,
    ){

    }

    ngOnInit(){
        this.model.userPwd = null;//编辑进来时用户密码数据不用显示在页面上
        /**
         * 响应式表单设置
         * @type {FormGroup}
         */
        this.appAdminForm = this.fb.group({
            realName: [this.model.realName, [Validators.required]],//真实姓名
            userName: [this.model.userName, [Validators.required]],//用户名
            userPwd:[this.model.userPwd,[Validators.required, Validators.minLength(6)]],//用户密码
            confirmPass:[this.model.confirmPass,[Validators.required, Validators.minLength(6), this.confirmPswValidator]] //密码确认
        })

        /**
         * 先查询是否已存在管理员信息，若查到则userName（用户名）和 realName（真实姓名）为只读
         */
        // this.appManageService.findAdmin({appId: this.appId}).subscribe(res => {
        //     if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY && res[CommonEnum.SERVER_DATA_KEY]){
        //         this.model = res[CommonEnum.SERVER_DATA_KEY];
        //         this.isDisabled = true;
        //     }
        // })

    }

    /**
     * 保存
     */
    public onSave(){
        this.isLoading = true;
        this.model.appId = this.appId;
        //根据是否有id判断是新增还是编辑
        let adminSubscribe = this.model.id ? this.appManageService.updateAdmin(this.model) : this.appManageService.addAdmin(this.model);
        adminSubscribe.subscribe(res => {
            this.isLoading = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.subject.destroy('onOk');
            }else{
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    public getFormControl(name) {
        return this.appAdminForm.controls[name];
    }

    /**
     * 确认密码的校验器
     */
    confirmPswValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if(control.value && control.value.length < 6){
            return { minLength: true };
        }else if (control.value !== this.appAdminForm.controls[ 'userPwd' ].value) {
            return { confirm: true, error: true };
        }
    };
    /**
     * 监听确认密码
     */
    updateConfirmValidator() {
        setTimeout(_ => {
            this.appAdminForm.controls['confirmPass'].updateValueAndValidity();
        });
    }

}

