import {Component, OnInit} from '@angular/core';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {payCfgPlusModel} from '../../../../common/model/center-manage/paycfg-plus.model';
import {NzMessageService} from 'ng-zorro-antd';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {CommonService} from '../../../../common/services/request/common.service';
import {SearchWindowConfig} from '@delon/abc';
import {AcceptingInstitutionListDbService} from '../../../../common/services/request/center-manage/accepting-institution.service';
import {Router} from '@angular/router';
import {MenuService} from '@delon/theme';
/**
 * create by hsz 2018-3-1
 * 添加支付配置页面
 */
@Component({
    selector:'pay-cfg-plus',
    templateUrl:'./pay-cfg-plus.component.html',
    providers:[CommonEnum,AcceptingInstitutionListDbService]
})
export class payCfgPlusComponent implements OnInit {
    public model: payCfgPlusModel = new payCfgPlusModel();
    public modelGroup: FormGroup;
    public isLoadingOne = false; // loading
    public isAdd:boolean = true; //标记是否为新增
    /**
     * 支付模式
     */
    public centerPattern:Array<any> = [];
    public _transType:any; //接收支付类型名称
    /**
     * 支付中心控件配置
     */
    public centerIdTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('CenterManger.payManage.TransIdCfg.title'),
        url: AcceptingInstitutionListDbService.TRANSID_INFO_URL,
        isAjax: true,
        params:{},
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [
            {
                field: 'transType',
                label: this.i18n.fanyi('CenterManger.payManage.TransIdCfg.title')
            }],
        tableColumns: [{
            title: this.i18n.fanyi('CenterManger.payManage.TransIdCfg.transType'),
            index: 'transType'
        },{
            title:this.i18n.fanyi('CenterManger.payManage.TransIdCfg.transId'),
            index:'transId'
        }]
    };
    constructor(public i18n:I18NService,public helper:HelperService,public msg: NzMessageService,
                public menuService: MenuService, public router: Router,  public AccInsDb:AcceptingInstitutionListDbService
                ){
    }
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'transId': new FormControl(this.model.transId,[Validators.required]),
            'centerPattern': new FormControl(this.model.centerPattern, [Validators.required]),
            'tradeChan': new FormControl(this.model.tradeChan, [Validators.required]),
            'wxOauthAppid': new FormControl(this.model.wxOauthAppid),
            'companion': new FormControl(this.model.companion,[Validators.required]),
            'subAppid': new FormControl(this.model.subAppid),
            'subCompanion': new FormControl(this.model.subCompanion),
            'signkey': new FormControl(this.model.signkey,[Validators.required]),
            'currency': new FormControl(this.model.currency),
            'appid': new FormControl(this.model.appid),
            'refundId': new FormControl(this.model.refundId),
            'refundPwd': new FormControl(this.model.refundPwd,),
            'notifyUrl': new FormControl(this.model.notifyUrl),
            'callbackUrl': new FormControl(this.model.callbackUrl),
        });
        this.centerPattern = this.helper.getDictByKey('PAYCENTER_CENTER_TYPE');
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if (menu && menu['params']) { // 判断路由是否有传参
            let params = menu['params'];
            this.model['bankNo'] = params['bankNo'];
            this.centerIdTableCfg.params = {bankNo:this.model['bankNo']};
            this.model.centerId = params['id'];
            //编辑进来查询单条数据赋值给model
                this.AccInsDb.tradeTypeById({centerId:params['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.isAdd = false;
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                        this._transType = res[CommonEnum.SERVER_DATA_KEY]['transType'];
                    }
                })

        }
    }
    _submitForm() {
        this.isLoadingOne = true;
        if(this.modelGroup.valid){
            let _Add = this.isAdd ? this.AccInsDb.tradeTypeAdd(this.model) : this.AccInsDb.tradeTypeModify(this.model);
            // this.AccInsDb.mchSave(this.model)
            _Add.subscribe(res => {
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
    onTransIdSelected(value){
        this.model.transId = value.transId;
        this.model.transType = value.transType;
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
}
