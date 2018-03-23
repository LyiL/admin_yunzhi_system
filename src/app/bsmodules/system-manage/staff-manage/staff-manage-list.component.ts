import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {ReuseTabService, SimpleTableComponent} from "@delon/abc";
import {StaffService} from "../../../common/services/request/system-manage/staff.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {StaffForm} from "../../../common/form/system-manage/staff.form";
import {ModalHelper} from "@delon/theme";
import {staffModifyPwdComponent} from "app/bsmodules/system-manage/staff-manage/win/modify-pwd.component";
import {newClone} from "@delon/abc/utils/utils";

/**
 * Created by cty on 2018/3/1.
 * 员工管理列表页
 */

@Component({
    selector:'staff-manage-list',
    templateUrl:'./staff-manage-list.component.html',
    providers: [CommonService, StaffService]
})
export class StaffManageListComponent implements OnInit{

    public staffForm: StaffForm = new StaffForm();
    public states: Array<any> = []; // 使用状态

    @ViewChild('staffListTable') staffListTable: SimpleTableComponent;

    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected modalService: NzModalService,
                public nzModal: NzModalService,
                public StaffDB: StaffService,
                public modal: ModalHelper,
                public msg: NzMessageService,
                private reuseTabService: ReuseTabService
    ){
        this.states = this.helper.getDictByKey('ACTV_STATUS');   //获取使用状态数据
    }


    ngOnInit(){
        this.reuseTabService.change.subscribe(res => {
            if(res && res['active'] == 'refresh' && res['pageName'] == 'system/stafflist') {
                this.onSearch(false);
            }
        })
    }


    /**
     * 表格配置
     * @type {{url: string; params: StaffForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); buttons: [{text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: ((row: any))}]}]}}
     */
    public tableCfg:any = {
        url:StaffService.STAFF_LIST_URL,
        params: this.staffForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                // 用户名
                title:this.i18n.fanyi('staff.listPage.tableCols.userName'),
                index:'userName'
            },{
                // 密码
                title:this.i18n.fanyi('staff.listPage.tableCols.userPwd'),
                render:'userPwdRender'
            },{
                // 员工姓名
                title:this.i18n.fanyi('staff.listPage.tableCols.realName'),
                index:'realName'
            },{
                // 联系电话
                title:this.i18n.fanyi('staff.listPage.tableCols.phone'),
                render:'phoneRender'
            },{
                // 角色分配
                title:this.i18n.fanyi('staff.listPage.tableCols.roleAllot'),
                render:'roleAllotRender'
            },{
                // 使用状态
                title:this.i18n.fanyi('staff.listPage.tableCols.isEnabled'),
                render:'isEnabledRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('ASEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('ASDEL')){
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
     * 状态变更
     * @param val
     */
    public onEnabled(val: any) {
        const confirm = this.nzModal.confirm({
            title: this.i18n.fanyi('staff.state.title'),
            content: this.i18n.fanyi('staff.state.content', val['userName'])
        })

        confirm.subscribe(res => {
            if(res && res == 'onOk') {
                val['isEnabled'] = val['isEnabled'] == 1 ? 0 : 1;

                this.StaffDB.addOrEdit(val).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                    }else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.staffListTable.doSearch(false);
                })
            }
        })
    }


    /**
     * 查询
     */
    public onSearch(boo: boolean = true) {
        this.staffListTable.doSearch(boo);
    }


    /**
     * 新增
     */
    public onAdd() {
        this.helper.navigate('/admin/system/staffedit', this.i18n.fanyi('staff.editPage.addTitle'), null);
    }


    /**
     * 编辑
     * @param row
     */
    public onEdit(row: any) {
        row['step'] = 0;
        this.helper.navigate('/admin/system/staffedit', this.i18n.fanyi('staff.editPage.editTitle'), row);
    }


    /**
     * 角色分配
     */
    public onAllotRole(row: any) {
        row['step'] = 1;
        this.helper.navigate('/admin/system/staffedit', this.i18n.fanyi('staff.allotRole.title'), row);
    }


    /**
     * 删除
     * @param row
     */
    public onDel(row: any) {
        const _confirm = this.nzModal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('staff.listPage.tableCols.delInfo'),
            maskClosable: false
        })

        _confirm.subscribe((res) => {
            if(res && res == 'onOk') {
                this.StaffDB.del({id: row['id']}).subscribe((_res) => {
                    if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                    }else {
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.staffListTable.doSearch(false);
                })
            }
        })
    }

    /**
     * 修改密码
     * @param row
     */
    public onModifyPwd(row: any) {
        const win = this.modal.static(staffModifyPwdComponent,
            {_id: row['id']}, 600, {title: this.i18n.fanyi('staff.modifyPwd.title')})

        win.subscribe(res => {
            if(res && res == 'onOk') {
                this.staffListTable.doSearch(false);
            }
        })
    }

}
