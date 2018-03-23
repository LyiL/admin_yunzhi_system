import {Component, OnInit, ViewChild} from "@angular/core";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {SimpleTableComponent} from "@delon/abc";
import {MenuService, ModalHelper} from "@delon/theme";
import {StaffModel} from "../../../../common/model/system-manage/staff.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StaffService} from "../../../../common/services/request/system-manage/staff.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {Router} from "@angular/router";
import {I18NService} from "../../../../common/i18n/i18n.service";

/**
 * Created by cty on 2018/3/1.
 * 员工管理修改密码
 */

@Component({
    selector:'modify-pwd',
    templateUrl:'./modify-pwd.component.html',
    providers: [StaffService]
})

export class staffModifyPwdComponent implements OnInit{

    public model: StaffModel = new StaffModel();
    public staffModifyPwdFormGroup: FormGroup;

    public isLoad: boolean; // 加载中
    public _id: any;        // 接收路由传递的参数

    constructor(
        public fb: FormBuilder,
        public StaffDB: StaffService,
        public msg: NzMessageService,
        public modalSub: NzModalSubject,
        public menuService: MenuService,
        public router: Router,
        public i18n: I18NService
    ) {}

    ngOnInit() {
        this.staffModifyPwdFormGroup = this.fb.group({
            id: [this.model.id],
            userPwd: [this.model.userPwd, [Validators.required, Validators.minLength(6)]],                              // 重新设置密码
            userPwdc: [this.model.userPwdc, [Validators.required, Validators.minLength(6), this.confirmPswValidator]]   // 再次确认密码
        })
    }

    /**
     *  获取响应式表单项
     * @param name
     * @returns {AbstractControl}
     */
    getFormControl(name) {
        return this.staffModifyPwdFormGroup.controls[name];
    }


    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            // var req = /^[0-9]*$/;//整数
            var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }


    /**
     * 密码是否一致
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    confirmPswValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if(control.value && control.value.length < 6){
            return { minLength: true };
        }else if (control.value !== this.staffModifyPwdFormGroup.controls[ 'userPwd' ].value) {
            return { confirm: true, error: true };
        }
    };

    /**
     * 监听确认密码
     */
    updateConfirmValidator() {
        setTimeout(() => {
            this.staffModifyPwdFormGroup.controls['userPwdc'].updateValueAndValidity();
        }, 17);
    }


    /**
     * 保存
     * @param e
     */
    onSubmit(e: any) {
        this.isLoad = true;
        this.model['id'] = this._id;

        this.StaffDB.modifyPwd(this.model).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.modalSub.destroy('onOk');
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
        this.isLoad = false;
    }
}
