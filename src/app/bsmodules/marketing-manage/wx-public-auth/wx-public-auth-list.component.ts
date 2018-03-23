import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {ModalHelper} from '@delon/theme';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {WxPublicAuthForm} from '../../../common/form/marketing-manage/wx-public-auth.form';
import {WxPublicAuthService} from '../../../common/services/request/marketing-manage/wx-public-auth.service';
import {WxPublicAuthUploadWinComponent} from './upload/wx-public-auth-upload-win.component';

/**
 * 公众号授权列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'wx-public-auth-list',
    templateUrl: './wx-public-auth-list.component.html',
    providers:[WxPublicAuthService]
})
export class WxPublicAuthListComponent{
    public wxPublicAuthForm: WxPublicAuthForm = new WxPublicAuthForm();

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public _msg: NzMessageService
    ) {}

    @ViewChild('wxPublicAuthListTable') public wxPublicAuthListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:WxPublicAuthService.WX_PUBLIC_AUTH_LIST_URL,
        params:this.wxPublicAuthForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 授权方昵称
                title:this.i18n.fanyi('WxPublicAuth.listPage.search.nickName'),
                render:'nickNameRender'
            },
            {
                // 公众号名称
                title:this.i18n.fanyi('WxPublicAuth.listPage.tableCols.name'),
                index:'name'
            },
            {
                // 授权公众号类型
                title:this.i18n.fanyi('WxPublicAuth.listPage.tableCols.serviceTypeInfo'),
                render:'serviceTypeInfoRender'
            },
            {
                // 授权方认证类型
                title:this.i18n.fanyi('WxPublicAuth.listPage.tableCols.verifyTypeInfo'),
                render:'verifyTypeInfoRender'
            },
            {
                // 授权时间
                title:this.i18n.fanyi('WxPublicAuth.listPage.tableCols.authTime'),
                render:'authTimeRender'
            },
            {
                // 取消授权时间
                title:this.i18n.fanyi('WxPublicAuth.listPage.tableCols.cancelTime'),
                render:'cancelTimeRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 查看详情
                        text: this.i18n.fanyi('WxPublicAuth.listPage.btn.detailBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('APDETAIL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/marketing/wxmpauthdetail',this.i18n.fanyi('WxPublicAuth.detailPage.title'),{
                                id: record['id']
                            });
                        }).bind(this)
                    },
                    {
                        // 上传
                        text: this.i18n.fanyi('WxPublicAuth.listPage.btn.uploadBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('APUPLOAD')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onUpload.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.wxPublicAuthListTable.doSearch();
    }

    /**
     * 上传公众号二维码
     */
    public onUpload(row:any){
        let subscription = this.modalHelper.static(WxPublicAuthUploadWinComponent,{
            id:row['id']
        },580,{title: this.i18n.fanyi('WxPublicAuth.win.followCodeTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.wxPublicAuthListTable.doSearch(false); //刷新表格
            }
        })
    }
}
