import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {CommonEnum} from "../../../common/enum/common.enum";
import {FieldForm} from "../../../common/form/system-manage/field.form";
import {FieldService} from "app/common/services/request/system-manage/field.service";
import {ModalHelper} from "@delon/theme";
import {newClone} from "@delon/abc/utils/utils";
import {FieldEditWinComponent} from "./win/field-edit-win.component";

/**
 * Created by cty on 2018/3/1.
 * 领域管理列表页
 */
@Component({
    selector:'field-list',
    templateUrl:'./field-list.component.html',
    providers: [CommonService, FieldService]
})
export class FieldListComponent implements OnInit{

    @ViewChild('fieldListTable') fieldListTable: SimpleTableComponent;
    public fieldForm: FieldForm = new FieldForm();

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modal: ModalHelper,
                protected nzModal: NzModalService,
                public FieldDB: FieldService,
                public msg:NzMessageService,
    ){

    }
    ngOnInit(){}

    /**
     * 受理机构配置
     * @type {{title: (string | any); url: string; isAjax: boolean; reqReName: {pi: string; ps: string}; resReName: {list: string; total: string; pi: string; ps: string}; searchFields: [{field: string; label: (string | any)} , {field: string; label: (string | any)}]; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string}]}}
     */
    public bankCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('config.bank.title'),
        url:CommonService.ORGNO_URL,
        params:{status: 1},
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('config.bank.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('config.bank.orgName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('config.bank.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('config.bank.orgName'),
            index:'name',
        }]
    };


    /**
     * 表格配置
     * @type {{url: string; params: FieldForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); buttons: [{text: (string | any); click: ((row: any) => any)} , {text: (string | any)}]}]}}
     */
    public tableCfg:any = {
        url:FieldService.FIELD_LIST_URL,
        params: this.fieldForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                // 编号
                title:this.i18n.fanyi('fieldManage.listPage.tableCols.id'),
                index:'id'
            },{
                // 领域名称
                title:this.i18n.fanyi('fieldManage.listPage.tableCols.name'),
                index:'name'
            },{
                // 主域名
                title:this.i18n.fanyi('fieldManage.listPage.tableCols.hosts'),
                index:'hosts'
            },{
                // 受理机构
                title:this.i18n.fanyi('fieldManage.listPage.tableCols.bankName'),
                render:'bankNameRender'
            },{
                // 应用ID
                title:this.i18n.fanyi('fieldManage.listPage.tableCols.appId'),
                render:'appIdRender'
            },{
                // 使用状态
                title:this.i18n.fanyi('fieldManage.listPage.tableCols.state'),
                render:'stateRender'
            },{
                // 创建时间
                title:this.i18n.fanyi('fieldManage.listPage.tableCols.createdTime'),
                render:'createdTimeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑领域配置
                        text: this.i18n.fanyi('fieldManage.listPage.tableCols.editField'),
                        hide: ( () => {
                            if (this.helper.btnRole('AFCFGLIST')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((row: any) => {
                            this.helper.navigate('/admin/system/fieldconfiglist', this.i18n.fanyi('fieldConfig.listPage.title'), row);
                        })
                    },
                    {
                        // 编辑领域
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('AFEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onAddOrEdit.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 受理机构选中事件
     */
    bankSelected(val: any){
        this.fieldForm.bankNo = val.orgNo;
    }


    /**
     * 状态变更
     * @param row
     */
    public onStateClick(row: any){
        const confirm = this.nzModal.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('fieldManage.listPage.tableCols.switchState'),
            maskClosable: false,
        });

        confirm.subscribe(res=>{
            if(res && res == 'onOk'){
                let _isEnabled = row['isEnabled'] == true ? false : true;
                this.FieldDB.switchState({
                    id: row['id'],
                    isEnabled: _isEnabled }
                ).subscribe((_res)=>{
                    if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                        this.fieldListTable.doSearch();
                        confirm.destroy();
                    }else{
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }

    /**
     * 查询
     */
    onSearch() {
        this.fieldListTable.doSearch(true);
    }

    /**
     * 新增/编辑
     */
    onAddOrEdit(row: any) {
        let win;
        if(row && row['id']) {
            win = this.modal.static(FieldEditWinComponent, {model: newClone(row)}, 550, {title: this.i18n.fanyi('fieldManage.listPage.editFieldWin.editTitle')});
        }else {
            win = this.modal.static(FieldEditWinComponent, {}, 550, {title: this.i18n.fanyi('fieldManage.listPage.editFieldWin.addTitle')});
        }

        win.subscribe(res => {
            if(res && res == 'onOk') {
                this.fieldListTable.doSearch(false);
            }
        })
    }

    /**
     * 领域配置管理
     */
    onFieldAdmin() {
        this.helper.navigate('/admin/system/fieldconfiglist', this.i18n.fanyi('fieldConfig.listPage.title'), {isAdd: true, id: 0});
    }

}
