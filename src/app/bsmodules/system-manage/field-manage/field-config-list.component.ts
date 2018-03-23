import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {CommonEnum} from "../../../common/enum/common.enum";
import {FieldForm} from "../../../common/form/system-manage/field.form";
import {FieldService} from "app/common/services/request/system-manage/field.service";
import {MenuService, ModalHelper} from "@delon/theme";
import {newClone} from "@delon/abc/utils/utils";
import {FieldEditWinComponent} from "./win/field-edit-win.component";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

/**
 * Created by cty on 2018/3/1.
 * 领域管理配置列表
 */
@Component({
    selector:'field-config-list',
    templateUrl:'./field-config-list.component.html',
    providers: [CommonService, FieldService]
})
export class FieldConfigListComponent implements OnInit{

    @ViewChild('fieldCfgListTable') fieldCfgListTable: SimpleTableComponent;
    public fieldForm: FieldForm = new FieldForm();

    public _confType: Observable<any>;      // 类型
    public _display: any;                   // 添加领域配置是否隐藏
    public _domainId: any;                        // 保存领域管理传进来的编号(id)
    public _confCodeFlag: boolean;          // 新增的话，配置项编码为true

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modal: ModalHelper,
                protected nzModal: NzModalService,
                public FieldDB: FieldService,
                public msg: NzMessageService,
                public menuService: MenuService,
                public router: Router
    ){
        this._confType = Observable.of(this.helper.getDictByKey('DOMAIN_CFG_TYPE')); // 获取类型
    }
    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let _params = menu['params'];

            if(_params['id'] != 0) {
                // 编辑按钮进入的领域配置管理

                this._domainId = _params['id'];   // 领域管理编辑传进来的id

                this.fieldForm['domainId'] = _params['id']; // 表格需要的domainId

                this._display = true;   // 添加领域配置编辑进来就隐藏

                this._confCodeFlag = false; // domainId为0的话，不管新增编辑配置项编码只读

            }else if(_params['id'] == 0){
                // 表单按钮进入的领域配置管理

                this._domainId = _params['id'];   // 领域管理不是编辑进来的话默认为0
                this.fieldForm['domainId'] = _params['id'];
                this._display = false;
                this._confCodeFlag = true;
            }
        }
    }


    /**
     * 表格配置
     * @type {{url: string; params: FieldForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); buttons: [{text: (string | any); click: ((row: any) => any)} , {text: (string | any)}]}]}}
     */
    public tableCfg:any = {
        url:FieldService.FIELD_CFG_LIST_URL,
        params: this.fieldForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                // 配置名称
                title:this.i18n.fanyi('fieldConfig.listPage.tableCols.confName'),
                index:'confName'
            },{
                // 配置编码
                title:this.i18n.fanyi('fieldConfig.listPage.tableCols.confCode'),
                index:'confCode'
            },{
                // 配置类型
                title:this.i18n.fanyi('fieldConfig.listPage.tableCols.confType'),
                index:'confType'
            },{
                // 配置值
                title:this.i18n.fanyi('fieldConfig.listPage.tableCols.confContent'),
                render:'confContentRender'
            },{
                // 配置描述
                title:this.i18n.fanyi('fieldConfig.listPage.tableCols.confDescript'),
                index:'confDescript'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('AFCFGEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('AFCFGDEL')){
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
     * 查询
     */
    onSearch() {
        this.fieldCfgListTable.doSearch(true);
    }

    /**
     * 新增
     */
    onAdd() {
        this.helper.navigate('/admin/system/fieldconfigedit', this.i18n.fanyi('fieldConfig.addFieldConfig.addTitle'), {domainId: this.fieldForm['domainId']})
    }

    /**
     * 编辑
     */
    onEdit(row: any) {
        this.helper.navigate('/admin/system/fieldconfigedit', this.i18n.fanyi('fieldConfig.addFieldConfig.editTitle'), {id: row['id'], domainId: this.fieldForm['domainId'], confCodeFlag: this._confCodeFlag});
    }

    /**
     * 删除
     */
    onDel(row: any) {
        const _confirm = this.nzModal.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('fieldConfig.listPage.tableCols.delInfo', row['confName']),
            maskClosable: false,
            width: '500px'
        })

        _confirm.subscribe(res => {
            if(res && res == 'onOk') {
                this.FieldDB.configDel({id: row['id'], domainId: this._domainId}).subscribe(_res => {
                    if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        _confirm.destroy();
                    }else {
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.fieldCfgListTable.doSearch(true);
                })
            }
        })
    }

}
