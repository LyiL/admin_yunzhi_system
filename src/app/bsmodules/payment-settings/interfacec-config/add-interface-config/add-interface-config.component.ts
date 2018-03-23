
import {InterfaceConfigService} from "../../../../common/services/request/payment-settings/interface-config.service";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddInterfaceConfig} from "../../../../common/model/payment-settings/add-interface-config.model";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {ReuseTabService, SearchWindowConfig} from "@delon/abc";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {CommonService} from "../../../../common/services/request/common.service";
/**
 * 新增接口配置
 * Created by zll on 2018/3/1
 */
@Component({
    selector:'add-interface-config',
    templateUrl:'./add-interface-config.component.html',
    providers:[InterfaceConfigService]
})
export class AddInterfaceConfigComponent implements OnInit{


    public addInterfacConfigForm: FormGroup;    //表单名
    public model: AddInterfaceConfig = new AddInterfaceConfig();  //实列AddInterfaceConfig
    public _code:any;    //接口编号
    public isLoading = false;  //按钮载入状态样式
    public isdisabled=false;    //是否允许编辑


    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _msg:NzMessageService,
        public interfaceConfigService:InterfaceConfigService,
        public _modal: NzModalSubject,
        protected menuService:MenuService,
        public router:Router,
        public reuseTabService:ReuseTabService
    ){
        this.addInterfacConfigForm = fb.group({
            code:[this.model.code, [Validators.required]],
            name:[this.model.name],
            appid:[this.model.appid],
            ally:[this.model.ally],
            partkey:[this.model.partkey],
            agencyCode:[this.model.agencyCode, [Validators.required]],
            appKey:[this.model.appKey],
            subAppid:[this.model.subAppid],
            tradeChannel:[this.model.tradeChannel],
            subAlly:[this.model.subAlly],
        });
    }

    /**
     * 所属机构控件配置
     */
    public bankNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.title'),
        url:CommonService.ORGNO_URL,
        isAjax:false,
        params:{status:1},
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('interfaceConfig.listPage.bankNoCfg.name'),
            index:'name'
        }]
    };



    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url); // 获取列表页传入接口编号
        this._code=menu['params']['code'];
        /**
         * 联行号详情数据获取
         */
        if(menu&&this._code){
            this.isdisabled=true;
            this.interfaceConfigService.detailIngerfaceConfig({code:this._code})
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
        let _obs = this._code? this.interfaceConfigService.editIngerfaceConfig(this.model):this.interfaceConfigService.addIngerfaceConfig(this.model);
        _obs.subscribe(res=>{
            this.isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.helper.navigate('/admin/payment/interfacecfglist',this.i18n.fanyi('interfaceConfig.listPage.tableCols.html.titlelist'),{},true);
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 返回
     */
    onBack(){
        this.helper.navigate('/admin/payment/interfacecfglist',this.i18n.fanyi('interfaceConfig.listPage.tableCols.html.titlelist'),{});
    }



    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.addInterfacConfigForm.controls[name];
    }

}




