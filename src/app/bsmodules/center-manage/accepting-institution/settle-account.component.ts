import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonEnum} from '../../../common/enum/common.enum';
import {NzMessageService, ObjectExtend} from 'ng-zorro-antd';
import {I18NService} from '../../../common/i18n/i18n.service';
import {HelperService} from '../../../common/services/helper.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {settleAccountModel} from '../../../common/model/center-manage/settle-account.model';
import {CommonService} from '../../../common/services/request/common.service';
import {SearchWindowConfig} from '@delon/abc';
import {AcceptingInstitutionListDbService} from '../../../common/services/request/center-manage/accepting-institution.service';
import {Router} from '@angular/router';
import {MenuService} from '@delon/theme';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
/**
 * create by hsz 2018-2-28
 * 设置结算账户页面
 */
@Component({
    selector:'settle-account-add',
    templateUrl:'./settle-account.component.html',
    providers:[CommonEnum,AcceptingInstitutionListDbService]
})
export class settleAccountComponent implements OnInit,AfterContentChecked {
    public model:settleAccountModel = new settleAccountModel();
    public modelGroup: FormGroup;
    /**
     * 账户类型
     */
    public type: Array<any> = [];
    /**
     * 行内帐户
     */
    public _bankName:any; //接收银行名称
    public cardType: Array<any> = [];
    public isLoadingOne = false; // loading
    public bankTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('CenterManger.listPage.BankInfoCfg.title'),
        url:AcceptingInstitutionListDbService.BANK_INFO_URL,
        params:{},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'name',
            label:this.i18n.fanyi('CenterManger.listPage.BankInfoCfg.name')
        },{
            field:'bankDigitalCode',
            label:this.i18n.fanyi('CenterManger.listPage.BankInfoCfg.bankDigitalCode')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('CenterManger.listPage.BankInfoCfg.name'),
            index:'name'
        },{
            title:this.i18n.fanyi('CenterManger.listPage.BankInfoCfg.bankDigitalCode'),
            index:'bankDigitalCode'
        }]
    };
    /**
     * 开户支行控件配置
     */
    public subBankCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('CenterManger.listPage.subBankCfg.title'),
        url:CommonService.BANKLINKNO_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'linkNo',
            label:this.i18n.fanyi('CenterManger.listPage.subBankCfg.linkNo')
        },{
            field:'subBankName',
            label:this.i18n.fanyi('CenterManger.listPage.subBankCfg.subBankName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('CenterManger.listPage.subBankCfg.linkNo'),
            index:'linkNo'
        },{
            title:this.i18n.fanyi('CenterManger.listPage.subBankCfg.subBankName'),
            index:'subBankName'
        }]
    };
    constructor(public i18n:I18NService,public helper:HelperService,
                public menuService:MenuService,public router:Router,
                public AccInsDb:AcceptingInstitutionListDbService,public objectExtend:ObjectExtend,
                public msg: NzMessageService,public changeDetectorRef: ChangeDetectorRef,){

    }
    public isAdd:boolean = false;// 标记是否为新增
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'name': new FormControl(this.model.name,[Validators.required]),
            'type': new FormControl(this.model.type, [Validators.required]),
            'acntIdentity': new FormControl(this.model.acntIdentity,[this.IDcardValidator]),
            'bankCode': new FormControl(this.model.bankCode, [Validators.required]),
            'bankCardno': new FormControl(this.model.bankCardno, [Validators.required,this.numberValidator]),
            'subbranchName': new FormControl(this.model.subbranchName, [Validators.required]),
            'subbanrchCode': new FormControl(this.model.subbanrchCode, [Validators.required,this.numberValidator]),
            'cardType': new FormControl(this.model.cardType, [Validators.required]),
        });
        if(!this.model.acntId){
            this.model.type = "1"; // 新增默认类型为企业
        }
        this.type = this.helper.getDictByKey('ACCOUNT_TYPE');//账户类型
        this.cardType = this.helper.getDictByKey('ACCOUNT_CARD_TYPE');//行内帐户
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if (menu && menu['params']) {
            let params = menu['params'];
            this.model['orgId'] = params['orgId'];
            this.model['accountId'] = params['accountId'];

        }
        if(this.model.accountId && this.model.accountId != 0){ //判断是否为结算账户
            this.AccInsDb.searchAccount({acntId:this.model.accountId,settleType:1})
                .subscribe((res)=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY && res[CommonEnum.SERVER_DATA_KEY] != null){
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                        this._bankName = res[CommonEnum.SERVER_DATA_KEY]['bankName'];
                        this.isAdd = false;
                    }else{
                        this.isAdd = true;
                    }
                });
        }else {
            this.isAdd = true;
        }
    }
    _submitForm() {
        this.isLoadingOne = true;
        if(this.modelGroup.valid){
            let req = this.isAdd ? this.AccInsDb.bankAccountSave(this.objectExtend.extend(this.model,{optionType:"1",settleType:"1"})):this.AccInsDb.bankAccountUpdate(this.objectExtend.extend(this.model,{optionType:"1",settleType:"1"}));
            req.subscribe( res=>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.helper.navigate('/admin/center/acceptinstitution', this.i18n.fanyi('CenterManger.title'), {},true);
                }else{
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
                this.isLoadingOne = false;
            });
        }
    }
    /**
     *开户银行选中事件
     */
    onbankSelected(value){
        this.model.bankCode = value.bankDigitalCode;
        this.model.bankName = value.name;
    }
    /**
     * 取消
     */
    onGoBack(){
        this.helper.navigate('/admin/center/acceptinstitution', this.i18n.fanyi('CenterManger.title'), {});
    }

    /**
     *开户支行选中事件
     */
    public onSelect(value){
        this.model.subbanrchCode = value.linkNo;
    }
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }
    getFormControl(name) {
        return this.modelGroup.controls[ name ];
    }
    /**
     * 身份证的校验器
     */
    IDcardValidator(control: FormControl){
        if(control.value){
            var req = /^\d{17}(\d|X)$/;//身份证号码（18位）
            let valid = req.test(control.value);
            if(!valid){
                return {IDcardError:true,error:true};
            }
        }
    }

    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        var req = /^[0-9]*$/;//整数
        // var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
        let valid = req.test(control.value);
        if(!valid){
            return {numberError:true,error:true};
        }
    }

}
