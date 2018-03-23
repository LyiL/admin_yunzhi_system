import {Component, OnInit} from '@angular/core';
import {CommonEnum} from '../../../common/enum/common.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {MenuService} from '@delon/theme';
import {Router} from '@angular/router';
import {WxBusinessAuthService} from '../../../common/services/request/marketing-manage/wx-business-auth.service';
import {WxBusinessAuthModel} from '../../../common/model/marketing-manage/wx-business-auth.model';
import {SearchWindowConfig} from '@delon/abc';
import {CommonService} from '../../../common/services/request/common.service';

/**
 * 新增或编辑微信业务授权页
 * Created by hux on 2018/3/1
 */
@Component({
    selector:'wx-business-auth-add',
    templateUrl:'./wx-business-auth-add.component.html',
    providers:[WxBusinessAuthService]
})
export class WxBusinessAuthAddComponent implements OnInit {
    public model:WxBusinessAuthModel = new WxBusinessAuthModel(); //
    public wxBusinessAddForm: FormGroup;
    public organOrMchs: Array<any> = []; // 类型
    public defaultUser:string; // 用户名称label字段
    public defaultCfg:SearchWindowConfig; // 默认控件配置
    public defaultField:string; // 默认传递值 organNo;merchantNo;chanCode
    public isLoadingOne = false; // loading

    constructor(
        public i18n:I18NService,
        public helper:HelperService,
        public menuService:MenuService,
        public router:Router,
        public msg: NzMessageService,
        public wxBusinessAuthDB:WxBusinessAuthService,
        protected fb:FormBuilder
    ){
        this.organOrMchs = this.helper.getDictByKey('WECHAT_USER_TYPE');
        this.defaultUser = this.i18n.fanyi('WxBusinessAuth.editPage.organNo');
        this.defaultCfg = this.organNoCfg;
        this.defaultField = 'organNo';
    }

    ngOnInit(){
        this.wxBusinessAddForm = this.fb.group({
            organOrMch: [this.model.organOrMch, Validators.required], // 新增类型
            organNo: [this.model.organNo, Validators.required], // 商户名称/受理机构/服务商名称
            platId: [this.model.platId, Validators.required], // 授权第三方平台
            authId: [this.model.authId, Validators.required], // 授权公众账号
        });

        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let _params = menu['params'];
            if(_params['id']){
                this.wxBusinessAuthDB.findDetail(_params).subscribe(res =>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                        this.checkUser(this.model['organOrMch']);
                    }
                })
            }
        }
    }

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
                field:'organNo',
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
                index:'organNo'
            }
        ]
    };

    /**
     * 商户名称控件配置
     */
    public mchNoCfg: SearchWindowConfig = {
        title:this.i18n.fanyi('WxBusinessAuth.listPage.mchNoCfg.title'),
        url:CommonService.MCH_INFO_URL,
        isAjax:false,
        params:{activeState:1,examState:1},
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field: 'name',
                label:this.i18n.fanyi('WxBusinessAuth.listPage.mchNoCfg.name')
            },
            {
                field: 'merchantNo',
                label:this.i18n.fanyi('WxBusinessAuth.listPage.mchNoCfg.merchantNo')
            }
        ],
        tableColumns:[
            {
                title: this.i18n.fanyi('WxBusinessAuth.listPage.mchNoCfg.name'),
                index: 'name'
            },
            {
                title: this.i18n.fanyi('WxBusinessAuth.listPage.mchNoCfg.merchantNo'),
                index: 'merchantNo'
            }
        ],
        searchBeforFn:(val:any) => {
            if(this.helper.isEmpty(val['name']) && this.helper.isEmpty(val['merchantNo'])){
                this.msg.warning(this.i18n.fanyi('WxBusinessAuth.listPage.mchNoCfg.tip'));
                return false;
            }else{
                return true;
            }
        }
    };

    /**
     * 服务商名称控件配置
     */
    public spNoCfg: SearchWindowConfig = {
        title:this.i18n.fanyi('WxBusinessAuth.listPage.spNoCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        isAjax: false,
        params:{activeState:1,examState:1,chanType:1},
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field: 'name',
                label:this.i18n.fanyi('WxBusinessAuth.listPage.spNoCfg.name')
            },
            {
                field: 'chanCode',
                label:this.i18n.fanyi('WxBusinessAuth.listPage.spNoCfg.chanCode')
            }
        ],
        tableColumns:[
            {
                title: this.i18n.fanyi('WxBusinessAuth.listPage.spNoCfg.name'),
                index: 'name'
            },
            {
                title: this.i18n.fanyi('WxBusinessAuth.listPage.spNoCfg.chanCode'),
                index: 'chanCode'
            }
        ],
        searchBeforFn:(val:any) => {
            if(this.helper.isEmpty(val['name']) && this.helper.isEmpty(val['chanCode'])){
                this.msg.warning(this.i18n.fanyi('WxBusinessAuth.listPage.spNoCfg.tip'));
                return false;
            }else{
                return true;
            }
        }
    };

    /**
     * 授权第三方平台控件配置
     */
    public platIdCfg: SearchWindowConfig = {
        title:this.i18n.fanyi('WxBusinessAuth.listPage.platIdCfg.title'),
        url:WxBusinessAuthService.PLATID_URL,
        isAjax: false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field: 'name',
                label:this.i18n.fanyi('WxBusinessAuth.listPage.platIdCfg.name')
            }
        ],
        tableColumns:[
            {
                title: this.i18n.fanyi('WxBusinessAuth.listPage.platIdCfg.id'),
                index: 'id'
            },
            {
                title: this.i18n.fanyi('WxBusinessAuth.listPage.platIdCfg.name'),
                index: 'name'
            }
        ]
    };

    /**
     * 授权公众账号控件配置
     */
    public authIdCfg: SearchWindowConfig = {
        title:this.i18n.fanyi('WxBusinessAuth.listPage.authIdCfg.title'),
        url:WxBusinessAuthService.AUTHID_URL,
        isAjax: false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field: 'nickName',
                label:this.i18n.fanyi('WxBusinessAuth.listPage.authIdCfg.nickName')
            }
        ],
        tableColumns:[
            {
                title: this.i18n.fanyi('WxBusinessAuth.listPage.authIdCfg.id'),
                index: 'id'
            },
            {
                title: this.i18n.fanyi('WxBusinessAuth.listPage.authIdCfg.nickName'),
                index: 'nickName'
            }
        ]
    };

    /**
     * 提交表单
     * @private
     */
    _submitForm() {
        this.isLoadingOne = true;
        if(this.wxBusinessAddForm.valid){
            this.wxBusinessAuthDB.save(this.model).subscribe(res => {
                this.isLoadingOne = false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.helper.navigate('/admin/marketing/wxbsauth', this.i18n.fanyi('WxBusinessAuth.listPage.title'), {},true);
                }else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }
    }

    /**
     * 返回微信业务授权列表页
     */
    onGoBack(){
        this.helper.navigate('/admin/marketing/wxbsauth', this.i18n.fanyi('WxBusinessAuth.listPage.title'), {});
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.wxBusinessAddForm.controls[name];
    }

    /**
     * 新增类型选中事件
     * @param value
     */
    organOrMchSelected(value){
        this.checkUser(value['nzValue']);
        // 清空受理机构/商户名称/服务商名称
        if(value['nzOldValue'] && value['nzOldValue']['nzValue'] != this.model.organOrMch){
            this.model.organNo = null;
            this.model.organName = null;
        }
    }

    /**
     * 受理机构/商户名称/服务商名称查询前事件
     * @returns {boolean}
     */
    onOrganNoSearchBefore(){
        if(this.helper.isEmpty(this.model.organOrMch)) {
            // 请先选择新增类型
            this.msg.warning(this.i18n.fanyi('WxBusinessAuth.win.organOrMchEmpty'));
            return false;
        }
        return true;
    }

    /**
     * 受理机构/商户名称/服务商名称选中事件
     * @param value
     */
    organNoSelected(value){
        this.model.organName = value['name'];
    }

    /**
     * 授权第三方平台选中事件
     * @param value
     */
    platIdSelected(value){
        this.model.platName = value['name'];
    }

    /**
     * 授权公众账号选中事件
     * @param value
     */
    authIdSelected(value){
        this.model.authName = value['nickName'];
    }

    /**
     * 用户名称检测方法
     * @param data
     */
    checkUser(data){
        switch(data){
            case '0': // 服务商
                this.defaultUser = this.i18n.fanyi('WxBusinessAuth.editPage.spNo');
                this.defaultCfg = this.spNoCfg;
                this.defaultField = 'chanCode';
                break;
            case '1': // 机构
                this.defaultUser = this.i18n.fanyi('WxBusinessAuth.editPage.organNo');
                this.defaultCfg = this.organNoCfg;
                this.defaultField = 'organNo';
                break;
            case '2': // 商户
                this.defaultUser = this.i18n.fanyi('WxBusinessAuth.editPage.mchNo');
                this.defaultCfg = this.mchNoCfg;
                this.defaultField = 'merchantNo';
                break;
        }
    }
}
