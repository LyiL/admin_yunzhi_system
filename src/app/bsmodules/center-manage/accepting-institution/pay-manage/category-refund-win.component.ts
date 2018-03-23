import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {categoryRefundModel} from '../../../../common/model/center-manage/category-refund.model';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {AcceptingInstitutionListDbService} from '../../../../common/services/request/center-manage/accepting-institution.service';
/**
 * create by hsz 2018-3-1
 * 退款策略配置弹窗
 */
@Component({
    selector:'category-refund-win',
    templateUrl:'./category-refund-win.component.html',
    providers:[AcceptingInstitutionListDbService]
})
export class categoryRefundWinComponent implements OnInit{
    public model: categoryRefundModel = new categoryRefundModel();
    public modelGroup: FormGroup;
    public isLoadingOne = false; // loading
    public id:any; //接收父级传递的参数
    /**
     * 状态
     */
    public states:Array<any> = [];
    constructor(public i18n:I18NService,public helper:HelperService,public msg: NzMessageService,public modal: NzModalSubject,
                public AccInsDb:AcceptingInstitutionListDbService){

    }
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'limitDayRange': new FormControl(this.model.limitDayRange,[Validators.required,this.numberValidator]),
            'singleRefundFee': new FormControl(this.model.singleRefundFee, [Validators.required,this.numberValidator]),
            'dayRefundFee': new FormControl(this.model.dayRefundFee, [Validators.required,this.numberValidator]),
            'dayRefundCount': new FormControl(this.model.dayRefundCount, [Validators.required,this.numberValidator,Validators.maxLength(5)]),
            'state': new FormControl(this.model.state,[Validators.required]),
            'updateRemark': new FormControl(this.model.updateRemark)
        });
        this.states = this.helper.getDictByKey('ENABLE_STATUS');
        this.model.centerId = this.id;
        // if(params['id']){
            this.AccInsDb.pmByCenterId({centerId:this.model['centerId']}).subscribe(res=>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.model = res[CommonEnum.SERVER_DATA_KEY]; //编辑时查询单条数据赋值给model
                    this.model.dayRefundFee = this.helper.numberTrans(res[CommonEnum.SERVER_DATA_KEY].dayRefundFee,'division',100) ; //显示除以100
                    this.model.singleRefundFee = this.helper.numberTrans(res[CommonEnum.SERVER_DATA_KEY].singleRefundFee,'division',100) ;//显示除以100
                }
            })
        // }
    }

    _submitForm(){
        if(this.modelGroup.valid){
            if(this.model.singleRefundFee * 1 > this.model.dayRefundFee * 1){ //单笔退款金额不能大于当日退款金额
                this.msg.error(this.i18n.fanyi('CenterManger.tips.fee'));
                return false;

            }
            if(this.model.limitDayRange * 1 > 100){ //允许退款天数不能大于100天
                this.msg.error(this.i18n.fanyi('CenterManger.tips.days'));
                return false;
            }
            // if(this.model.dayRefundCount * 1 > 2000000000){ //允许退款笔数不能大于2000000000
            //     this.msg.error(this.i18n.fanyi('CenterManger.tips.count'));
            //     return false;
            // }
            if(this.model.singleRefundFee * 1 > 20000000  ){ //允许单笔退款金额不能大于20000000
                this.msg.error(this.i18n.fanyi('CenterManger.tips.limitSingleFee'));
                return false;
            }
            if(this.model.dayRefundFee * 1 > 20000000){ //允许当日退款金额不能大于20000000
                this.msg.error(this.i18n.fanyi('CenterManger.tips.limitDayFee'));
                return false;
            }
            this.isLoadingOne = true;
            let limitNo = this.model.limitNo ? this.AccInsDb.pmRefundModify(this.model) : this.AccInsDb.pmRefundAdd(this.model);
            // this.AccInsDb.mchSave(this.model)
            limitNo.subscribe(res => {
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
    numberDotValidator(control: FormControl): any{
        // var req = /^[0-9]*$/;//整数
        var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
        let valid = req.test(control.value);
        if(!valid){
            return {numberError:true,error:true}
        }
    }

    /**
     * 定义整数的校验器
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
