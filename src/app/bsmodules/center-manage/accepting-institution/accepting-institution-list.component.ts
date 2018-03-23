import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ReuseTabService, SimpleTableComponent} from '@delon/abc';
import {ModalHelper} from '@delon/theme';
import {ExamstateWinComponent} from './examstate-win.component';
import {CommonEnum} from '../../../common/enum/common.enum';
import {AcceptingInstitutionListDbService} from '../../../common/services/request/center-manage/accepting-institution.service';
import {acceptingInstitutionForm} from '../../../common/form/center-manage/accepting-Institution.form';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {syncMchWinComponent} from './sync-mch-win.component';
/**
 * create by hsz 2018-2-26
 * 受理机构列表页面
 */
@Component({
    selector: 'accepting-institution',
    templateUrl: './accepting-institution-list.component.html',
    providers: [CommonEnum,AcceptingInstitutionListDbService]
})
export class acceptingInstitutionListComponent implements OnInit {
    public form:acceptingInstitutionForm = new acceptingInstitutionForm();
    /**
     * 受理机构列表控件配置
     */
    @ViewChild('AIListTable') public AIListTable:SimpleTableComponent;
    public tableCfg:any = {
        url:AcceptingInstitutionListDbService.ACCEPT_INSTITUTION_LIST_URL,
        params:this.form,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.organNo'),
                // index:'organNo',
                render:"orgNoRender",

            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.name'),
                index:'name'
            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.prefixName'),
                index:'preEnName',

            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.settleCycle'),
                render:"settleCycleRender"

            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.sivrate'),
                index:'techRate',

            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.status'),
                render:"statusRender"
            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.mermanage'),
                render:"mermanageRender",
            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.accmanage'),
                render:"accmanageRender",
            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.paymanage'),
                render:"paymanageRender",

            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.recmanage'),
                render:"recmanageRender",

            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.syncfg'),
                render:"syncfgRender",

            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.serviceManage'),
                render:"serviceManageRender",

            },{
                title:this.i18n.fanyi('CenterManger.listPage.tableCols.resetpwd'),
                render:"resetpwdRender",

            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.examineBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('AAEXAMINE')){
                            return true;
                        }
                    }),
                    click: this.onExamine.bind(this),
                },{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('AAEDIT')){
                            return true;
                        }
                    }),
                    click: this.editBtn.bind(this),
                }]
            }
        ]
    };
    constructor(
        public helper:HelperService,public i18n:I18NService,  public msg: NzMessageService,public AIDb:AcceptingInstitutionListDbService,
        public modalHelper:ModalHelper,public modal: NzModalService, public reuseTabService: ReuseTabService,
    ){}
    ngOnInit(){
        this.reuseTabService.change.subscribe(res =>{
            if(res && res["active"] == "refresh" &&res['pageName'] == "center/acceptinstitution"){
                this.onSearch(false);
                }
            })
    }

    /**
     * 查询
     */
    onSearch(Search:boolean = true){
        this.AIListTable.doSearch(Search);
    }
    /**
     * 编辑受理机构
     */
    editBtn(row:any){
        this.helper.navigate('/admin/center/acceptinsadd', this.i18n.fanyi('CenterManger.addAcceptIns.editTitle'), {orgId:row['orgId']});
    }
    /**
     * 添加受理机构
     */
    onAdd(){
        this.helper.navigate('/admin/center/acceptinsadd', this.i18n.fanyi('CenterManger.addAcceptIns.AddTitle'), {});
    }

    /**
     * 商户号管理配置
     * @param row
     */
    mermanageRender(row:any){
        if(row['status'] == 0 ){//未审核不能跳转
            this.msg.warning( this.i18n.fanyi('CenterManger.tips.examine',row['name']) );
            return false;
        }
        this.helper.navigate('/admin/center/mchNoCfg', this.i18n.fanyi('CenterManger.mchCfg.title'), {orgNo:row["orgNo"]});
    }
    /**
     * 设置结算账户
     * @param row
     */
    settleAcc(row:any){
        if(row['status'] == 0 ){//未审核不能跳转
            this.msg.warning( this.i18n.fanyi('CenterManger.tips.examine',row['name']) );
            return false;
        }
        this.helper.navigate('/admin/center/settleAccount', this.i18n.fanyi('CenterManger.setAccount.title'), {orgId:row['orgId'],accountId:row['accountId']});
    }
    /**
     * 设置服务费账户
     * @param row
     */
    serviceAcc(row:any){
        if(row['status'] == 0 ){//未审核不能跳转
            this.msg.warning( this.i18n.fanyi('CenterManger.tips.examine',row['name']) );
            return false;
        }
        this.helper.navigate('/admin/center/serviceAccount', this.i18n.fanyi('CenterManger.setAccount.serveTitle'), {orgId:row['orgId'],techAccount:row['techAccount']});
    }
    /**
     * 支付管理管理设置
     * @param row
     */
    paymanageRender(row:any){
        if(row['status'] == 0 ){//未审核不能跳转
            this.msg.warning( this.i18n.fanyi('CenterManger.tips.examine',row['name']) );
            return false;
        }
        this.helper.navigate('/admin/center/payManage', this.i18n.fanyi('CenterManger.payManage.title'), {orgNo:row["orgNo"]});
    }
    /**
     * 对账管理设置
     * @param row
     */
    recmanageRender(row:any){
        if(row['status'] == 0 ){//未审核不能跳转
            this.msg.warning( this.i18n.fanyi('CenterManger.tips.examine',row['name']) );
            return false;
        }
        this.helper.navigate('/admin/center/balanceACCount', this.i18n.fanyi('CenterManger.billCfg.Title'), {orgNo:row["orgNo"]});
    }
    /**
     * 同步配置
     * @param row
     */
    syncfgRender(row:any){
        if(row['status'] == 0 ){//未审核不能跳转
            this.msg.warning( this.i18n.fanyi('CenterManger.tips.examine',row['name']) );
            return false;
        }
        let win = this.modalHelper.static(syncMchWinComponent,{
            orgId:row['orgId'],
            orgNo:row['orgNo'],
        },580,{title: this.i18n.fanyi('CenterManger.syncMch.title')});
        win.subscribe(res => {
            if(res && res == 'onOk'){
                this.AIListTable.doSearch(false); //刷新表格
            }
        })
    }
    /**
     * 服务商管理创建
     * @param row
     */
    serviceManageRender(row:any){
        if(row['status'] == 0 ){//未审核不能跳转
            this.msg.warning( this.i18n.fanyi('CenterManger.tips.examine',row['name']) );
            return false;
        }
        this.modal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('CenterManger.tips.createDefaultChan1',row["name"]),
            okText: this.i18n.fanyi('Modal.okText'),
            maskClosable:false,
            width:"500px",
            onOk: () => {
                this.AIDb.createDefaultChan(
                    {orgId:row['orgId']}
                ).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('CenterManger.tips.createDefaultChan3'));
                    } else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.AIListTable.doSearch(false);
                })
            }
        });
    }
    /**
     * 重置密码
     * @param row
     */
    resetpwdRender(row:any){
        if(row['status'] == 0 ){//未审核不能跳转
            this.msg.warning( this.i18n.fanyi('CenterManger.tips.examine',row['name']) );
            return false;
        }
        this.modal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('CenterManger.tips.resetPwd1',row["name"]),
            okText: this.i18n.fanyi('Modal.okText'),
            maskClosable:false,
            width:"500px",
            onOk: () => {
                this.AIDb.resetPwd(
                    row
                ).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('CenterManger.tips.resetPwd3'));
                    } else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.AIListTable.doSearch(false);
                })
            }
        });
    }
    /**
     * 审核
     */
    onExamine(row:any){
        let win = this.modalHelper.static(ExamstateWinComponent,{
            orgId:row['orgId'],
            orgNo:row['orgNo'],
            status:row['status'],
        },580,{title: this.i18n.fanyi('CenterManger.setAccount.detail.ExamineTitle')});
        win.subscribe(res => {
            if(res && res == 'onOk'){
                this.AIListTable.doSearch(false); //刷新表格
            }
        })
    }

}
