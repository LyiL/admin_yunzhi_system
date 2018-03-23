import {Component, OnInit} from "@angular/core";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {AddBankNumManageModel} from "../../../../common/model/payment-settings/add-bank-num-manage.model";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {IpWhiteListService} from "../../../../common/services/request/payment-settings/ip-white-list.service";
import {AddIpWhiteListModel} from "../../../../common/model/payment-settings/add-ip-white-list.model";
import {CommonService} from "../../../../common/services/request/common.service";
import {SearchWindowConfig} from "@delon/abc";

/**
 * 新增IP白名单
 *  Created by zll on 2018/3/1
 */
@Component({
    selector:'add-ip-white-list',
    templateUrl:'./add-ip-white-list.component.html',
    providers:[IpWhiteListService]
})
export class AddIpWhiteListComponent implements OnInit{


    public addIpWhiteListForm: FormGroup;    //表单名
    public model: AddIpWhiteListModel = new AddIpWhiteListModel();  //实列addIpWhiteListForm
    public apiCodeDates:Array<any> = [];     //使用状态字段名
    public _policyNo:any;    //编号
    public isLoading = false;  //按钮载入状态样式
    public  disabled=false;    //是否允许编辑


    // 获取列表页传入policyNo值
    set policyNo(value: any) {
        this._policyNo = value;
    }

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _msg:NzMessageService,
        public ipWhiteListService:IpWhiteListService,
        public _modal: NzModalSubject,
    ){
        this.addIpWhiteListForm = fb.group({
            policyNo:[this.model.policyNo, [Validators.required]],
            policyName:[this.model.policyName, [Validators.required]],
            ips:[this.model.ips,[Validators.required]],
            apiCode:[this.model.apiCode,[Validators.required]],
            mchid:[this.model.mchid,[Validators.required]],
        });
        this.apiCodeDates = this.helper.getDictByKey('API_CODE');   //获取接口编号数据
    }


    /**
     * 所属商户配置
     * @type {{title: (string | any); url: string; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; searchFields: [{field: string; label: (string | any)} , {field: string; label: (string | any)}]; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string}]}}
     */
    public addeleCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('ipWhiteList.merchantCfg.organNoTitle'),
        url:CommonService.MCH_INFO_URL,
        params:{examState:1},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('ipWhiteList.merchantCfg.organNoTitle')
        },{
            field:'name',
            label:this.i18n.fanyi('ipWhiteList.merchantCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('ipWhiteList.merchantCfg.organNoTitle'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('ipWhiteList.merchantCfg.name'),
            index:'name'
        }]
    }



    ngOnInit(){
        /**
         * IP白名单详情数据获取
         */
        if(this._policyNo){
            this.disabled=true;
            this.ipWhiteListService.detailIpWhiteList({policyNo:this._policyNo})
                .subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.model= res[CommonEnum.SERVER_DATA_KEY];
                        if(this.model.policyNo){
                            let _policyNos:Array<any>=this.model.policyNo.split('_');  //设置mchid，apiCode值
                            if(_policyNos&&_policyNos.length==2){
                                this.model.mchid=_policyNos[0];
                                this.model.apiCode=_policyNos[1];
                                this.ipWhiteListService.dealerInfo({examState:1,merchantNo:this.model.mchid}) //请求商户匹配数据
                                    .subscribe(res => {
                                        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                                         let data=res[CommonEnum.SERVER_DATA_KEY];
                                         if(data.innerData){
                                             this.model.name=data.innerData[0].name;
                                         }
                                        }else{
                                            this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                                        }
                                    })
                            }

                        }

                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
        }
    }

    /**
     * 设置policyNo编号
     * @param val
     */
    onSelet(val:any){
        if(val&&this.model.mchid){
            this.model.policyNo = this.model.mchid+'_'+val['_value'];
            // this.model.policyNo = val['_value']+'_'+this.model.mchid;
        }

    }

    /**
     * 户商设置policyNo编号
     * @param val
     */
    onSerarSelect(val:any){
        if(val&&this.model.apiCode){
            this.model.policyNo = val['merchantNo']+'_'+this.model.apiCode;
        }
    }

    /**
     * 保存
     */
    submitForm(){
        this.isLoading=true;
        // let _obs = this._policyNo?this.ipWhiteListService.editIpWhiteList(this.model):this.ipWhiteListService.addIpWhiteList(this.model);
        let _obs = this._policyNo?this.ipWhiteListService.editIpWhiteList({policyNo:this.model['policyNo'],policyName:this.model['policyName'],ips:this.model['ips']}):this.ipWhiteListService.addIpWhiteList(this.model);
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
        return this.addIpWhiteListForm.controls[name];
    }

}




