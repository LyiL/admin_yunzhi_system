import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../common/enum/common.enum';
import {PaymentChannelService} from '../../../common/services/request/payment-settings/payment-channel.service';
import {PaymentChannelModel} from '../../../common/model/payment-settings/payment-channel.model';

/**
 * 支付渠道弹窗
 * Created by hux on 2018/3/1
 */
@Component({
    selector:'payment-channel-win',
    templateUrl:'./payment-channel-win.component.html',
    providers:[PaymentChannelService]
})
export class PaymentChannelWinComponent implements OnInit{
    public paymentChannelApplyForm:FormGroup;
    public paymentChannelModel:PaymentChannelModel = new PaymentChannelModel(); // 支付渠道模板
    isLoadingOne = false; // 按钮loading效果

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _modal:NzModalSubject,
        public paymentChannelService:PaymentChannelService,
        public _msg:NzMessageService,
    ){}

    ngOnInit(){
        this.paymentChannelApplyForm = this.fb.group({
            routeChannelName: [this.paymentChannelModel.routeChannelName,Validators.required],
            routeChannelCode: [this.paymentChannelModel.routeChannelCode,Validators.required]
        })
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoadingOne = true;
        if(this.paymentChannelApplyForm.valid){
            // 提交数据
            this.paymentChannelService.add(this.paymentChannelModel).subscribe(res => {
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
        return this.paymentChannelApplyForm.controls[name];
    }
}

