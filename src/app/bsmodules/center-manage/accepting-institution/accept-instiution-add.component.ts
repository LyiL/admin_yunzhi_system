import {Component, OnInit} from '@angular/core';
import {CommonEnum} from '../../../common/enum/common.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {acceptInsAddModel} from '../../../common/model/center-manage/accept-ins-add.model';
import {Observable} from 'rxjs/Observable';
import {NzMessageService} from 'ng-zorro-antd';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {AcceptingInstitutionListDbService} from '../../../common/services/request/center-manage/accepting-institution.service';
import {MenuService} from '@delon/theme';
import {Router} from '@angular/router';
/**
 * create by hsz 2018-2-26
 * 新增或编辑受理机构页面
 */
@Component({
    selector:'accept-instiution-add',
    templateUrl:'./accept-instiution-add.component.html',
    providers:[CommonEnum,AcceptingInstitutionListDbService]
})
export class acceptingInstitutionAddComponent implements OnInit {
    public ruleType: Observable<any>;//手续费计算类型
    public settleCycle: Observable<any>;//结算周期
    public model:acceptInsAddModel = new acceptInsAddModel();
    public modelGroup: FormGroup;
    public isLoadingOne = false; // loading

        constructor(public i18n:I18NService,public helper:HelperService,public menuService:MenuService,public router:Router,
                    public msg: NzMessageService,public AccInsDb:AcceptingInstitutionListDbService){

        }
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'organName': new FormControl(this.model.organName,[Validators.required]),
            'bankShortName': new FormControl(this.model.bankShortName, [Validators.required]),
            'preEnName': new FormControl(this.model.preEnName, [Validators.required]),
            'ruleType': new FormControl(this.model.ruleType, [Validators.required]),
            'techRate': new FormControl(this.model.techRate, [Validators.required,this.numberValidator]),
            'expCls': new FormControl(this.model.expCls),
            'contName': new FormControl(this.model.contName, [Validators.required]),
            'expOutCls': new FormControl(this.model.expOutCls),
            'phone': new FormControl(this.model.phone, [Validators.required,this.fixPhoneValidator]),
            'cashSyncSrv': new FormControl(this.model.cashSyncSrv),
            'email': new FormControl(this.model.email, [Validators.required,Validators.email]),
            'settleCycle': new FormControl(this.model.settleCycle),
            'expPubCls': new FormControl(this.model.expPubCls),
            'expPriCls': new FormControl(this.model.expPriCls),
            'address': new FormControl(this.model.address, [Validators.required]),
            'remark': new FormControl(this.model.remark, [])
        });
        this.ruleType = Observable.of(this.helper.getDictByKey('PAYMENT_RATE_TYPE'));//手续费计算类型
        this.settleCycle = Observable.of(this.helper.getDictByKey('BALANCE_DATE'));//
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){ // 判断路由是否有传参
            let params = menu['params'];
            this.model['orgId'] =params['orgId'];
            if(params['orgId']){//编辑进来查询单条数据赋值给model
                this.AccInsDb.acceptInsById({orgId:params['orgId']}).subscribe(res =>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                    }
                })
            }
        }
    }
    _submitForm() {
        this.isLoadingOne = true;
        if(this.modelGroup.valid){
            let _orgId = this.model.orgId ? this.AccInsDb.acceptInsUpdate(this.model) : this.AccInsDb.acceptInsAdd(this.model);
            _orgId.subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.helper.navigate('/admin/center/acceptinstitution', this.i18n.fanyi('CenterManger.title'), {},true);
                }else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
                this.isLoadingOne = false;
            })
        }
    }

    /**
     * 取消
     */
    onGoBack(){
        this.helper.navigate('/admin/center/acceptinstitution', this.i18n.fanyi('CenterManger.title'), {});
    }


    getFormControl(name) {
        return this.modelGroup.controls[ name ];
    }
    /**
     * 电话的校验器
     * 验证规则：区号+号码，区号以0开头，3位或4位,号码由7位或8位数字组成,如：000-88888888 、0000-7777777
     * 区号与号码之间可以无连接符，也可以“-”连接
     */
    fixPhoneValidator(control: FormControl){
        if(control.value){
            // var req = /^0\d{2,3}-?\d{7,8}$/;//验证规则：区号+号码，区号以0开头，3位或4位,号码由7位或8位数字组成,如：000-88888888 、0000-7777777
            var req = /^\d{3,4}-?\d{7,8}$/;//验证规则：区号+号码，3位或4位,号码由7位或8位数字组成,如：000-88888888 、0000-7777777
            // var req = /^\d{3}-\d{8}|\d{4}-\d{7}$/;//区号-本地号，如：000-88888888 、0000-7777777
            let valid = req.test(control.value);
            if(!valid){
                return {fixPhoneError:true,error:true};
            }
        }
    }

    /**
     * 邮箱的校验器
     * “第一部分@第二部分”
     * 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
     * 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
     */
    emailValidator(control: FormControl){
        if(control.value){
            var req = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            let valid = req.test(control.value);
            if(!valid){
                return {emailError:true,error:true};
            }
        }
    }
    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        // var req = /^[0-9]*$/;//整数
        var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
        let valid = req.test(control.value);
        if(!valid){
            return {numberError:true,error:true};
        }
    }
}
