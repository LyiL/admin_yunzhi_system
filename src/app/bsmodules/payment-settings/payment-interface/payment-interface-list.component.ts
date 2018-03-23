import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {PaymentInterfaceService} from '../../../common/services/request/payment-settings/payment-interface.service';
import {PaymentInterfaceForm} from '../../../common/form/payment-settings/payment-interface.form';
import {ModalHelper} from '@delon/theme';
import {PaymentInterfaceWinComponent} from './payment-interface-win.component';
import {newClone} from '@delon/abc/utils/utils';
import {CommonService} from '../../../common/services/request/common.service';

/**
 * 支付接口列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'payment-interface-list',
    templateUrl: './payment-interface-list.component.html',
    providers:[PaymentInterfaceService]
})
export class PaymentInterfaceListComponent{
    public paymentInterfaceListForm: PaymentInterfaceForm = new PaymentInterfaceForm();
    public apiTypes:Array<any> = []; // 类型

    /**
     * 所属机构控件配置
     */
    public bankNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.title'),
        url:CommonService.ORGNO_URL,
        params:{status:1},
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('PaymentInterface.listPage.bankNoCfg.name'),
            index:'name'
        }]
    };

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalHelper:ModalHelper,
    ) {
        this.apiTypes = this.helper.getDictByKey('PAYMENT_TRADE_API_TYPE'); // 获取类型
    }

    @ViewChild('paymentInterfaceListTable') public paymentInterfaceListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:PaymentInterfaceService.PAYMENT_INTERFACE_LIST_URL,
        params:this.paymentInterfaceListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 编号
                title:this.i18n.fanyi('PaymentInterface.listPage.tableCols.id'),
                index:'id'
            },
            {
                // 支付接口名称
                title:this.i18n.fanyi('PaymentInterface.listPage.search.transType'),
                index:'transType'
            },
            {
                // 代码
                title:this.i18n.fanyi('PaymentInterface.listPage.search.transId'),
                index:'transId'
            },
            {
                // 类型
                title:this.i18n.fanyi('PaymentInterface.listPage.search.apiType'),
                render:'apiTypeRender'
            },
            {
                // 所属机构
                title:this.i18n.fanyi('PaymentInterface.listPage.tableCols.bankName'),
                render:'bankNameRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: (() => {
                            if (this.helper.btnRole('APMIFEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onEditPaymentInterface.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.paymentInterfaceListTable.doSearch();
    }

    /**
     * 新增支付接口
     */
    public onNewPaymentInterface(){
        let subscription = this.modalHelper.static(PaymentInterfaceWinComponent,{},600,{title: this.i18n.fanyi('PaymentInterface.win.newTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.paymentInterfaceListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 编辑支付接口
     */
    public onEditPaymentInterface(row:any){
        let subscription = this.modalHelper.static(PaymentInterfaceWinComponent,{
            model:newClone(row)
        },600,{title: this.i18n.fanyi('PaymentInterface.win.editTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.paymentInterfaceListTable.doSearch(false); //刷新表格
            }
        })
    }
}
