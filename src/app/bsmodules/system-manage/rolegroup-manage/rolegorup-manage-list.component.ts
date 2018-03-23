import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {RMForm} from "../../../common/form/role-manage/role.form";
import {CommonEnum} from "../../../common/enum/common.enum";
import {ReuseTabService, SimpleTableComponent} from "@delon/abc";
import {RoleGroupManageService} from "../../../common/services/request/system-manage/role-group-manage.service";

/**
 * 角色管理列表页模块
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'rolegorup-manage-list',
    templateUrl: 'rolegorup-manage-list.component.html',
    providers: [RoleGroupManageService]
})
export class RolegorupManageListComponent {
    public rmListForm:RMForm = new RMForm();   //定义form表单

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modalService:NzModalService,
                protected roleSer:RoleGroupManageService,
                public _msg: NzMessageService,
                public reuseTabService:ReuseTabService
               ){

    }

    @ViewChild('roleManageListTable') public roleManageListTable:SimpleTableComponent;  //获取表格模块

    /**
     * 角色管理列表页数据源
     * @type {{url: string; params: RMForm; total: number; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); buttons: [{text: (string | any); click: any} , {text: (string | any); click: any}]}]}}
     */
    public tableCfg:any = {
        url:RoleGroupManageService.ROLE_GROUP_MANAGE_LLIST_URL,
        params:this.rmListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('roleGroup.listPage.tableCols.roleName'),      //角色组名称
                index:'roleName'
            }, {
                title:this.i18n.fanyi('roleGroup.listPage.tableCols.rolecode'),      //角色组编码
                index:'rolecode'
            },{
                title:this.i18n.fanyi('roleGroup.listPage.tableCols.appId'),   //APPID
                index:'appId'
            },{
                title:this.i18n.fanyi('roleGroup.listPage.tableCols.description'),    //角色组描述
                index:'description'
            },{
                title:this.i18n.fanyi('roleGroup.listPage.tableCols.orgName'),    //所属机构
                render:'orgNameRender'
            },{
                title:this.i18n.fanyi('roleGroup.listPage.tableCols.createdTime'),    //创建时间
                index:'createdTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                width:'500px',
                buttons:[
                  {
                        text: this.i18n.fanyi('RM.nzTitle.step2Title'),
                        // 角色组管理 - 关联菜单权限
                        hide: (() => {
                            if (this.helper.btnRole('ARGMJURISDICTION')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/system/addrolegrouplist', this.i18n.fanyi('RM.nzTitle.step2Title'), {isEdit: true,step:1, id:record['id'],appId: record['appId'], orgNo: record['orgNo'],rolecode:record['rolecode'],parentIds: record['parentIds']})
                        }).bind(this)
                    }, {
                        text: this.i18n.fanyi('RM.nzTitle.step3Title'),
                        // 角色组管理 - 关联功能权限
                        hide: (() => {
                            if (this.helper.btnRole('ARGFJURISDICTION')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/system/addrolegrouplist', this.i18n.fanyi('RM.nzTitle.step3Title'), {isEdit: true,step:2, id: record['id'], appId: record['appId'], orgNo: record['orgNo'], parentIds: record['parentIds'], roleId: record['id'],rolecode:record['rolecode']})
                        }).bind(this)
                    },  {
                        text: this.i18n.fanyi('RM.listPage.tableActionCfg.edit'),
                        // 角色组管理 - 编辑
                        hide: (() => {
                            if (this.helper.btnRole('ARGEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        // click: ((record: any) =>{
                        //     this.helper.navigate('/admin/system/addrolegrouplist', this.i18n.fanyi('RM.listPage.tableActionCfg.edit'), {isEedit:true,step:0, appId: record['appId'],orgNo: record['orgNo'] })
                        // }).bind(this)
                        click:this.Edit.bind(this)
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
     * 编辑
     * @param row
     * @constructor
     */
    Edit(row:any){
        this.helper.navigate('/admin/system/addrolegrouplist', this.i18n.fanyi('RM.listPage.tableActionCfg.edit'),
            {isEedit:true,step:0,
                     appId: row['appId'],
                checked: row['checked'],
                createdTime: row['createdTime'],
                creator: row['creator'],
                description: row['description'],
                id: row['id'],
                isBuild: row['isBuild'],
                modifyBy: row['modifyBy'],
                modifyTime: row['modifyTime'],
                orgId: row['orgId'],
                orgName: row['orgName'],
                orgNo: row['orgNo'],
                parentIds: row['parentIds'],
                roleName: row['roleName'],
                rolecode: row['rolecode'],
                subAppid: row['subAppid'],
                table_id: row['table_id'],
                updateVersion: row['updateVersion'],
            })
    }


    /**
     * 新增角色组
     * @constructor
     */
    Onaddrole(): void {
        this.helper.navigate('/admin/system/addrolegrouplist',this.i18n.fanyi('roleGroup.listPage.navigate.addrolegroup'),{});
    }



    /**
     * 编辑返回刷新数据
     */
    ngOnInit(){
        this.reuseTabService.change.subscribe((res)=>{
            if(res&&res['active']=='refresh' && res['pageName']=='system/rolegrouplist'){
                this.onSearch(false);
            }
        })
    }


}
