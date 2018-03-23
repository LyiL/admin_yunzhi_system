import {ChangeDetectorRef, Component, OnInit, AfterContentChecked,ViewChild} from "@angular/core";;
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {CommonEnum} from "../../../common/enum/common.enum";
import {SimpleTableComponent} from "@delon/abc";
import {OperationlogForm} from "../../../common/form/system-log/operationlog.form";
import {OperationlogListSevice} from "../../../common/services/request/system-log/operationlog-list.sevice";


/**
 * 登录日志列表页
 * Created by zll on 2018/3/1
 */
@Component({
    selector:'operationlog-list',
    templateUrl:'operationlog-list.component.html',
    providers:[OperationlogListSevice]
})
export class OperationlogListComponent{
    public opereationForm:OperationlogForm = new OperationlogForm  //列表查询from
    @ViewChild('OperationLogTable') public OperationLogTable:SimpleTableComponent;  //获取table
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
    public OperationLogTableCfg:any = {
        url:OperationlogListSevice.LOGING_LIST_URL,
        params:this.opereationForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('operationLog.listPage.tableCols.createdTime'),   //操作时间
                index:'createdTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss',
                width:'360px'
            },{
                title:this.i18n.fanyi('operationLog.listPage.tableCols.userName'),           //用户名
                index:'userName',

            },{
                title:this.i18n.fanyi('operationLog.listPage.tableCols.realName'),     //真实姓名
                index:'realName'
            },{
                title:this.i18n.fanyi('operationLog.listPage.tableCols.ipaddress'),   //IP
                index:'ipaddress'
            },{
                title:this.i18n.fanyi('operationLog.listPage.tableCols.targetName'),   //目标名称
                index:'targetName'
            },{
                title:this.i18n.fanyi('operationLog.listPage.tableCols.actionName'),   //请求名称
                index:'actionName'
            },{
                title:this.i18n.fanyi('operationLog.listPage.tableCols.requestUrl'),   //请求地址
                index:'reqUrl'
            },{
                title:this.i18n.fanyi('operationLog.listPage.tableCols.descript'),      //备注
                // index:'descript'
                render:'descriptrender'
                // with:'80'
            }
        ]
    };

    /**
     * 搜索
     */
    public onSearch(){
        let _batchForm=this.objectExtend.clone(this.opereationForm);
        let startT=_batchForm['createdTime'];
        let endT=_batchForm['lastCreated'];
        if('_createdTime' in _batchForm){
            startT=_batchForm['_createdTime'];
        }
        if('_lastCreated' in _batchForm){
            endT=_batchForm['_lastCreated']
        }
        if(this.helper.isEmpty(startT)||this.helper.isEmpty(endT)){
            this._msg.warning(this.i18n.fanyi('operationLog.listPage.alert.pleaseTime'));
            return
        }

        this.OperationLogTable.doSearch();
    }

    /**
     * 日期时间比较
     * @param d1
     * @param d2
     * @returns {boolean}
     * @constructor
     */
    onTradeTimeEndDateDisabled(endValue:any) {
        if (!endValue || !this.opereationForm.lastCreated) {
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.opereationForm.createdTime);
    }

}
