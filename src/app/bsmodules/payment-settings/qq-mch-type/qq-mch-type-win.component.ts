import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../common/enum/common.enum';
import {SearchWindowConfig} from '@delon/abc';
import {QQMchTypeService} from '../../../common/services/request/payment-settings/qq-mch-type.service';
import {QQMchTypeModel} from '../../../common/model/payment-settings/qq-mch-type.model';

/**
 * QQ商户类型弹窗
 * Created by hux on 2018/3/1
 */
@Component({
    selector:'qq-mch-type-win',
    templateUrl:'./qq-mch-type-win.component.html',
    providers:[QQMchTypeService]
})
export class QQMchTypeWinComponent implements OnInit{
    public qqMchTypeApplyForm:FormGroup;
    public qqMchTypeModel:QQMchTypeModel = new QQMchTypeModel(); // QQ商户类型模板
    public id:number; // 列表页编辑按钮传递过来的主键id
    isLoadingOne = false;

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _modal:NzModalSubject,
        public qqMchTypeService:QQMchTypeService,
        public _msg:NzMessageService,
    ){}

    ngOnInit(){
        this.qqMchTypeApplyForm = this.fb.group({
            categoryNo:[this.qqMchTypeModel.categoryNo,Validators.required],
            typeNo: [this.qqMchTypeModel.typeNo,Validators.required],
            typeName: [this.qqMchTypeModel.typeName,[Validators.required,Validators.maxLength(64)]],
            parent:[this.qqMchTypeModel.parent]
        })

        if(!this.helper.isEmpty(this.id)){
            this.qqMchTypeService.findDetail({id:this.id}).subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.qqMchTypeModel = res[CommonEnum.SERVER_DATA_KEY];
                }
            })
        }
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoadingOne = true;
        if(this.qqMchTypeApplyForm.valid){
            // 提交数据
            let _obs = this.qqMchTypeModel.id ? this.qqMchTypeService.update(this.qqMchTypeModel) : this.qqMchTypeService.add(this.qqMchTypeModel);
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
        return this.qqMchTypeApplyForm.controls[name];
    }
}

