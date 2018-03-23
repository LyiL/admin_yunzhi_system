import {Component, OnInit} from "@angular/core";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../../common/services/request/common.service";
import {StaffModel} from "../../../../common/model/system-manage/staff.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StaffService} from "../../../../common/services/request/system-manage/staff.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {DynamicStepsService, ReuseTabService} from "@delon/abc";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";

/**
 * Created by cty on 2018/3/1.
 * 员工管理新增/编辑
 */

@Component({
    selector:'staff-manage-edit',
    templateUrl:'./staff-edit.component.html',
    providers: [CommonService, StaffService]
})
export class StaffEditComponent implements OnInit{

    public isLoad: boolean; // 加载中
    public flag: boolean;   // 编辑状态下，密码隐藏
    public params: any;

    public model: StaffModel = new StaffModel();
    public staffFormGroup: FormGroup;

    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected modalService: NzModalService,
                public fb: FormBuilder,
                public StaffDB: StaffService,
                public msg: NzMessageService,
                public dynamicStepsDB:DynamicStepsService,
                public menuService: MenuService,
                public router: Router,
                private reuseTabService: ReuseTabService
    ){}

    ngOnInit() {
        this.staffFormGroup = this.fb.group({
            userName: [this.model.userName, [Validators.required, this.numberAndLetter]],     // 用户名
            userPwd: [this.model.userPwd, [Validators.required, Validators.minLength(6)]],   // 密码
            realName: [this.model.realName, [Validators.required]],     // 员工姓名
            phone: [this.model.phone, [this.numberValidator]]           // 联系电话
        });

        this.flag = true;
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let _params = menu['params'];
            this.StaffDB.getDetail({id: _params['id']}).subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.model = res[CommonEnum.SERVER_DATA_KEY];
                    let _userName = this.model['userName'];
                    this.model['userName'] = _userName.substring(0, _userName.indexOf('@'));
                    this.flag = false;

                    // 如果是编辑的话，密码隐藏并且取消必填项
                    let pwdControl = this.staffFormGroup.controls['userPwd'];
                    pwdControl.clearValidators();
                    pwdControl.updateValueAndValidity();
                }
            })
        }
    }


    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            // var req = /^[0-9]*$/;//整数
            // var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            var req = /[0-9\-]+/;
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }

    /**
     * 定义数字和字母的校验器
     */
    numberAndLetter(control: FormControl): any{
        if(control.value){
            var req = /^[A-Za-z0-9]+$/; // 数字或字母
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }


    /**
     * 返回
     */
    onBack() {
        this.helper.navigate('/admin/system/stafflist', this.i18n.fanyi('staff.listPage.title'), null);
    }


    /**
     * 保存
     */
    onSubmit() {
        this.isLoad = true;

        this.StaffDB.addOrEdit(this.model).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.helper.navigate('/admin/system/stafflist', this.i18n.fanyi('staff.listPage.title'), null, true);
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoad = false;
        })
    }


    /**
     * 保存并分配角色
     */
    onSaveAndAllot() {
        this.isLoad = true;
        this.StaffDB.addOrEdit(this.model).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.params = res[CommonEnum.SERVER_DATA_KEY];
                this.StaffDB = Object['assign'](this.StaffDB, this.params);
                // this.dynamicStepsDB.nextStep(); // 跳转到角色分配
                this.dynamicStepsDB.goStep(1); // 跳转到角色分配
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoad = false;
        })
    }


    /**onChangeControl
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.staffFormGroup.controls[name];
    }

}
