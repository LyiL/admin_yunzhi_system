import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {ReuseTabService, SimpleTableComponent} from "@delon/abc";
import {ParameterService} from "../../../common/services/request/system-manage/parameter.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {ParameterForm} from "../../../common/form/system-manage/parameter.form";

/**
 * Created by cty on 2018/3/1.
 * 参数配置列表页
 */
@Component({
    selector:'parameter-config-list',
    templateUrl:'./parameter-config-list.component.html',
    providers: [CommonService]
})
export class ParameterConfigListComponent implements OnInit{

    public parameterForm: ParameterForm = new ParameterForm();

    @ViewChild('parameterListTable') parameterListTable: SimpleTableComponent;

    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected nzModal: NzModalService,
                private reuseTabService: ReuseTabService
    ){

    }
    ngOnInit(){
        this.reuseTabService.change.subscribe(res => {
            if(res && res['active'] == 'refresh' && res['pageName'] == 'system/parameterlist') {
                this.onSearch(false);
            }
        })
    }

    /**
     * 表格配置
     * @type {{url: string; params: ParameterForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); buttons: [{text: (string | any); click: ((row: any) => any)}]}]}}
     */
    public tableCfg:any = {
        url:ParameterService.PARAMETER_LIST_URL,
        params: this.parameterForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                // 显示名称
                title:this.i18n.fanyi('parameter.listPage.tableCols.confName'),
                index:'confName'
            },{
                // 配置项编码
                title:this.i18n.fanyi('parameter.listPage.tableCols.keyCode'),
                index:'keyCode'
            },{
                // 配置项值
                title:this.i18n.fanyi('parameter.listPage.tableCols.value'),
                render:'valueRender',
                className:'autoHeight'
            },{
                // 类型
                title:this.i18n.fanyi('parameter.listPage.tableCols.confType'),
                index:'confType'
            },{
                // 分组
                title:this.i18n.fanyi('parameter.listPage.tableCols.moduleCode'),
                index:'moduleCode'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: (() => {
                            if(this.helper.btnRole('APEDIT')) {
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
    public onSearch(boo: boolean = true) {
        this.parameterListTable.doSearch(boo);
    }


    /**
     * 新增
     */
    public onAdd() {
        this.helper.navigate('/admin/system/parameteredit', this.i18n.fanyi('parameter.editParameter.addTitle'), null);
    }

    /**
     * 新增/编辑
     * @param row
     */
    public onEdit(row: any) {
        this.helper.navigate('/admin/system/parameteredit', this.i18n.fanyi('parameter.editParameter.editTitle'), row);
    }
}
