import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {ReuseTabService, SimpleTableComponent} from "@delon/abc";
import {TimeTaskService} from "app/common/services/request/system-manage/time-task.service";
import {TimeTaskForm} from "../../../common/form/system-manage/time-task.form";
import {CommonEnum} from "app/common/enum/common.enum";
import {ModalHelper} from "@delon/theme";

/**
 * Created by cty on 2018/3/1.
 * 定时任务列表页
 *
 */

@Component({
    selector:'time-task-list',
    templateUrl:'./time-task-list.component.html',
    providers: [TimeTaskService, CommonService]
})
export class TimeTaskListComponent implements OnInit{

    public timeTaskForm: TimeTaskForm = new TimeTaskForm();

    @ViewChild('timeTaskListTable') timeTaskListTable: SimpleTableComponent;

    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected nzModal: NzModalService,
                public modal: ModalHelper,
                public msg: NzMessageService,
                public TimeTaskDB: TimeTaskService,
                public reuseTabService: ReuseTabService
    ){}


    ngOnInit(){
        this.reuseTabService.change.subscribe(res => {
            if(res && res['active'] == 'refresh' && res['pageName'] == 'system/timetasklist') {
                this.onSearch(false);
            }
        })
    }


    /**
     * 表格配置
     * @type {{url: string; params: TimeTaskForm; isAjax: boolean; reqReName: {pi: string; ps: string}; resReName: {list: string; total: string; pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); buttons: [{text: (string | any); click: ((row: any))} , {text: (string | any); click: ((row: any) => any)} , {text: (string | any); click: ((row: any) => any)}]}]}}
     */
    public tableCfg:any = {
        url:TimeTaskService.TIME_TASK_LIST_URL,
        params: this.timeTaskForm,
        isAjax:true,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        tableColumns:[
            {
                // 任务编码
                title:this.i18n.fanyi('timeTask.listPage.tableCols.id'),
                index:'id'
            },{
                // 任务名称
                title:this.i18n.fanyi('timeTask.listPage.tableCols.taskName'),
                index:'taskName'
            },{
                // 分组名称
                title:this.i18n.fanyi('timeTask.listPage.tableCols.groupName'),
                index:'groupName'
            },{
                // 执行时间
                title:this.i18n.fanyi('timeTask.listPage.tableCols.cronExp'),
                index:'cronExp'
            },{
                // 时间描述
                title:this.i18n.fanyi('timeTask.listPage.tableCols.cronDesc'),
                index:'cronDesc'
            },{
                // 启用状态
                title:this.i18n.fanyi('timeTask.listPage.tableCols.useState'),
                render:'useStateRender'
            },{
                // 运行状态
                title:this.i18n.fanyi('timeTask.listPage.tableCols.runState'),
                render:'runStateRender'
            },{
                // 上次开始执行时间
                title:this.i18n.fanyi('timeTask.listPage.tableCols.lastBeginTime'),
                render:'lastBeginTimeRender'
            },{
                // 上次结束执行时间
                title:this.i18n.fanyi('timeTask.listPage.tableCols.lastEndTime'),
                render:'lastEndTimeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 异步执行
                        text: this.i18n.fanyi('timeTask.listPage.tableCols.asynBtn'),
                        hide: (() => {
                            if(this.helper.btnRole('ATASYNRUN')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onAsyc.bind(this)
                    },
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: (() => {
                            if(this.helper.btnRole('ATEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide: (() => {
                            if(this.helper.btnRole('ATDEL')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onDel.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 使用状态变更
     * @param row
     */
    public onStateClick(row: any){
        const _confirm = this.nzModal.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('fieldManage.listPage.tableCols.switchState'),
            maskClosable: false,
        });

        _confirm.subscribe( res =>{
            if(res && res == 'onOk'){
                let _useState = row['useState'] == 1 ? 0 : 1;
                this.TimeTaskDB.switchState({id: row['id'], useState: _useState }).subscribe((_res)=>{
                    if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                        this.timeTaskListTable.doSearch();
                        _confirm.destroy();
                    }else{
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }

    /**
     * 异步执行
     */
    public onAsyc(row: any) {
        if(row['useState'] == 0) {
            this.msg.warning(this.i18n.fanyi('timeTask.hint.isAsyn'));
            return;
        }

        const _confirm = this.nzModal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('timeTask.hint.asyn'),
            maskClosable: false
        })

        _confirm.subscribe((res) => {
            if(res && res == 'onOk') {
                this.TimeTaskDB.taskAsyc({id: row['id']}).subscribe(_res => {
                    if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.msg.success(this.i18n.fanyi('default.hint.doSuccess'));
                        this.timeTaskListTable.doSearch(true);
                    }else {
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }

    /**
     * 新增
     */
    onAdd() {
        this.helper.navigate('/admin/system/timetaskedit', this.i18n.fanyi('timeTask.listPage.tableCols.addTask'), null);
    }

    /**
     * 编辑
     * @param row
     */
    onEdit(row: any) {
        this.helper.navigate('/admin/system/timetaskedit', this.i18n.fanyi('timeTask.listPage.tableCols.editTask'), row);
    }

    /**
     * 删除
     * @param row
     */
    public onDel(row: any) {
        const _confirm = this.nzModal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('timeTask.hint.delInfo', row['taskName']),
            maskClosable: false
        })

        _confirm.subscribe((res) => {
            if(res && res == 'onOk') {
                this.TimeTaskDB.del({id: row['id']}).subscribe((_res) => {
                    if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                    }else {
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.timeTaskListTable.doSearch(false);
                })
            }
        })
    }


    /**
     * 查询
     */
    onSearch(boo: boolean = true) {
        this.timeTaskListTable.doSearch(boo);
    }

}
