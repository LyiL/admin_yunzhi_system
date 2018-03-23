import {Component, OnInit} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonEnum} from "../../../common/enum/common.enum";
import {SearchWindowConfig} from "@delon/abc";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {WxDevPlatformModel} from "../../../common/model/marketing-manage/wx-developer-platform-add.model";
import {
    WxDevPlatformService
} from "../../../common/services/request/marketing-manage/wx-developer-platform.service";
import {Observable} from "rxjs/Observable";

/**
 * Created by lyl on 2018/3/2.
 * 功能权限管理列表页
 */
@Component({
    selector:'wx-developer-platform-edit',
    templateUrl:'./wx-developer-platform-edit.component.html',
    providers: [CommonService, WxDevPlatformService]
})
export class WxDevPlatformEditComponent implements OnInit {

    public isLoad: boolean; // 按钮加载效果
    public types:Observable<any>; //公众账号类型
    public model: WxDevPlatformModel = new WxDevPlatformModel();
    public wxDevPlatformFormGroup: FormGroup;
    /**
     * 受理机构控件配置
     */
    public organNoTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.title'),
        url:CommonService.ORGNO_URL,
        params:{status: 1},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.name'),
            index:'name'
        }]
    };
    constructor(public helper: HelperService,
                public i18n: I18NService,
                protected modalService: NzModalService,
                public fb: FormBuilder,
                public wxDevPlatformDB: WxDevPlatformService,
                public menuService: MenuService,
                public router: Router,
                public msg: NzMessageService)
    {}

    ngOnInit() {
        this.wxDevPlatformFormGroup = this.fb.group({
            organNo: [this.model.organNo, [Validators.required]],               // 机构编号
            organName: [this.model.organName],       // 机构名称
            name: [this.model.name, [Validators.required]],         // 公众账号名称
            type: [this.model.type, [Validators.required]],     // 公众号类型(0:订阅号, 1:历史老账号升级的订阅好, 2:服务号)
            token: [this.model.token, [Validators.required]],     // 标识
            appid: [this.model.appid, [Validators.required]],          // 公众号第三方平台APPID
            appsecret: [this.model.appsecret, [Validators.required]],  // 应用秘钥
            host: [this.model.host, [Validators.required]],  // 主服务域名
            aesKey: [this.model.aesKey, [Validators.required]],  // 签名秘钥
            authHost: [this.model.authHost, [Validators.required]],  // 授权域
            remark: [this.model.remark],  // 备注
        });
        this.types = Observable.of(this.helper.getDictByKey('OTO_WECHAT_AUTHORIZER_TYPE'));//公众账号类型
        //获取路由参数
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let params = menu['params'];
            let idParam = params['id'];
            this.loadDetail(idParam);
        }

    }

    /**
     *加载详情信息
     */
    public loadDetail(idParam: any){
        this.wxDevPlatformDB.loadDetail({id: idParam}).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.model = res[CommonEnum.SERVER_DATA_KEY];
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     *受理机构选中事件
     */
    public onSelectOrganNo(value) {
        this.model.organName = value['name'];
    }
    /**
     *  返回
     */
    onBack() {
        this.helper.navigate('/admin/marketing/wxopenplatform', this.i18n.fanyi('WxDevPlatform.listPage.title'), null);
    }

    /**
     * 保存
     */
    onSave() {
        this.isLoad = true;
        this.wxDevPlatformDB.savePlatformData(this.model).subscribe(res => {
            this.isLoad = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.doSuccess'));
                this.helper.navigate('/admin/marketing/wxopenplatform', this.i18n.fanyi('WxDevPlatform.listPage.title'), null,true);
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }


    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.wxDevPlatformFormGroup.controls[name];
    }
}
