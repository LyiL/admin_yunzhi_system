import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {MchTypeService} from '../../../common/services/request/payment-settings/mch-type.service';
import {MchTypeForm} from '../../../common/form/payment-settings/mch-type.form';
import {ModalHelper} from '@delon/theme';
import {MchTypeWinComponent} from './mch-type-win.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

/**
 * 商户类型列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'mch-type-list',
    templateUrl: './mch-type-list.component.html',
    providers:[MchTypeService]
})
export class MchTypeListComponent{
    public mchTypeListForm: MchTypeForm = new MchTypeForm();

    /**
     * 父级类型控件配置
     */
    public parentCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('mchType.listPage.parentCfg.title'),
        url:MchTypeService.MCH_TYPE_LIST_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field:'name',
                label:this.i18n.fanyi('mchType.listPage.parentCfg.name')
            },
            {
                field:'categoryNo',
                label:this.i18n.fanyi('mchType.listPage.parentCfg.categoryNo')
            }
        ],
        tableColumns:[
            {
                title:this.i18n.fanyi('mchType.listPage.parentCfg.name'),
                index:'name'
            },
            {
                title:this.i18n.fanyi('mchType.listPage.parentCfg.categoryNo'),
                index:'categoryNo'
            }
        ]
    };

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public mchTypeService:MchTypeService,
        public _msg: NzMessageService
    ) {}

    @ViewChild('mchTypeListTable') public mchTypeListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:MchTypeService.MCH_TYPE_LIST_URL,
        params:this.mchTypeListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 类型名称
                title:this.i18n.fanyi('mchType.listPage.search.typeName'),
                index:'name'
            },
            {
                // 类型编号
                title:this.i18n.fanyi('mchType.listPage.search.typeNo'),
                index:'categoryNo'
            },
            {
                // 支付宝类型编号
                title:this.i18n.fanyi('mchType.listPage.tableCols.alipayTypeno'),
                render:'alipayTypenoRender'
            },
            {
                // 微信类型编号
                title:this.i18n.fanyi('mchType.listPage.tableCols.wxTypeno'),
                render:'wxTypenoRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AMTEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onEditMchType.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AMTDEL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onDeleteMchType.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 父级类型选中事件
     */
    public onSelectParent(value){
        this.mchTypeListForm.parent = value['categoryNo'];
    }

    /**
     * 列表页查询
     */
    public onSearch(){
        this.mchTypeListTable.doSearch();
    }

    /**
     * 新增商户类型
     */
    public onNewMchType(){
        let subscription = this.modalHelper.static(MchTypeWinComponent,{},600,{title: this.i18n.fanyi('mchType.win.newTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.mchTypeListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 编辑商户类型
     */
    public onEditMchType(row:any){
        let subscription = this.modalHelper.static(MchTypeWinComponent,{
            id:row['id']
        },600,{title: this.i18n.fanyi('mchType.win.editTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.mchTypeListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 删除商户类型
     */
    public onDeleteMchType(row:any){
        let subscription = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('mchType.win.delConfirm'),
            maskClosable:false
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this.mchTypeService.delete({id: row['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        this.mchTypeListTable.doSearch(false);
                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }
}
