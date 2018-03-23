import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {QQMchTypeService} from '../../../common/services/request/payment-settings/qq-mch-type.service';
import {QQMchTypeForm} from '../../../common/form/payment-settings/qq-mch-type.form';
import {ModalHelper} from '@delon/theme';
import {QQMchTypeWinComponent} from './qq-mch-type-win.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

/**
 * QQ商户类型列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'qq-mch-type-list',
    templateUrl: './qq-mch-type-list.component.html',
    providers:[QQMchTypeService]
})
export class QQMchTypeListComponent{
    public qqMchTypeListForm: QQMchTypeForm = new QQMchTypeForm();

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public qqMchTypeService:QQMchTypeService,
        public _msg: NzMessageService
    ) {}

    @ViewChild('qqMchTypeListTable') public qqMchTypeListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:QQMchTypeService.QQ_MCH_TYPE_LIST_URL,
        params:this.qqMchTypeListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                title:this.i18n.fanyi('QQMchType.listPage.search.typeName'),
                index:'typeName'
            },
            {
                title:this.i18n.fanyi('QQMchType.listPage.search.typeNo'),
                index:'typeNo'
            },
            {
                title:this.i18n.fanyi('QQMchType.listPage.search.categoryNo'),
                render:'categoryNoRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AQQMCHEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onEditQQMchType.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AQQMCHDEL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onDeleteQQMchType.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.qqMchTypeListTable.doSearch();
    }

    /**
     * 新增QQ商户类型
     */
    public onNewQQMchType(){
        let subscription = this.modalHelper.static(QQMchTypeWinComponent,{},600,{title: this.i18n.fanyi('QQMchType.win.newTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.qqMchTypeListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 编辑QQ商户类型
     */
    public onEditQQMchType(row:any){
        let subscription = this.modalHelper.static(QQMchTypeWinComponent,{
            id:row['id']
        },600,{title: this.i18n.fanyi('QQMchType.win.editTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.qqMchTypeListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 删除QQ商户类型
     */
    public onDeleteQQMchType(row:any){
        let subscription = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('QQMchType.win.delConfirm'),
            maskClosable:false
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this.qqMchTypeService.delete({id: row['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        this.qqMchTypeListTable.doSearch(false);
                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }
}
