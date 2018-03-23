import {Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {ReuseTabService, SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {ModalHelper} from '@delon/theme';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {WxBusinessAuthService} from '../../../common/services/request/marketing-manage/wx-business-auth.service';
import {WxBusinessAuthForm} from '../../../common/form/marketing-manage/wx-business-auth.form';
import {CommonService} from '../../../common/services/request/common.service';

/**
 * 微信业务授权列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'wx-business-auth-list',
    templateUrl: './wx-business-auth-list.component.html',
    providers:[WxBusinessAuthService]
})
export class WxBusinessAuthListComponent implements OnInit {
    public wxBusinessAuthForm: WxBusinessAuthForm = new WxBusinessAuthForm();

    /**
     * 受理机构控件配置
     */
    public organNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('WxBusinessAuth.listPage.organNoCfg.title'),
        url:CommonService.ORGNO_URL,
        isAjax:false,
        params:{status:1},
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field:'name',
                label:this.i18n.fanyi('WxBusinessAuth.listPage.organNoCfg.name')
            },
            {
                field:'orgNo',
                label:this.i18n.fanyi('WxBusinessAuth.listPage.organNoCfg.organNo')
            }
        ],
        tableColumns:[
            {
                title:this.i18n.fanyi('WxBusinessAuth.listPage.organNoCfg.name'),
                index:'name'
            },
            {
                title:this.i18n.fanyi('WxBusinessAuth.listPage.organNoCfg.organNo'),
                index:'orgNo'
            }
        ]
    };

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public wxBusinessAuthDB:WxBusinessAuthService,
        public _msg: NzMessageService,
        private reuseTabService:ReuseTabService
    ) {}

    ngOnInit(){
        this.reuseTabService.change.subscribe(res => {
            if(res && res['active'] == 'refresh' && res['pageName'] == 'marketing/wxbsauth'){
                this.onSearch(false);
            }
        })
    }

    @ViewChild('wxBusinessAuthListTable') public wxBusinessAuthListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:WxBusinessAuthService.WX_BUSINESS_AUTH_LIST_URL,
        params:this.wxBusinessAuthForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 所属机构
                title:this.i18n.fanyi('WxBusinessAuth.listPage.tableCols.organName'),
                index:'organName'
            },
            {
                // 授权公众帐号
                title:this.i18n.fanyi('WxBusinessAuth.listPage.search.authName'),
                index:'authName'
            },
            {
                // 授权平台
                title:this.i18n.fanyi('WxBusinessAuth.listPage.tableCols.platName'),
                index:'platName'
            },
            {
                // 类型
                title:this.i18n.fanyi('WxBusinessAuth.listPage.tableCols.organOrMch'),
                render:'organOrMchRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AWBEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onEditWxBusinessAuth.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AWBDEL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onDeleteWxBusinessAuth.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(search:boolean = true){
        this.wxBusinessAuthListTable.doSearch(search);
    }

    /**
     * 新增微信业务授权
     */
    public onNewWxBusinessAuth(){
        this.helper.navigate('/admin/marketing/addbsauth', this.i18n.fanyi('WxBusinessAuth.listPage.addTitle'),{});
    }

    /**
     * 编辑微信业务授权
     */
    public onEditWxBusinessAuth(row:any){
        this.helper.navigate('/admin/marketing/addbsauth', this.i18n.fanyi('WxBusinessAuth.listPage.editTitle'),{id:row['id']});
    }

    /**
     * 删除微信业务授权
     */
    public onDeleteWxBusinessAuth(row:any){
        let subscription = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('WxBusinessAuth.win.delConfirm',row['organName']),
            maskClosable:false
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this.wxBusinessAuthDB.delete({id: row['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        this.wxBusinessAuthListTable.doSearch(false);
                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }
}
