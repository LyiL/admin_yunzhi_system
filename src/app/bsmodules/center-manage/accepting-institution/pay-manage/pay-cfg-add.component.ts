import {Component, OnInit} from '@angular/core';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {Router} from '@angular/router';
import {MenuService} from '@delon/theme';
import {AcceptingInstitutionListDbService} from '../../../../common/services/request/center-manage/accepting-institution.service';
import {Observable} from 'rxjs/Observable';
import {payCfgAddModel} from '../../../../common/model/center-manage/paycfg-add.model';
import {SearchWindowConfig} from '@delon/abc';
import {CommonService} from '../../../../common/services/request/common.service';
/**
 * create by hsz 2018-3-1
 * 新增或编辑支付配置页面
 */
@Component({
    selector:'pay-cfg-add',
    templateUrl:'./pay-cfg-add.component.html',
    providers:[CommonEnum,AcceptingInstitutionListDbService,CommonService]
})
export class payCfgAddComponent implements OnInit {
    public model: payCfgAddModel = new payCfgAddModel();
    public modelGroup: FormGroup;
    public isLoadingOne = false; // loading
    /**
     * 结算方
     */
    public settlePartys: Observable<any>;
    /**
     * 支付模式
     */
    public tradeTypes: Observable<any>;
    /**
     * 手续费配置
     */
    public feeRuleTypes: Observable<any>;

    /**
     * 结算类型
     */
    public settleTypes: Observable<any>;
    /**
     * 分润类型
     */
    public chaProfitTypes: Observable<any>;
    public _bankNo; //接收受理机构编号
    public Ulo:any; //接收配置项

    /**
     * 关联受理机构控件配置
     */
    public otherCenterBankCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('CenterManger.payManage.otherCenterBankCfg.title'),
        url: CommonService.ORGNO_URL,
        isAjax: false,
        params:{},
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'name',
            label:this.i18n.fanyi('CenterManger.payManage.otherCenterBankCfg.otherCenterBankName')
        },{
            field:'orgNo',
            label:this.i18n.fanyi('CenterManger.payManage.otherCenterBankCfg.otherCenterBank')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('CenterManger.payManage.otherCenterBankCfg.otherCenterBankName'),
            index:'name'
        },{
            title:this.i18n.fanyi('CenterManger.payManage.otherCenterBankCfg.otherCenterBank'),
            index:'orgNo'
        }]
    };
    /**
     * 关联支付中心控件配置
     */
    public otherCenterIdCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('CenterManger.payManage.otherCenterIdCfg.title'),
        url: AcceptingInstitutionListDbService.OTHERCENTER_LIST_URL,
        isAjax: true,
        params:{},
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'id',
            label:this.i18n.fanyi('CenterManger.payManage.otherCenterIdCfg.otherCenterId')
        },{
            field:'name',
            label:this.i18n.fanyi('CenterManger.payManage.otherCenterIdCfg.otherCenterName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('CenterManger.payManage.otherCenterIdCfg.otherCenterId'),
            index:'id'
        },{
            title:this.i18n.fanyi('CenterManger.payManage.otherCenterIdCfg.otherCenterName'),
            index:'name'
        }]
    };

    constructor(public i18n:I18NService,public helper:HelperService,public msg: NzMessageService,
                public menuService: MenuService, public router: Router,  public AccInsDb:AcceptingInstitutionListDbService
                ){}
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'name': new FormControl(this.model.name,[Validators.required]),
            'settleParty': new FormControl(this.model.settleParty, [Validators.required]),
            'tradeType': new FormControl(this.model.tradeType, [Validators.required]),
            'feeRuleType': new FormControl(this.model.feeRuleType, [Validators.required]),
            'bankCard': new FormControl(this.model.bankCard,[Validators.pattern(/^[0-9]*$/)]),
            'bankCardName': new FormControl(this.model.bankCardName),
            'bankName': new FormControl(this.model.bankName),
            'settleType': new FormControl(this.model.settleType),
            'settleRate': new FormControl(this.model.settleRate,[Validators.required,this.numberValidator]),
            'chaProfitType': new FormControl(this.model.chaProfitType),
            'otherCenterId': new FormControl(this.model.otherCenterId),
            'otherCenterBank': new FormControl(this.model.otherCenterBank),
            'descript': new FormControl(this.model.descript)
        });
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if (menu && menu['params']) {// 判断路由是否有传参
            let params = menu['params'];
            this.model['bankNo'] = params['bankNo'];
            if(params['id']){//编辑进来查询单条数据赋值给model
                this.AccInsDb.payCenterById({id:params['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                    }else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        }
        this.Ulo = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');
        this.settlePartys =Observable.of(this.helper.getDictByKey('PAYCENTER_IS_COMMISSION')) ;
        this.tradeTypes = Observable.of(this.helper.getDictByKey('PAYCENTER_CENTER_TYPE'));
        this.feeRuleTypes = Observable.of(this.helper.getDictByKey('PAYCENTER_RATE_TYPE'));
        this.settleTypes = Observable.of(this.helper.getDictByKey('PAYCENTER_BALANCE_TYPE'));
        this.chaProfitTypes = Observable.of(this.helper.getDictByKey('PAYCENTER_CH_TYPE'));
    }
    _submitForm() {

        if(this.modelGroup.valid){
            // if(this.model.tradeType == 2){  // 如果支付模式是通道模式
                if(this.model.otherCenterBank && !this.model.otherCenterId){ // 受理机构和支付中心必须同时存在
                    this.msg.error(this.i18n.fanyi('CenterManger.payManage.tip2'));
                    return false;
                }
                if(!this.model.otherCenterBank && this.model.otherCenterId){ // 受理机构和支付中心必须同时存在
                    this.msg.error(this.i18n.fanyi('CenterManger.payManage.tip3'));
                    return false;
                }
            // }
            this.isLoadingOne = true;
            let _id = this.model.id ? this.AccInsDb.payCenterModify(this.model) : this.AccInsDb.payCenterAdd(this.model);
            _id.subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.helper.navigate('/admin/center/payManage', this.i18n.fanyi('CenterManger.payManage.title'), {bankNo:this.model['bankNo']});
                }else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
                this.isLoadingOne = false;
            })
        }
    }

    /**
     * 支付中心选中事件
     * @param value
     */
    onotherCenterIdSelected(value){
        this.model.otherCenterId = value.id;
    }
    /**
     * 支付中心查询前事件
     * @param value
     */
    CenterIdBefore(){
        if(!this.model.otherCenterBank){ //判断是否有选受理机构
            this.msg.error(this.i18n.fanyi('CenterManger.payManage.tip1'));
            return false;
        }else {
            this.otherCenterIdCfg.params ={bankNo:this._bankNo};
        }
    }
    /**
     * 支付中心查询前事件
     * @param value
     */
    BankBefore(){
            this.otherCenterBankCfg.params ={status:1,notOrgNo:this.Ulo};
    }
    /**
     * 受理机构选中事件
     * @param value
     */
    onOtherCenterBankSelected(value){
        this._bankNo = value.orgNo;
        this.model.otherCenterBank = value.orgNo;
        this.model.otherCenterName =null;
        this.model.otherCenterId =null;
    }
    /**
     * 取消
     */
    onGoBack(){
        this.helper.navigate('/admin/center/payManage', this.i18n.fanyi('CenterManger.payManage.title'), {bankNo:this.model['bankNo']});
    }


    getFormControl(name) {
        return this.modelGroup.controls[ name ];
    }
    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        // var req = /^[0-9]*$/;//整数
        var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
        let valid = req.test(control.value);
        if(!valid){
            return {numberError:true,error:true};
        }
    }
}
