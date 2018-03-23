import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../common/enum/common.enum';
import {BankConfigService} from '../../../common/services/request/payment-settings/bank-config.service';
import {BankConfigModel} from '../../../common/model/payment-settings/bank-config.model';

/**
 * 银行配置弹窗
 * Created by hux on 2018/3/1
 */
@Component({
    selector:'bank-config-win',
    templateUrl:'./bank-config-win.component.html',
    providers:[BankConfigService]
})
export class BankConfigWinComponent implements OnInit{
    public bankConfigApplyForm:FormGroup;
    public model:BankConfigModel = new BankConfigModel(); // 银行配置模板
    isLoadingOne = false; // 按钮loading效果

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _modal:NzModalSubject,
        public bankConfigService:BankConfigService,
        public _msg:NzMessageService,
    ){}

    ngOnInit(){
        this.bankConfigApplyForm = this.fb.group({
            name:[this.model.name,[Validators.required,Validators.maxLength(64)]],
            bankDigitalCode: [this.model.bankDigitalCode,[Validators.required,Validators.maxLength(16)]],
            bankEnCode: [this.model.bankEnCode,[Validators.required,Validators.maxLength(16)]],
            descript:[this.model.descript],
        })
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoadingOne = true;
        if(this.bankConfigApplyForm.valid){
            // 提交数据
            let _obs = this.model.id ? this.bankConfigService.update(this.model) : this.bankConfigService.add(this.model);
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
        return this.bankConfigApplyForm.controls[name];
    }
}

