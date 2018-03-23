import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {ModifyLoginPswModel} from "../../../../common/model/modify-login-psw.model";
import {CommonService} from "../../../../common/services/request/common.service";
import {Router} from "@angular/router";
import {I18NService} from "../../../../common/i18n/i18n.service";

/**
 * 修改登录密码弹窗
 */
@Component({
    selector:'modify-login-psw-win',
    templateUrl:'./modify-login-psw-win.component.html',
    providers:[CommonService]
})
export class ModifyLoginPswWinComponent implements OnInit{
    public isLoading:boolean = false;
    public modifyLoginPswForm:FormGroup;
    public modifyLoginPswModel:ModifyLoginPswModel = new ModifyLoginPswModel();

    constructor(
        protected commonService:CommonService,
        protected fb:FormBuilder,
        public _modal: NzModalSubject,
        public _msg: NzMessageService,
        protected router: Router,
        protected i18n:I18NService,
    ){}

    ngOnInit(){
        /**
         * 响应式表单设置
         * @type {FormGroup}
         */
        this.modifyLoginPswForm = this.fb.group({
            userPwd:[this.modifyLoginPswModel.userPwd,[Validators.required]],
            newPassword:[this.modifyLoginPswModel.newPassword,[Validators.required, Validators.minLength(6)]],
            newpwd2:[this.modifyLoginPswModel.newpwd2,[Validators.required, Validators.minLength(6), this.confirmPswValidator]]
        })
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoading = true;
        this.commonService.modifyPsw(this.modifyLoginPswModel).subscribe(res => {
            this.isLoading = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.router.navigate(['/login']);
                this._modal.destroy('onOk');
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    public getFormControl(name) {
        return this.modifyLoginPswForm.controls[name];
    }

    /**
     * 确认密码的校验器
     */
    confirmPswValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if(control.value && control.value.length < 6){
            return { minLength: true };
        }else if (control.value !== this.modifyLoginPswForm.controls[ 'newPassword' ].value) {
            return { confirm: true, error: true };
        }
    };

    updateConfirmValidator() {
        setTimeout(_ => {
            this.modifyLoginPswForm.controls['newpwd2'].updateValueAndValidity();
        });
    }

}

