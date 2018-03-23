import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {BankConfigService} from '../../../common/services/request/payment-settings/bank-config.service';
import {BankConfigForm} from '../../../common/form/payment-settings/bank-config.form';
import {ModalHelper} from '@delon/theme';
import {BankConfigWinComponent} from './bank-config-win.component';
import {newClone} from '@delon/abc/utils/utils';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

/**
 * 银行配置列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'bank-config-list',
    templateUrl: './bank-config-list.component.html',
    providers:[BankConfigService]
})
export class BankConfigListComponent{
    public bankConfigListForm: BankConfigForm = new BankConfigForm();

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public bankConfigService:BankConfigService,
        public _msg: NzMessageService
    ) {}

    @ViewChild('bankConfigListTable') public bankConfigListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:BankConfigService.BANK_CONFIG_LIST_URL,
        params:this.bankConfigListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 银行名称
                title:this.i18n.fanyi('BankConfig.listPage.search.name'),
                index:'name'
            },
            {
                // 服务电话
                title:this.i18n.fanyi('BankConfig.listPage.tableCols.bankDigitalCode'),
                index:'bankDigitalCode'
            },
            {
                // 英文缩写
                title:this.i18n.fanyi('BankConfig.listPage.search.bankEnCode'),
                index:'bankEnCode'
            },
            {
                // 备注
                title:this.i18n.fanyi('BankConfig.listPage.tableCols.descript'),
                render:'descriptRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('ABCFGEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onEditBankConfig.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('ABCFGDEL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onDeleteBankConfig.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.bankConfigListTable.doSearch();
    }

    /**
     * 新增银行配置
     */
    public onNewBankConfig(){
        let subscription = this.modalHelper.static(BankConfigWinComponent,{},600,{title: this.i18n.fanyi('BankConfig.win.newTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.bankConfigListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 编辑银行配置
     */
    public onEditBankConfig(row:any){
        let subscription = this.modalHelper.static(BankConfigWinComponent,{
            model:newClone(row)
        },600,{title: this.i18n.fanyi('BankConfig.win.editTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.bankConfigListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 删除银行配置
     */
    public onDeleteBankConfig(row:any){
        let subscription = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('BankConfig.win.delConfirm',row['name']),
            maskClosable:false
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this.bankConfigService.delete({id: row['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        this.bankConfigListTable.doSearch(false);
                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }
}
