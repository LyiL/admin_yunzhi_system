import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../common/enum/common.enum';
import {SearchWindowConfig} from '@delon/abc';
import {MchTypeModel} from '../../../common/model/payment-settings/mch-type.model';
import {MchTypeService} from '../../../common/services/request/payment-settings/mch-type.service';

/**
 * 商户类型弹窗
 * Created by hux on 2018/3/1
 */
@Component({
    selector:'mch-type-win',
    templateUrl:'./mch-type-win.component.html',
    providers:[MchTypeService]
})
export class MchTypeWinComponent implements OnInit{
    public mchTypeApplyForm:FormGroup;
    public mchTypeModel:MchTypeModel = new MchTypeModel(); // 商户类型模板
    public id:number; // 列表页编辑按钮传递过来的主键id
    isLoadingOne = false; // 按钮loading效果

    /**
     * 父级类型控件配置
     */
    public parentCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('mchType.listPage.parentCfg.title'),
        url:MchTypeService.MCH_TYPE_LIST_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field:'name',
                label:this.i18n.fanyi('mchType.listPage.parentCfg.name')
            },
            {
                field:'categoryNo',
                label:this.i18n.fanyi('mchType.listPage.parentCfg.categoryNo')
            }
        ],
        tableColumns:[
            {
                title:this.i18n.fanyi('mchType.listPage.parentCfg.name'),
                index:'name'
            },
            {
                title:this.i18n.fanyi('mchType.listPage.parentCfg.categoryNo'),
                index:'categoryNo'
            }
        ]
    };

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _modal:NzModalSubject,
        public mchTypeService:MchTypeService,
        public _msg:NzMessageService,
    ){}

    ngOnInit(){
        this.mchTypeApplyForm = this.fb.group({
            parent:[this.mchTypeModel.parent],
            name: [this.mchTypeModel.name,[Validators.required,Validators.maxLength(64)]],
            categoryNo: [this.mchTypeModel.categoryNo,[Validators.required,Validators.maxLength(3)]],
            alipayTypeno:[this.mchTypeModel.alipayTypeno,Validators.maxLength(16)],
            wxTypeno:[this.mchTypeModel.wxTypeno,Validators.maxLength(16)]
        });

        // 编辑进来查询商户类型(单条)
        if(!this.helper.isEmpty(this.id)){
            this.mchTypeService.findDetail({id:this.id}).subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.mchTypeModel = res[CommonEnum.SERVER_DATA_KEY];
                }
            })
        }
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoadingOne = true;
        if(this.mchTypeApplyForm.valid){
            // 提交数据
            let _obs = this.mchTypeModel.id ? this.mchTypeService.update(this.mchTypeModel) : this.mchTypeService.add(this.mchTypeModel);
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
        return this.mchTypeApplyForm.controls[name];
    }
}

