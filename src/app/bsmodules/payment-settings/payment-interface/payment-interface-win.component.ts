import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../common/enum/common.enum';
import {SearchWindowConfig} from '@delon/abc';
import {PaymentInterfaceService} from '../../../common/services/request/payment-settings/payment-interface.service';
import {PaymentInterfaceModel} from '../../../common/model/payment-settings/payment-interface.model';
import {CommonService} from '../../../common/services/request/common.service';

/**
 * 支付接口弹窗
 * Created by hux on 2018/3/1
 */
@Component({
    selector:'payment-interface-win',
    templateUrl:'./payment-interface-win.component.html',
    providers:[PaymentInterfaceService]
})
export class PaymentInterfaceWinComponent implements OnInit{
    public paymentInterfaceApplyForm:FormGroup;
    public model:PaymentInterfaceModel = new PaymentInterfaceModel(); // 京东商户类型模板
    public apiTypes:Array<any> = []; // 类型
    isLoadingOne = false; // 按钮loading效果

    /**
     * 所属机构控件配置
     */
    public bankNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.title'),
        url:CommonService.ORGNO_URL,
        params:{status:1},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field:'orgNo',
                label:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.orgNo')
            },
            {
                field:'name',
                label:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.name')
            }
        ],
        tableColumns:[
            {
                title:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.orgNo'),
                index:'orgNo'
            },
            {
                title:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.name'),
                index:'name'
            }
        ]
    };

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _modal:NzModalSubject,
        public paymentInterfaceService:PaymentInterfaceService,
        public _msg:NzMessageService,
    ){
        this.apiTypes = this.helper.getDictByKey('PAYMENT_TRADE_API_TYPE'); // 获取类型
    }

    ngOnInit(){
        this.paymentInterfaceApplyForm = this.fb.group({
            transType:[this.model.transType,[Validators.required,Validators.maxLength(64)]],
            transId: [this.model.transId,[Validators.required,Validators.maxLength(64)]],
            apiType: [this.model.apiType,Validators.required],
            bankNo:[this.model.bankNo,Validators.required]
        });
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoadingOne = true;
        if(this.paymentInterfaceApplyForm.valid){
            // 提交数据
            let _obs = this.model.id ? this.paymentInterfaceService.update(this.model) : this.paymentInterfaceService.add(this.model);
            _obs.subscribe(res => {
                this.isLoadingOne = false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this._msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this._modal.destroy('onOk');
                }else{
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    public getFormControl(name) {
        return this.paymentInterfaceApplyForm.controls[name];
    }
}

