import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {SimpleTableComponent} from '@delon/abc';
import {IpWhiteListForm} from "../../../common/form/payment-settings/ip-white-list.form";
import {IpWhiteListService} from "../../../common/services/request/payment-settings/ip-white-list.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {AddIpWhiteListComponent} from "./add-white-list/add-ip-white-list.component";


/**
 * IP白名单列表页
 *  Created by zll on 2018/3/1
 */
@Component({
    selector: 'ip-white-list',
    templateUrl: 'ip-white-list.component.html',
    providers:[IpWhiteListService]
})
export class IpWhiteListComponent{
    public ipWhiteListForm: IpWhiteListForm = new IpWhiteListForm();  //实列IpWhiteListForm


    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalService: NzModalService,
        public _msg: NzMessageService,
        public ipWhiteListService:IpWhiteListService
    ) {
    }

    @ViewChild('ipWhiteListTable') public ipWhiteListTable: SimpleTableComponent;  //获取列表table

    /**
     * 列表配置
     * @type {{url: string; params: IpWhiteListForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; type: string; dateFormat: string} , {title: (string | any); buttons: [{text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: any}]}]}}
     */
    public tableCfg:any = {
        url:IpWhiteListService.IP_WHITE_LIST_URL,
        params:this.ipWhiteListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                title:this.i18n.fanyi('ipWhiteList.listPage.tableCols.policyNo'),   //编号
                index:'policyNo'
            },
            {
                title:this.i18n.fanyi('ipWhiteList.listPage.tableCols.policyName'),  //名称
                index:'policyName'
            },
            {
                title:this.i18n.fanyi('ipWhiteList.listPage.tableCols.ips'),  //ip
                index:'ips'
            },
            {
                title:this.i18n.fanyi('ipWhiteList.listPage.tableCols.updateAt'),  //更新日期
                index:'updateAt',
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
                            if (this.helper.btnRole('IPWHITELISTEDIT')) {
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
                            if (this.helper.btnRole('IPWHITELISTDEL')) {
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
    public onSearch(){
        this.ipWhiteListTable.doSearch();
    }

    /**
     * 新增
     */
    public onNew(){
        const newWin = this.modalService.open({
            title:this.i18n.fanyi('ipWhiteList.addnew.title'),
            content:AddIpWhiteListComponent,
            footer:false,
            maskClosable:false,
            width:600
        });
        newWin.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('bankNumManage.alert.opsuc'));
                this.ipWhiteListTable.doSearch();
            }
        })
    }


    /**
     * 编辑
     */
    public onEdit(row:any){
        const newWin = this.modalService.open({
            title:this.i18n.fanyi('ipWhiteList.addnew.edit'),
            content:AddIpWhiteListComponent,
            footer:false,
            maskClosable:false,
            width:600,
            componentParams: {
                policyNo: row['policyNo'],
            }
        });
        newWin.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('bankNumManage.alert.opsuc'));
                this.ipWhiteListTable.doSearch();
            }
        })
    }



    /**
     * 删除
     */
    onDel(row:any){
        let _confirm= this.modalService.confirm({
            title:this.i18n.fanyi('interfaceConfig.listPage.alert.prompt'),
            content:this.i18n.fanyi('ipWhiteList.alert.del'),
        });
        _confirm.subscribe(result => {
            if(result && result == 'onOk'){
                this.ipWhiteListService.delIpWhiteList({id:row['policyNo']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('interfaceConfig.listPage.alert.opsuc'));
                        this.ipWhiteListTable.doSearch();
                    }else {
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }

                })
            }
        })
    }
}
