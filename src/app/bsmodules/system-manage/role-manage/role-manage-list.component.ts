import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {ReuseTabService, SimpleTableComponent} from "@delon/abc";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonEnum} from "../../../common/enum/common.enum";
import {RMForm} from "../../../common/form/role-manage/role.form";
import {RoleManageSevice} from "../../../common/services/request/system-manage/role-manage.sevice";


/**
 * 角色管理列表页模块
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'rolemanage-list',
    templateUrl: 'role-manage-list.component.html',
    providers: [RoleManageSevice]
})
export class RoleManageComponent implements OnInit{
    public rmListForm:RMForm = new RMForm();   //定义form表单

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modalService:NzModalService,
                protected roleSer:RoleManageSevice,
                public _msg: NzMessageService,
                public reuseTabService:ReuseTabService){

    }

    @ViewChild('roleManageListTable') public roleManageListTable:SimpleTableComponent;  //获取表格模块

    /**
     * 角色管理列表页数据源
     * @type {{url: string; params: RMForm; total: number; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); buttons: [{text: (string | any); click: any} , {text: (string | any); click: any}]}]}}
     */
    public tableCfg:any = {
        url:RoleManageSevice.ROLE_MANAGE_LLIST_URL,
        params:this.rmListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        // reqReName:{pi:'0',ps:'size'},
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        // resReName:ComonEnum.TABLE_RES_RE_NAME,
        // reqReName:ComonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('RM.listPage.tableCols.roleName'),      //角色名称
                index:'roleName'
            },{
                title:this.i18n.fanyi('RM.listPage.tableCols.description'),   //角色描述
                index:'description'
            },{
                title:this.i18n.fanyi('RM.listPage.tableCols.parentName'),    //所属角色组
                index:'parentName'
            },{
                title:this.i18n.fanyi('RM.listPage.tableCols.createdTime'),    //创建时间
                index:'createdTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                width:'500px',
                buttons:[
                   {
                        text: this.i18n.fanyi('RM.nzTitle.step2Title'),
                        // 角色管理 - 关联菜单权限
                        hide: (() => {
                            if (this.helper.btnRole('ARMJURISDICTION')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/system/roleaddmanage', this.i18n.fanyi('RM.nzTitle.step2Title'), {isEdit: true,step:1, id: record['id'], appId: record['appId'], orgNo: record['orgNo'], parentIds: record['parentIds'], roleId: record['id']})
                        }).bind(this)
                    }, {
                        text: this.i18n.fanyi('RM.nzTitle.step3Title'),
                        // 角色管理 - 关联功能权限
                        hide: (() => {
                            if (this.helper.btnRole('ARFJURISDICTION')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/system/roleaddmanage', this.i18n.fanyi('RM.nzTitle.step3Title'), {isEdit: true,step:2, id: record['id'], appId: record['appId'], orgNo: record['orgNo'], parentIds: record['parentIds'], roleId: record['id']})
                        }).bind(this)
                    },      {
                        text: this.i18n.fanyi('RM.listPage.tableActionCfg.edit'),
                        // 角色管理 - 编辑
                        hide: (() => {
                            if (this.helper.btnRole('AREDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/system/roleaddmanage', this.i18n.fanyi('RM.listPage.tableActionCfg.edit'), {isEedit:true,step:0, id: record['id'] })
                        }).bind(this)
                    },{
                        text: this.i18n.fanyi('RM.listPage.tableActionCfg.del'),
                        // 角色管理 - 删除
                        hide: (() => {
                            if (this.helper.btnRole('ARDEL')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onDelete.bind(this)
                    }]
            }
        ]
    };


    /**
     * 搜索
     */
    public onSearch(search:boolean = true){
        this.roleManageListTable.doSearch(search);
    }


    /**
     * 编辑返回刷新数据
     */
    ngOnInit(){
        this.reuseTabService.change.subscribe((res)=>{
            if(res&&res['active']=='refresh' && res['pageName']=='system/rolemanagelist'){
                this.onSearch(false);
            }
        })
    }


    /**
     * 新增角色
     * @constructor
     */
    Onaddrole(): void {
        this.helper.navigate('/admin/system/roleaddmanage',this.i18n.fanyi('RM.listPage.navigate.addrole'),{});
    }


    /**
     * 删除角色
     */
    public onDelete(row:any,e: MouseEvent){

        let _confirm= this.modalService.confirm({
            title:this.i18n.fanyi('RM.listPage.alert.prompt'),
            content: this.i18n.fanyi('RM.listPage.alert.title'),
        });
        _confirm.subscribe(result => {
            if(result && result == 'onOk'){
                this.roleSer.loadRoleDel({id:row['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('RM.listPage.alert.opsuc'));
                        this.roleManageListTable.doSearch();
                    }else {
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }

                })
            }
        })
    }
}
