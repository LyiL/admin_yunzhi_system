import {Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {ReuseTabService, SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {InterfaceConfigForm} from "../../../common/form/payment-settings/interface-config.form";
import {InterfaceConfigService} from "../../../common/services/request/payment-settings/interface-config.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";




/**
 * 接口配置列表页
 *  Created by zll on 2018/3/1
 */
@Component({
    selector: 'interface-config',
    templateUrl: './interface-config.component.html',
    providers:[InterfaceConfigService]
})
export class InterfaceConfigComponent implements OnInit{
    public interfaceConfigForm: InterfaceConfigForm = new InterfaceConfigForm();

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

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalService: NzModalService,
        public _msg: NzMessageService,
        public interfaceConfigService:InterfaceConfigService,
        public reuseTabService:ReuseTabService
    ) {
    }

    @ViewChild('interfaceConfigTable') public interfaceConfigTable: SimpleTableComponent;  //获取列表table

    /**
     * 列表配置
     * @type {{url: string; params: InterfaceConfigForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); index: string; type: string; dateFormat: string} , {title: (string | any); buttons: [{text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: any}]}]}}
     */
    public tableCfg:any = {
       url:InterfaceConfigService.ITERFACE_LIST_URL,
        params:this.interfaceConfigForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                title:this.i18n.fanyi('interfaceConfig.listPage.tableCols.apiCode'),   //接口编号
                index:'code'
            },
            {
                title:this.i18n.fanyi('interfaceConfig.listPage.tableCols.apiName'),  //接口名称
                render:'nameRender'
            },
            {
                title:this.i18n.fanyi('interfaceConfig.listPage.tableCols.partner'),  //商户号
                render:'allyRender'
            },
            {
                title:this.i18n.fanyi('interfaceConfig.listPage.tableCols.subPartner'),  //子商户号
                render:'subAllyRender'
            },
            {
                title:this.i18n.fanyi('interfaceConfig.listPage.tableCols.tradeChan'),  //支付通道
                render:'tradeChannelRender'
            },
            {
                title:this.i18n.fanyi('interfaceConfig.listPage.tableCols.createdAt'),  //创建时间
                index:'createTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss',
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: (() => {
                            if (this.helper.btnRole('AIEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide: (() => {
                            if (this.helper.btnRole('AIDEL')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onDel.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(search:boolean = true){
        this.interfaceConfigTable.doSearch(search);
    }

    /**
     * 新增
     */
    public onNew(){
        this.helper.navigate('/admin/payment/additerfaceconfig',this.i18n.fanyi('interfaceConfig.listPage.tableCols.html.title'),{});
    }

    /**
     * 编辑
     */
    public onEdit(row:any){
        this.helper.navigate('/admin/payment/additerfaceconfig',this.i18n.fanyi('interfaceConfig.listPage.tableCols.html.editTitle'),{code: row['code']});
    }


    /**
     * 删除
     */
    onDel(row:any){
        let _confirm= this.modalService.confirm({
            title:this.i18n.fanyi('interfaceConfig.listPage.alert.prompt'),
            content:this.i18n.fanyi('interfaceConfig.listPage.alert.qusupdate',row['code']),
        });
        _confirm.subscribe(result => {
            if(result && result == 'onOk'){
                this.interfaceConfigService.delIngerfaceConfig({code:row['code']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('interfaceConfig.listPage.alert.opsuc'));
                        this.interfaceConfigTable.doSearch();
                    }else {
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }

                })
            }
        })
    }



    /**
     * 编辑返回刷新数据
     */
    ngOnInit(){
        this.reuseTabService.change.subscribe((res)=>{
            if(res&&res['active']=='refresh'&& res['pageName']=='payment/interfacecfglist'){
                this.onSearch(false);
            }
        })
    }
}
