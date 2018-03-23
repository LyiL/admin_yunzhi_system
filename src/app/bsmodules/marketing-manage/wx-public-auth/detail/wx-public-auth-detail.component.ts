import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {MenuService} from '@delon/theme';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {WxPublicAuthService} from '../../../../common/services/request/marketing-manage/wx-public-auth.service';
import {HelperService} from '../../../../common/services/helper.service';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {ReuseTabService} from '@delon/abc';

/**
 * 公众号授权详情页
 * Created by hux on 2018/3/2
 */
@Component({
    selector:'wx-public-auth-detail',
    templateUrl:'./wx-public-auth-detail.component.html',
    styles:[`.break-reqXml{width:90%;word-break: break-all;word-wrap: break-word;}`],
    providers:[WxPublicAuthService]
})
export class WxPublicAuthDetailComponent implements OnInit, OnDestroy{
    public wxPublicAuthInfoData = {}; // 公众号授权详情参数

    /**
     * 公众号授权详情基础信息配置
     */
    public wxPublicAuthDetailFields:Array<any> = [
        {
            // 授权方昵称
            title:this.i18n.fanyi("WxPublicAuth.listPage.search.nickName"),
            field:'nickName'
        },
        {
            // 授权方认证类型
            title:this.i18n.fanyi("WxPublicAuth.listPage.tableCols.verifyTypeInfo"),
            field:'verifyTypeInfo',
            type:'dict',
            transKey:'WECHAT_VERIFY'
        },
        {
            // 公众号名称
            title:this.i18n.fanyi("WxPublicAuth.listPage.tableCols.name"),
            field:'name'
        },
        {
            // 授权公众号类型
            title:this.i18n.fanyi("WxPublicAuth.listPage.tableCols.serviceTypeInfo"),
            field:'serviceTypeInfo',
            type:'dict',
            transKey:'WECHAT_TYPE'
        },
        {
            // appid
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.appid"),
            field:'appid'
        },
        {
            // 主服务域名
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.host"),
            field:'host'
        },
        {
            // 公众账号原始id
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.userName"),
            field:'userName'
        },
        {
            // 授权方微信号
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.ALIAS"),
            field:'ALIAS'
        },
        {
            // 授权方头像
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.headImg"),
            field:'headImg',
            type:'reqXml'
        },
        {
            // 授权权限集
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.funcInfo"),
            field:'funcInfo'
        },
        {
            // 刷新token
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.refreshToken"),
            field:'refreshToken',
            type:'reqXml'
        },
        {
            // 授权token
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.accessToken"),
            field:'accessToken',
            type:'reqXml'
        },
        {
            // 授权时间
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.authTime"),
            field:'authTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            // 取消授权时间
            title:this.i18n.fanyi("WxPublicAuth.detailPage.detail.cancelTime"),
            field:'cancelTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        }
    ];

    constructor(
        public wxPublicAuthService:WxPublicAuthService,
        public helper:HelperService,
        public i18n:I18NService,
        public menuService:MenuService,
        public router:Router,
        public _msg: NzMessageService,
        private reuseTabService:ReuseTabService
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url); // 获取路由
        if(menu && menu['params']){
            let _params = menu['params']; // 获取路由参数
            this.loadDetail(_params); // 加载详情数据
        };
    }

    ngOnDestroy(){
        this.reuseTabService.refresh();
    }

    /**
     * 加载公众号授权详情
     */
    public loadDetail(data){
        this.wxPublicAuthService.findDetail(data).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.wxPublicAuthInfoData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 返回列表页
     */
    public _onBack(){
        this.helper.navigate('/admin/marketing/wxmpauth',this.i18n.fanyi('WxPublicAuth.listPage.title'),{});
    }
}
