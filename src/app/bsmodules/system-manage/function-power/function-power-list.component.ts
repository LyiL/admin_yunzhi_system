import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {ReuseTabService, SimpleTableComponent} from "@delon/abc";
import {FunctionPowerForm} from "../../../common/form/system-manage/function-power.form";
import {CommonEnum} from "../../../common/enum/common.enum";
import {FunctionPowerService} from "../../../common/services/request/system-manage/function-power.service";
import {newClone} from "@delon/abc/utils/utils";

/**
 * Created by cty on 2018/3/1.
 * 功能权限管理列表页
 */
@Component({
    selector:'function-power-list',
    templateUrl:'./function-power-list.component.html',
    providers: [CommonService, FunctionPowerService]
})
export class FunctionPowerListComponent implements OnInit{

    public functionPowerForm: FunctionPowerForm = new FunctionPowerForm();

    @ViewChild('funcPowerTable') funcPowerTable: SimpleTableComponent;

    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected modalService: NzModalService,
                public FunctionPowerDB: FunctionPowerService,
                private reuseTabService: ReuseTabService
    ){}


    ngOnInit(){
        this.reuseTabService.change.subscribe(res => {
            if(res && res['active'] == 'refresh' && res['pageName'] == 'system/functionpowerlist') {
                this.onSearch(false);
            }
        })
    }

    /**
     * 表格配置
     * @type {{url: string; params: FunctionPowerForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); buttons: [{text: (string | any); click: ((row: any) => any)}]}]}}
     */
    public tableCfg:any = {
        url:FunctionPowerService.FUNCTION_POWER_LIST_URL,
        params: this.functionPowerForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                // 功能编码
                title:this.i18n.fanyi('funcPower.listPage.tableCols.authcode'),
                index:'authcode'
            },{
                // 功能名称
                title:this.i18n.fanyi('funcPower.listPage.tableCols.actionName'),
                index:'actionName'
            },{
                // 功能组
                title:this.i18n.fanyi('funcPower.listPage.tableCols.authgroup'),
                index:'authgroup'
            },{
                // APPID
                title:this.i18n.fanyi('funcPower.listPage.tableCols.appId'),
                index:'appId'
            },{
                // 功能路径
                title:this.i18n.fanyi('funcPower.listPage.tableCols.actionPath'),
                index:'actionPath'
            },{
                // 排序
                title:this.i18n.fanyi('funcPower.listPage.tableCols.orderBy'),
                render:'orderByRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: (() => {
                            if(this.helper.btnRole('ROLEPEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    }
                ]
            }
        ]
    };


    /**
     * 查询
     */
    onSearch(boo: boolean = true) {
        this.funcPowerTable.doSearch(boo);
    }


    /**
     * 新增
     */
    onAdd() {
        this.helper.navigate('/admin/system/functionpoweredit', this.i18n.fanyi('funcPower.addFuncPower.addTitle'), null);
    }


    /**
     * 编辑
     * @param row
     */
    onEdit(row) {
        this.helper.navigate('/admin/system/functionpoweredit', this.i18n.fanyi('funcPower.addFuncPower.editTitle'), {model: newClone(row)});
    }
}
