
import {AcceptingInstitutionListDbService} from '../../../../common/services/request/center-manage/accepting-institution.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {Component, OnInit, ViewChild} from '@angular/core';
import {accountCfgForm} from '../../../../common/form/center-manage/account-cfg.form';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {HelperService} from '../../../../common/services/helper.service';
import {Router} from '@angular/router';
import {MenuService, ModalHelper} from '@delon/theme';
import {SimpleTableComponent} from '@delon/abc';
import {accountCfgWinComponent} from './account-cfg-win.component';
/**
 * create by hsz 2018-2-28
 * 受理机构对账单配置列表页面
 */
@Component({
    selector: 'account-cfg',
    templateUrl: './account-cfg-list.component.html',
    providers: [CommonEnum,AcceptingInstitutionListDbService]
})
export class accountCfgListComponent implements OnInit {
    public form: accountCfgForm = new accountCfgForm();
    /**
     * 结算方
     */
    public billType:Array<any> = [];
    /**
     * 对账配置列表控件配置
     */
    @ViewChild('billCfgListTable') public billCfgListTable:SimpleTableComponent;
    public tableCfg:any = {
        url:AcceptingInstitutionListDbService.BILL_LIST_URL,
        params:this.form,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('CenterManger.billCfg.listPage.companion'),
                index:'companion',
            },{
                title:this.i18n.fanyi('CenterManger.billCfg.listPage.billType'),
                render:'billTypeRender',
            },{
                title:this.i18n.fanyi('CenterManger.billCfg.listPage.downClass'),
                render:"downClassRender"
            },{
                title:this.i18n.fanyi('CenterManger.billCfg.listPage.classParams'),
                render:"classParamsRender",
            },{
                title:this.i18n.fanyi('CenterManger.billCfg.listPage.parseClass'),
                render:"parseClassRender",
            },{
                title:this.i18n.fanyi('CenterManger.billCfg.listPage.downTime'),
                render:'downTimeRender',
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: ((row) => {
                            if(!this.helper.btnRole('AAREDIT')){
                                return true;
                            }
                        }),
                        click: this.onEdit.bind(this),
                    },{
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide: ((row) => {
                            if(!this.helper.btnRole('AARDEL')){
                                return true;
                            }
                        }),
                        click: this.onDel.bind(this),
                    }
                ]
            }
        ]
    };
    constructor(
        public helper:HelperService,public i18n:I18NService,  public msg: NzMessageService,public AIDb:AcceptingInstitutionListDbService,
        public modal:ModalHelper,protected modalService: NzModalService,public menuService: MenuService, public router: Router,
    ){}
    ngOnInit(){
        this.billType = this.helper.getDictByKey('CHECK_TYPE');
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if (menu && menu['params']) { // 判断路由是否有传参
            let params = menu['params'];
            this.form['bankNo'] = params['orgNo'] || params['bankNo'] ; //从父级跳转以及子级跳转传递字段名不一致
            this.tableCfg.params = this.form;
        }
    }

    onSearch(){
        this.billCfgListTable.doSearch();
    }
    /**
     * 新增
     * @param row
     */
    onAdd(){
        let win = this.modal.static(accountCfgWinComponent,{
            _bankNo:this.form.bankNo
        },600,{title: this.i18n.fanyi('CenterManger.billCfg.addTitle')});
        win.subscribe(res => {
            if(res && res == 'onOk'){
                this.billCfgListTable.doSearch(false); //刷新表格
            }
        })
    }
    /**
     * 编辑
     * @param row
     */
    onEdit(row:any){
        let win = this.modal.static(accountCfgWinComponent,
            {id:row['id']}
            ,600,{title: this.i18n.fanyi('CenterManger.billCfg.editTitle')});
        win.subscribe(res => {
            if(res && res == 'onOk'){
                this.billCfgListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 删除
     * @param row
     */
    onDel(row:any){
        this.modalService.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('CenterManger.tips.billDel1',row["companion"]),
            okText: this.i18n.fanyi('Modal.okText'),
            maskClosable:false,
            width:"500px",
            onOk: () => {
                this.AIDb.billDelete(
                    {id:row["id"]}
                ).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                    } else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.billCfgListTable.doSearch(false);
                })
            }
        });
    }
}
