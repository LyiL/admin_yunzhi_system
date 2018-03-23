import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {AcceptingInstitutionListDbService} from '../../../../common/services/request/center-manage/accepting-institution.service';
import {AccountCfgAddModel} from '../../../../common/model/center-manage/account-cfg-add.model';
/**
 * create by hsz 2018-2-28
 * 添加对账单配置弹窗
 */
@Component({
    selector:'account-cfg-win',
    templateUrl:'./account-cfg-win.component.html',
    providers:[AcceptingInstitutionListDbService]
})
export class accountCfgWinComponent implements OnInit{
    public model: AccountCfgAddModel = new AccountCfgAddModel();
    public modelGroup: FormGroup;
    public isLoadingOne = false; // loading
    public _bankNo:any; //新增账单配置接收父级传递的参数
    public id:any;//编辑账单配置接收父级传递的参数
    /**
     * 结算方
     */
    public billType:Array<any> = [];

    constructor(public i18n:I18NService,public helper:HelperService,public msg: NzMessageService,public modal: NzModalSubject,
                public AccInsDb:AcceptingInstitutionListDbService){

    }
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'companion': new FormControl(this.model.companion,[Validators.required]),
            'billType': new FormControl(this.model.billType, [Validators.required]),
            'downClass': new FormControl(this.model.downClass, ),
            'classParams': new FormControl(this.model.classParams, ),
            'parseClass': new FormControl(this.model.parseClass,),
            'downBegin': new FormControl(this.model.downBegin,[Validators.pattern(/^[0-9]*$/)]),
            'downEnd': new FormControl(this.model.downEnd,[Validators.pattern(/^[0-9]*$/)])
        });
        this.billType = this.helper.getDictByKey('CHECK_TYPE');
        this.model.bankNo = this._bankNo;
        if(this.id){//编辑账单配置进来查询单条数据赋值给model
            this.AccInsDb.billById({id:this.id}).subscribe(res =>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.model = res[CommonEnum.SERVER_DATA_KEY];
                }
            })
        }
    }

    _submitForm(){
        if(this.modelGroup.valid){
            if(this.model.downBegin * 1 > this.model.downEnd * 1){ //下载开始时间不能大于结束时间
                this.msg.error(this.i18n.fanyi('CenterManger.tips.TimeErr'));
                return false;
            }
            if(this.model.downBegin * 1 >24 || this.model.downEnd * 1 > 24 ){//时间能大于24
                this.msg.error(this.i18n.fanyi('CenterManger.tips.fitTime'));
                return false;
            }
            this.isLoadingOne = true;
            let _id = this.model.id ? this.AccInsDb.billEdit(this.model) : this.AccInsDb.billSave(this.model);
            // this.AccInsDb.mchSave(this.model)
            _id.subscribe(res => {
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
