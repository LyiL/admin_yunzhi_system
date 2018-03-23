import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {payManageForm} from '../../../../common/form/center-manage/pay-manage.form';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {MenuService, ModalHelper} from '@delon/theme';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {SimpleTableComponent} from '@delon/abc';
import {AcceptingInstitutionListDbService} from '../../../../common/services/request/center-manage/accepting-institution.service';
import {Router} from '@angular/router';
import {categoryRefundWinComponent} from './category-refund-win.component';

/**
 * create by hsz 2018-3-1
 * 受理机构支付类型配置列表页面
 */
@Component({
    selector: 'pay-manage',
    templateUrl: './pay-manage-list.component.html',
    providers: [CommonEnum,AcceptingInstitutionListDbService]
})
export class payManageListComponent implements OnInit {
    public form:payManageForm = new payManageForm();
    /**
     * 结算方
     */
    public settleParty:Array<any> = [];
    /**
     * 支付管理列表控件配置
     */
    @ViewChild('payManageListTable') public payManageListTable:SimpleTableComponent;
    public tableCfg:any = {
        url:AcceptingInstitutionListDbService.PAYCENTER_LIST_URL,
        params:this.form,
        isAjax:true,
        isExpand:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('CenterManger.payManage.listPage.name'),
                index:'name',
            },{
                title:this.i18n.fanyi('CenterManger.payManage.listPage.settleParty'),
                // index:'settleParty',
                render:"settlePartyRender"

            },{
                title:this.i18n.fanyi('CenterManger.payManage.listPage.tradeType'),
                // index:'payAccountName',
                render:"tradeTypeRender"
            },{
                title:this.i18n.fanyi('CenterManger.payManage.listPage.settleType'),
                // index:'payAccountCardno',
                render:"settleTypeRender",

            },{
                title:this.i18n.fanyi('CenterManger.payManage.listPage.settleRate'),
                // index:'exportClass',
                index:"settleRate",

            },{
                title:this.i18n.fanyi('CenterManger.payManage.listPage.chaProfitType'),
                render:'chaProfitTypeRender',

            },{
                title:this.i18n.fanyi('CenterManger.payManage.listPage.isDeleted'),
                render:'isDeletedRender',
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        text: this.i18n.fanyi('CenterManger.btn.payType'),
                        hide: ((row) => {
                            if(!this.helper.btnRole('AAPTEDIT')){
                                return true;
                            }
                        }),
                        click: this.onPayType.bind(this),
                    },{
                        text: this.i18n.fanyi('CenterManger.btn.refundCategoryBtn'),
                        hide: ((row) => {
                            if(!this.helper.btnRole('AAPLIMIT')){
                                return true;
                            }
                        }),
                        click: this.onRefundCategory.bind(this),
                    },{
                    text: this.i18n.fanyi('CenterManger.btn.look'),
                        hide:true,
                    // click: this.onlook.bind(this),
                },{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('AAPEDIT')){
                            return true;
                        }
                    }),
                    click: this.onEdit.bind(this),
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
        this.settleParty = this.helper.getDictByKey('PAYCENTER_IS_COMMISSION');
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if (menu && menu['params']) {// 判断路由是否有传参
            let params = menu['params'];
            this.form['bankNo'] = params['orgNo'] || params['bankNo'] ;//从父级跳转以及子级跳转传递字段名不一致
            this.tableCfg.params = this.form;
        }
    }
    onSearch(){
        this.payManageListTable.doSearch();
    }
    /**
     * 新增
     *
     */
    onAdd(){
        this.helper.navigate('/admin/center/payCfgAdd', this.i18n.fanyi('CenterManger.payManage.addTitle'), {bankNo:this.form.bankNo});
    }
    /**
     * 变更启用状态
     *
     */
    public onStateClick(row:any){
        this.modalService.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('CenterManger.tips.pcDisable1',row["name"]),
            okText: this.i18n.fanyi('Modal.okText'),
            maskClosable:false,
            width:"500px",
            onOk: () => {
                this.AIDb.pcDisable(
                    {id:row['id'],isDeleted:row['isDeleted']}
                ).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                    } else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.payManageListTable.doSearch(false);
                })
            }
        });
    }
    /**
     * 编辑
     */
    onEdit(row:any){
        this.helper.navigate('/admin/center/payCfgAdd', this.i18n.fanyi('CenterManger.payManage.editTitle'), {bankNo:this.form.bankNo,id:row["id"]});
    }
    /**
     * 查看
     */
   public  expandData:any[]=[]; //接收查询的单条数据
    onExpandChange(val){
        if(val.expand){
            this.AIDb.tradeTypeById({centerId:val['data']['id']}).subscribe(
                res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.expandData[val.index] = res[CommonEnum.SERVER_DATA_KEY];
                    }else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
        }
    }

    /**
     * 查看
     */
    // onlook(){
    //
    // }
    /**
     * 退款策略
     */
    onRefundCategory(row:any){
        let win = this.modal.static(categoryRefundWinComponent,{
    id:row["id"]
        },680,{title: this.i18n.fanyi('CenterManger.payManage.refundCategory.title')});
        win.subscribe(res => {
            if(res && res == 'onOk'){
                this.payManageListTable.doSearch(false); //刷新表格
            }
        })
    }
    /**
     * 支付类型
     */
    onPayType(row:any){
        this.helper.navigate('/admin/center/payCfgPlus', this.i18n.fanyi('CenterManger.payManage.Title'), {bankNo:this.form.bankNo,id:row["id"]});
    }
}
