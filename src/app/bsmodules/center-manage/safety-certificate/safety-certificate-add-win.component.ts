import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {safetyCertificateAddModel} from '../../../common/model/center-manage/safety-certificate-add.model';
import {I18NService} from '../../../common/i18n/i18n.service';
import {HelperService} from '../../../common/services/helper.service';
import {safetyCertificateDbService} from '../../../common/services/request/center-manage/safety-certificate.service';
import {AcceptingInstitutionListDbService} from '../../../common/services/request/center-manage/accepting-institution.service';
import {CommonEnum} from '../../../common/enum/common.enum';
import {SearchWindowConfig} from '@delon/abc';

/**
 * create by hsz 2018-3-2
 * 新增证书配置弹窗
 */
@Component({
    selector:'safety-certificate-add',
    templateUrl:'./safety-certificate-add-win.component.html',
    providers:[CommonEnum,safetyCertificateDbService,AcceptingInstitutionListDbService]
})
export class safetyCertificateAddWinComponent implements OnInit{
    public model: safetyCertificateAddModel = new safetyCertificateAddModel();
    public modelGroup: FormGroup;
    public isLoadingOne = false; // loading
    public isHide:boolean = false; //标记是否隐藏

    /**
     * 结算方
     */
    public certTypes:Array<any> = [];
    /**
     * 支付中心控件配置
     */
    public CenterIdTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.title'),
        url: AcceptingInstitutionListDbService.PAYCENTER_LIST_URL,
        isAjax: false,
        params:{},
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [
            {
                field: 'name',
                label: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.title')
            }],
        tableColumns: [{
            title: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.name'),
            index: 'name'
        }]
    };

    constructor(public i18n:I18NService,public helper:HelperService,public msg: NzMessageService,public modal: NzModalSubject,
                public SCDb:safetyCertificateDbService,){}
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'certType': new FormControl(this.model.certType,[Validators.required]),
            'centerId': new FormControl(this.model.centerId, [Validators.required]),
            'thridMerchantNo': new FormControl(this.model.thridMerchantNo, ),
            'certPwd': new FormControl(this.model.certPwd,[Validators.required]),
            'refundUserId': new FormControl(this.model.refundUserId,),
            'refundUserPwd': new FormControl(this.model.refundUserPwd,),
        });
        this.certTypes = this.helper.getDictByKey('GW_CERT_TYPE');
    }

    _submitForm(){
        this.isLoadingOne = true;
        if(this.modelGroup.valid){
             this.SCDb.safCertAdd(this.model).subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.modal.destroy('onOk');
                }else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
                this.isLoadingOne = false;
            })
        }
    }

    /**
     * 证书类型选中事件
     * @param value
     */
    onCertTypeSelected(value){
        if(value.nzValue == "1"){ //判断证书类型为商户证书
            this.isHide = true;
            this.model.centerId = null;
            this.getFormControl('centerId').clearValidators();
            this.getFormControl('centerId').updateValueAndValidity();
            this.getFormControl('thridMerchantNo').setValidators([Validators.required]);
            this.getFormControl('thridMerchantNo').updateValueAndValidity();
        }
        if(value.nzValue == "0"){//判断证书类型为支付中心
            this.isHide = false;
            this.getFormControl('centerId').setValidators([Validators.required]);
            this.getFormControl('centerId').updateValueAndValidity();
            this.getFormControl('thridMerchantNo').clearValidators();
            this.getFormControl('thridMerchantNo').updateValueAndValidity()
        }
    }
    /**
     *支付中心选中事件
     * @param value
     */
    onSelected(value){
        this.model.centerId = value.id;
    }
    getFormControl(name) {
        return this.modelGroup.controls[ name ];
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
