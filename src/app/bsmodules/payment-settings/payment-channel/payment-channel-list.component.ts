import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {PaymentChannelService} from '../../../common/services/request/payment-settings/payment-channel.service';
import {PaymentChannelForm} from '../../../common/form/payment-settings/payment-channel.form';
import {ModalHelper} from '@delon/theme';
import {PaymentChannelWinComponent} from './payment-channel-win.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

/**
 * 支付渠道列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'payment-channel-list',
    templateUrl: './payment-channel-list.component.html',
    providers:[PaymentChannelService]
})
export class PaymentChannelListComponent{
    public paymentChannelListForm: PaymentChannelForm = new PaymentChannelForm();

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public paymentChannelService:PaymentChannelService,
        public _msg: NzMessageService
    ) {}

    @ViewChild('paymentChannelListTable') public paymentChannelListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:PaymentChannelService.PAYMENT_CHANNEL_LIST_URL,
        params:this.paymentChannelListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 支付渠道名称
                title:this.i18n.fanyi('PaymentChannel.listPage.search.routeChannelName'),
                index:'routeChannelName'
            },
            {
                // 支付渠道编码
                title:this.i18n.fanyi('PaymentChannel.listPage.search.routeChannelCode'),
                index:'routeChannelCode'
            },
            {
                // 状态
                title:this.i18n.fanyi('PaymentChannel.listPage.tableCols.state'),
                render:'stateRender'
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.paymentChannelListTable.doSearch();
    }

    /**
     * 新增支付渠道
     */
    public onNewPaymentChannel(){
        let subscription = this.modalHelper.static(PaymentChannelWinComponent,{},600,{title: this.i18n.fanyi('PaymentChannel.win.newTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.paymentChannelListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 变更支付渠道状态
     */
    public onUpdateState(row:any){
        let _state:number,msgContent:string;
        // 当前状态为启用，发送0，提交成功提示已禁用;状态为禁用，发送1，提交成功提示已启用
        if(row['state'] === 1){
            _state = 0;
            msgContent = this.i18n.fanyi('PaymentChannel.win.unableSuccess');
        }else{
            _state = 1;
            msgContent = this.i18n.fanyi('PaymentChannel.win.ableSuccess');
        }
        let subscription = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('PaymentChannel.win.stateConfirm',row['routeChannelName'],this.helper.dictTrans('ENABLE_STATUS',_state)),
            maskClosable:false
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this.paymentChannelService.updateState({
                    id:row['id'],
                    state:_state
                }).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(msgContent);
                        this.paymentChannelListTable.doSearch(false);
                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }
}
