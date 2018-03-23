import {Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {ReuseTabService, SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {ModalHelper} from '@delon/theme';
import {newClone} from '@delon/abc/utils/utils';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {WxDevPlatformForm} from "../../../common/form/marketing-manage/wx-developer-platform.form";
import {WxDevPlatformService} from "../../../common/services/request/marketing-manage/wx-developer-platform.service";
import {CommonService} from "../../../common/services/request/common.service";

/**
 * 微信开发者平台列表页
 * Created by lyl on 2018/3/2
 */
@Component({
    selector: 'wx-developer-platform-list',
    templateUrl: './wx-developer-platform-list.component.html',
    providers:[CommonService, WxDevPlatformService]
})
export class WxDevPlatformListComponent implements OnInit{
    public wxDevPlatformForm: WxDevPlatformForm = new WxDevPlatformForm();
    /**
     * 受理机构控件配置
     */
    public organNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.title'),
        url:CommonService.ORGNO_URL,
        params:{status: 1},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[
            {
                field:'name',
                label:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.name')
            },
            {
                field:'orgNo',
                label:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.orgNo')
            }
        ],
        tableColumns:[
            {
                title:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.name'),
                index:'name'
            },
            {
                title:this.i18n.fanyi('WxDevPlatform.listPage.organNoCfg.orgNo'),
                index:'orgNo'
            }
        ]
    };

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public msg: NzMessageService,
        public reuseTabService:ReuseTabService
    ) {}
    ngOnInit(){
        //监听页签变化刷新
        this.reuseTabService.change.subscribe((res) => {
            if(res && res['active'] === 'refresh' && res['pageName'] == 'marketing/wxopenplatform'){
                //满足以上条件才做刷新
                this.onSearch(false);
            }
        });
    }
    @ViewChild('wxDevPlatformListTable') public wxDevPlatformListTable: SimpleTableComponent;
    public tableCfg:any = {
        url:WxDevPlatformService.WX_DEV_PLATFORM_LIST_URL,
        params:this.wxDevPlatformForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 受理机构
                title:this.i18n.fanyi('WxDevPlatform.listPage.tableCols.organName'),
                index:'organName'
            },
            {
                // 第三方平台名称
                title:this.i18n.fanyi('WxDevPlatform.listPage.tableCols.name'),
                index:'name'
            },
            {
                // 公众账号类型
                title:this.i18n.fanyi('WxDevPlatform.listPage.tableCols.type'),
                render:'typeRender'
            },
            {
                // Token标识
                title:this.i18n.fanyi('WxDevPlatform.listPage.tableCols.token'),
                index:'token'
            },
            {
                // AppId
                title:this.i18n.fanyi('WxDevPlatform.listPage.tableCols.appid'),
                index:'appid'
            },
            {
                // 备注
                title:this.i18n.fanyi('WxDevPlatform.listPage.tableCols.remark'),
                render:'remarkRender'
            },
            {
                // 创建时间
                title:this.i18n.fanyi('WxDevPlatform.listPage.tableCols.createdAt'),
                render:'createdAtRender',
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AWEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onEditPlatform.bind(this)
                    },
                    // {
                    //     text: this.i18n.fanyi('default.btn.findBtn'),
                        // hide:(()=>{
                        //     if(this.helper.btnRole('')){
                        //         return false;
                        //     }
                        //     return true;
                        // }).bind(this),
                        // click:this.onDetail.bind(this)
                    // }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(search:boolean = true){
        this.wxDevPlatformListTable.doSearch(search);
    }

    /**
     * 新增平台
     */
    public onAddPlatform(){
        this.helper.navigate('/admin/marketing/addwxopenplatform', this.i18n.fanyi('WxDevPlatform.addPlatformPage.addTitle'), null);
    }

    /**
     * 编辑平台
     */
    public onEditPlatform(row) {
        this.helper.navigate('/admin/marketing/addwxopenplatform', this.i18n.fanyi('WxDevPlatform.addPlatformPage.editTitle'), {id: row['id']});
    }

}
