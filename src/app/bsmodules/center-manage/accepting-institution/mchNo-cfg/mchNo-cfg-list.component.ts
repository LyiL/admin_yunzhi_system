import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MenuService, ModalHelper} from '@delon/theme';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {mchNoCfgForm} from '../../../../common/form/center-manage/mchNo-cfg.form';
import {AcceptingInstitutionListDbService} from '../../../../common/services/request/center-manage/accepting-institution.service';
import {SimpleTableComponent} from '@delon/abc';
import {Router} from '@angular/router';
/**
 * create by hsz 2018-2-28
 * 受理机构商户号配置列表页面
 */
@Component({
    selector: 'mchNo-cfg',
    templateUrl: './mchNo-cfg-list.component.html',
    providers: [CommonEnum,AcceptingInstitutionListDbService]
})
export class mchNoCfgListComponent implements OnInit {
    public form: mchNoCfgForm = new mchNoCfgForm();
    /**
     * 受理机构列表控件配置
     */
    @ViewChild('mchNocfgListTable') public mchNocfgListTable: SimpleTableComponent;
    public tableCfg: any = {
        url: AcceptingInstitutionListDbService.MCHCFG_LIST_URL,
        params: {},
        isAjax: true,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                title: this.i18n.fanyi('CenterManger.mchCfg.listPage.companion'),
                index: 'companion',

            }, {
                title: this.i18n.fanyi('CenterManger.mchCfg.listPage.companionName'),
                index: 'companionName',

            }, {
                title: this.i18n.fanyi('CenterManger.mchCfg.listPage.payAccountName'),
                // index:'payAccountName',
                render: "payAccountNameRender",

            }, {
                title: this.i18n.fanyi('CenterManger.mchCfg.listPage.payAccountCardno'),
                // index:'payAccountCardno',
                render: "payAccountCardnoRender",

            }, {
                title: this.i18n.fanyi('CenterManger.mchCfg.listPage.exportClass'),
                // index:'exportClass',
                render: "exportClassRender",

            }, {
                title: this.i18n.fanyi('CenterManger.mchCfg.listPage.createTime'),
                index: 'createTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss'
            },
            {
                title: this.i18n.fanyi('default.tableCol.action'),
                buttons: [{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('AAMEDIT')){
                            return true;
                        }
                    }),
                    click: this.onEdit.bind(this),
                }, {
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('AAMDEL')){
                            return true;
                        }
                    }),
                    click: this.onDel.bind(this),
                }
                ]
            }
        ]
    };


    constructor(public helper: HelperService, public i18n: I18NService, public msg: NzMessageService,public modalService: NzModalService,
                public AIDb:AcceptingInstitutionListDbService,
                public modal: ModalHelper, public menuService: MenuService, public router: Router,) {
    }

    ngOnInit() {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if (menu && menu['params']) {// 判断路由是否有传参
            let params = menu['params'];
            this.form['bankNo'] = params['orgNo'] || params['bankNo'] ; //从父级跳转以及子级跳转传递字段名不一致
            this.tableCfg.params = this.form;
        }
    }
        /**
         * 查询
         */
        onSearch()
        {
            this.mchNocfgListTable.doSearch();
        }
        /**
         * 添加商户号配置
         */
        onAdd()
        {
            this.helper.navigate('/admin/center/mchNocfgAdd', this.i18n.fanyi('CenterManger.mchCfg.addTitle'), {bankNo:this.form.bankNo});
        }
        /**
         * 编辑商户号配置
         */
        onEdit(row:any)
        {
            this.helper.navigate('/admin/center/mchNocfgAdd', this.i18n.fanyi('CenterManger.mchCfg.editTitle'), {id:row["id"]});

        }
        /**
         * 删除
         */
        onDel(row:any){
            this.modalService.confirm({
                title: this.i18n.fanyi('default.hint.hintInfo'),
                content: this.i18n.fanyi('CenterManger.tips.mchDel1',row["companionName"]),
                okText: this.i18n.fanyi('Modal.okText'),
                maskClosable:false,
                width:"500px",
                onOk: () => {
                    this.AIDb.mchDelete(
                        {id:row["id"]}
                    ).subscribe(res => {
                        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                            this.msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        } else {
                            this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                        }
                        this.mchNocfgListTable.doSearch(false);
                    })
                }
            });
        }

}
