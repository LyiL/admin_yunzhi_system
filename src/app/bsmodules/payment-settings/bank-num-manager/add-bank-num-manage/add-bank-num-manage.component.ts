import {Component, OnInit} from "@angular/core";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {BankNumManageServic} from "../../../../common/services/request/payment-settings/bank-num-manage.servic";
import {AddBankNumManageModel} from "../../../../common/model/payment-settings/add-bank-num-manage.model";
import {CommonEnum} from "../../../../common/enum/common.enum";

/**
 * 新增联号管理
 * Created by zll on 2018/3/1
 */
@Component({
    selector:'add-bank-num-manage',
    templateUrl:'./add-bank-num-manage.component.html',
    providers:[BankNumManageServic]
})
export class AddBankNumManageComponent implements OnInit{


    public addBankNumManage: FormGroup;   //表单名
    public model: AddBankNumManageModel = new AddBankNumManageModel();   //实列AddBankNumManageModel
    public _id:any;    //主键id
    public isLoading = false;  //按钮载入状态样式

    // 获取列表页传入id
    set id(value: any) {
        this._id = value;
    }

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _msg:NzMessageService,
        public bankNumManageServic:BankNumManageServic,
        public _modal: NzModalSubject,
    ){
        this.addBankNumManage = fb.group({
            cardBin:[this.model.cardBin, [Validators.required]],
            cardLeg:[this.model.cardLeg, [Validators.required]],
            orgBankno:[this.model.orgBankno,[Validators.required]],
            smallName:[this.model.smallName,[Validators.required]],
            fullName:[this.model.fullName, [Validators.required]],
            bankLinkno:[this.model.bankLinkno,[Validators.required]],
        });
    }


    ngOnInit(){
        /**
         * 联行号详情数据获取
         */
        if(this._id){
            this.bankNumManageServic.detailBankNumInfo({id:this._id})
                .subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.model= res[CommonEnum.SERVER_DATA_KEY];

                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
        }
    }

    /**
     * 保存
     */
    submitForm(){
        this.isLoading=true;
        let _obs = this._id? this.bankNumManageServic.editBankNumInfo(this.model):this.bankNumManageServic.addBankNumInfo(this.model);
        _obs.subscribe(res=>{
            this.isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this._modal.destroy('onOk');
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }



    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.addBankNumManage.controls[name];
    }

    }




