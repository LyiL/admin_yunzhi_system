import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {AreaCodeConfigService} from '../../../common/services/request/payment-settings/area-code-config.service';
import {AreaCodeConfigModel} from '../../../common/model/payment-settings/area-code-config.model';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../common/enum/common.enum';

/**
 * 地区码配置弹窗
 * Created by hux on 2018/3/1
 */
@Component({
    selector:'area-code-config-win',
    templateUrl:'./area-code-config-win.component.html',
    providers:[AreaCodeConfigService]
})
export class AreaCodeConfigWinComponent implements OnInit{
    public areaCodeConfigApplyForm:FormGroup;
    public model:AreaCodeConfigModel = new AreaCodeConfigModel(); // 地区码配置模板
    isLoadingOne = false; // 按钮loading效果

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _modal:NzModalSubject,
        public areaCodeConfigService:AreaCodeConfigService,
        public _msg: NzMessageService,
    ){}

    ngOnInit(){
        this.areaCodeConfigApplyForm = this.fb.group({
            areaCode: [this.model.areaCode,[Validators.required,Validators.maxLength(6),this.numberValidator]],
            name: [this.model.name,[Validators.required,Validators.maxLength(50)]],
            adCode:[this.model.adCode,Validators.maxLength(32)],
        })
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoadingOne = true;
        if(this.areaCodeConfigApplyForm.valid){
            // 提交数据
            let _obs = this.model.id ? this.areaCodeConfigService.update(this.model) : this.areaCodeConfigService.add(this.model);
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
        return this.areaCodeConfigApplyForm.controls[name];
    }

    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            var req = /^[0-9]*$/;//整数
            // var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }
}

