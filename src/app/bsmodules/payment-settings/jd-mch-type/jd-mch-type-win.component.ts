import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../common/enum/common.enum';
import {JDMchTypeService} from '../../../common/services/request/payment-settings/jd-mch-type.service';
import {JDMchTypeModel} from '../../../common/model/payment-settings/jd-mch-type.model';
import {SearchWindowConfig} from '@delon/abc';

/**
 * 京东商户类型弹窗
 * Created by hux on 2018/3/1
 */
@Component({
    selector:'jd-mch-type-win',
    templateUrl:'./jd-mch-type-win.component.html',
    providers:[JDMchTypeService]
})
export class JDMchTypeWinComponent implements OnInit{
    public jdMchTypeApplyForm:FormGroup;
    public jdMchTypeModel:JDMchTypeModel = new JDMchTypeModel(); // 京东商户类型模板
    public id:number; // 列表页编辑按钮传递过来的主键id
    isLoadingOne = false; // 按钮loading效果

    /**
     * 父级类型控件配置
     */
    public parentCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('JDMchType.listPage.parentCfg.title'),
        url:JDMchTypeService.JD_MCH_TYPE_LIST_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field:'typeName',
                label:this.i18n.fanyi('JDMchType.listPage.parentCfg.typeName')
            },
            {
                field:'typeNo',
                label:this.i18n.fanyi('JDMchType.listPage.parentCfg.typeNo')
            }
        ],
        tableColumns:[
            {
                title:this.i18n.fanyi('JDMchType.listPage.parentCfg.typeName'),
                index:'typeName'
            },
            {
                title:this.i18n.fanyi('JDMchType.listPage.parentCfg.typeNo'),
                index:'typeNo'
            }
        ]
    };

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _modal:NzModalSubject,
        public jdMchTypeService:JDMchTypeService,
        public _msg:NzMessageService,
    ){}

    ngOnInit(){
        this.jdMchTypeApplyForm = this.fb.group({
            parent:[this.jdMchTypeModel.parent],
            typeName: [this.jdMchTypeModel.typeName,[Validators.required,Validators.maxLength(64)]],
            typeNo: [this.jdMchTypeModel.typeNo,[Validators.required,Validators.maxLength(32)]],
            categoryNo:[this.jdMchTypeModel.categoryNo]
        });

        if(!this.helper.isEmpty(this.id)){
           this.jdMchTypeService.findDetail({id:this.id}).subscribe(res => {
               if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                   this.jdMchTypeModel = res[CommonEnum.SERVER_DATA_KEY];
               }
           })
        }
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoadingOne = true;
        if(this.jdMchTypeApplyForm.valid){
            // 提交数据
            let _obs = this.jdMchTypeModel.id ? this.jdMchTypeService.update(this.jdMchTypeModel) : this.jdMchTypeService.add(this.jdMchTypeModel);
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
        return this.jdMchTypeApplyForm.controls[name];
    }
}

