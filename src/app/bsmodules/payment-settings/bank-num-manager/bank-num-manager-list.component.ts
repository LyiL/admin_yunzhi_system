import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {InterfaceConfigService} from "../../../common/services/request/payment-settings/interface-config.service";
import {BankNumManageForm} from "../../../common/form/payment-settings/bank-num-manage.form";
import {BankNumManageServic} from "../../../common/services/request/payment-settings/bank-num-manage.servic";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {AddBankNumManageComponent} from "./add-bank-num-manage/add-bank-num-manage.component";


/**
 * 联号管理列表页
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'bank-num-manager-list',
    templateUrl: './bank-num-manager-list.component.html',
    providers:[BankNumManageServic]
})
export class BankNumManagerListComponent{
    public bankNumManageForm: BankNumManageForm = new BankNumManageForm();  //实列BankNumManageForm


    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalService: NzModalService,
        public _msg: NzMessageService,
    ) {
    }

    @ViewChild('bankNumManageTable') public bankNumManageTable: SimpleTableComponent; //获取列表table

    /**
     * 列表配置
     * @type {{url: string; params: BankNumManageForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); buttons: [{text: (string | any); hide: any; click: any}]}]}}
     */
    public tableCfg:any = {
        url:BankNumManageServic.BANKNUM_LIST_URL,
        params:this.bankNumManageForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                title:this.i18n.fanyi('bankNumManage.listPage.tableCols.identification'),   //银行卡号标识
                index:'cardBin'
            },
            {
                title:this.i18n.fanyi('bankNumManage.listPage.tableCols.bankNumberlength'),  //卡号长度
                index:'cardLeg'
            },
            {
                title:this.i18n.fanyi('bankNumManage.listPage.tableCols.bankCode'),  //银行编号
                index:'orgBankno'
            },
            {
                title:this.i18n.fanyi('bankNumManage.listPage.tableCols.bankName'),  //银行简称
                index:'smallName'
            },
            {
                title:this.i18n.fanyi('bankNumManage.listPage.tableCols.bankallName'),  //银行全称
                index:'fullName'
            },
            {
                title:this.i18n.fanyi('bankNumManage.listPage.tableCols.bankNumber'),  //银联号
                index:'bankLinkno'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: (() => {
                            if (this.helper.btnRole('AUBEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.bankNumManageTable.doSearch();
    }

    /**
     * 新增
     */
    public onNew(){
        const newWin = this.modalService.open({
            title:this.i18n.fanyi('bankNumManage.addNew.title'),
            content:AddBankNumManageComponent,
            footer:false,
            maskClosable:false,
            width:600
        });
        newWin.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('bankNumManage.alert.opsuc'));
                this.bankNumManageTable.doSearch();
            }
        })
    }

    /**
     * 编辑详情
     */
    onEdit(row:any){
        const editWin = this.modalService.open({
            title:this.i18n.fanyi('bankNumManage.listPage.tableCols.edit'),
            content:AddBankNumManageComponent,
            footer:false,
            maskClosable:false,
            width:600,
            componentParams: {
                id: row['id'],
            }
        });
        editWin.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('bankNumManage.alert.opsuc'));
                this.bankNumManageTable.doSearch();
            }
        })
    }
}
