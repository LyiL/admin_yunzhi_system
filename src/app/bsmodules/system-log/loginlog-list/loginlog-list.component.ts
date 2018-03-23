import {ChangeDetectorRef, Component, OnInit, AfterContentChecked,ViewChild} from "@angular/core";;
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {HttpHeaders} from "@angular/common/http";
import {CommonEnum} from "../../../common/enum/common.enum";
import {SimpleTableComponent} from "@delon/abc";
import {LoginlogListSevice} from "../../../common/services/request/system-log/loginlog-list.sevice";
import {LoginLogForm} from "../../../common/form/system-log/loginlog.form";


/**
 * 登录日志列表页
 * Created by zll on 2018/3/1
 */
@Component({
    selector:'loginlog-list',
    templateUrl:'./loginlog-list.component.html',
    providers:[LoginlogListSevice]
})
export class LoginLogComponent{
    public logForm:LoginLogForm = new LoginLogForm()   //列表查询from
    @ViewChild('LoginLogTable') public LoginLogTable:SimpleTableComponent;  //获取table
    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modalService: NzModalService,
                public _msg: NzMessageService,
                public objectExtend:ObjectExtend
    ){

    }

    /**
     * 列表页数据源配置
     * @type {{url: string; params: LoginLogForm; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string; type: string; dateFormat: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string}]}}
     */
    public LoginLogTableCfg:any = {
        url:LoginlogListSevice.LOGING_LIST_URL,
        params:this.logForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('logLOG.listPage.tableCols.loginTime'),   //登陆时间
                index:'loginTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss',
                width:'360px'
            },{
                title:this.i18n.fanyi('logLOG.listPage.tableCols.userName'),           //用户名
                index:'userName',
                width:"400px"
            },{
                title:this.i18n.fanyi('logLOG.listPage.tableCols.realName'),     //真实姓名
                index:'realName'
            },{
                title:this.i18n.fanyi('logLOG.listPage.tableCols.ipaddress'),   //IP
                index:'ipaddress'
            },{
                title:this.i18n.fanyi('logLOG.listPage.tableCols.remark'),      //备注
                // index:'descript'
                render:'remarkrender'
                // with:'80'
            }
        ]
    };

    /**
     * 搜索
     */
    public onSearch(){
        let _batchForm=this.objectExtend.clone(this.logForm);
        let startT=_batchForm['loginTime'];
        let endT=_batchForm['lastLoginAt'];
        if('_loginTime' in _batchForm){
            startT=_batchForm['_loginTime'];
        }
        if('_lastLoginAt' in _batchForm){
            endT=_batchForm['_lastLoginAt']
        }
        if(this.helper.isEmpty(startT)||this.helper.isEmpty(endT)){
            this._msg.warning(this.i18n.fanyi('logLOG.listPage.alert.pleaseTime'));
            return
        }
        this.LoginLogTable.doSearch();
    }






    /**
     * 结束时间控制
     */
    onTradeTimeEndDateDisabled(endValue:any) {
        if (!endValue || !this.logForm.lastLoginAt) {
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.logForm.loginTime);
    }

}
