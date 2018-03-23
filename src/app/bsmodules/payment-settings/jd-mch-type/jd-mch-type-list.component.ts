import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {JDMchTypeForm} from '../../../common/form/payment-settings/jd-mch-type.form';
import {JDMchTypeService} from '../../../common/services/request/payment-settings/jd-mch-type.service';
import {JDMchTypeWinComponent} from './jd-mch-type-win.component';
import {ModalHelper} from '@delon/theme';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

/**
 * 京东商户类型列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'jd-mch-type-list',
    templateUrl: './jd-mch-type-list.component.html',
    providers:[JDMchTypeService]
})
export class JDMchTypeListComponent{
    public jdMchTypeListForm: JDMchTypeForm = new JDMchTypeForm();

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public jdMchTypeService:JDMchTypeService,
        public _msg: NzMessageService
    ) {}

    @ViewChild('jdMchTypeListTable') public jdMchTypeListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:JDMchTypeService.JD_MCH_TYPE_LIST_URL,
        params:this.jdMchTypeListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 类型名称
                title:this.i18n.fanyi('JDMchType.listPage.search.typeName'),
                index:'typeName'
            },
            {
                // 类型编号
                title:this.i18n.fanyi('JDMchType.listPage.search.typeNo'),
                index:'typeNo'
            },
            {
                // 关联商户行业类别编号
                title:this.i18n.fanyi('JDMchType.listPage.search.categoryNo'),
                render:'categoryNoRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AJDMCHEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onEditJDMchType.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AJDMCHDEL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onDeleteJDMchType.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.jdMchTypeListTable.doSearch();
    }

    /**
     * 新增京东商户类型
     */
    public onNewJDMchType(){
        let subscription = this.modalHelper.static(JDMchTypeWinComponent,{},600,{title: this.i18n.fanyi('JDMchType.win.newTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.jdMchTypeListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 编辑京东商户类型
     */
    public onEditJDMchType(row:any){
        let subscription = this.modalHelper.static(JDMchTypeWinComponent,{
            id:row['id']
        },600,{title: this.i18n.fanyi('JDMchType.win.editTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.jdMchTypeListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 删除京东商户类型
     */
    public onDeleteJDMchType(row:any){
        let subscription = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('JDMchType.win.delConfirm'),
            maskClosable:false
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this.jdMchTypeService.delete({id: row['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        this.jdMchTypeListTable.doSearch(false);
                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }
}
