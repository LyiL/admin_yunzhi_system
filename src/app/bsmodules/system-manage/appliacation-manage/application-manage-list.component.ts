import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {SimpleTableComponent} from "@delon/abc";
import {AppManageListForm} from "../../../common/form/system-manage/application-manage-list.form";
import {AppManageService} from "../../../common/services/request/system-manage/application-manage.service";
import {AppManageAddWinComponent} from "./application-manage-add-win.component";
import {newClone} from "@delon/abc/utils/utils";
import {AppAdminAddWinComponent} from "./application-admin-add-win.component";

/**
 * 应用管理列表页
 * Created by lyl on 2018/3/1
 */
@Component({
    selector:'application-manage-list',
    templateUrl:'./application-manage-list.component.html',
    providers: [AppManageService,CommonService]
})
export class ApplicationManageListComponent implements OnInit{
    public appManageListForm:AppManageListForm = new AppManageListForm();
    @ViewChild('appManageListTable') public appManageListTable:SimpleTableComponent;
    /**
     * 表格配置
     */
    public tableCfg:any = {
        url:AppManageService.APPMANAGE_LIST_URL,
        params:this.appManageListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('AppManage.listPage.tableCols.appname'),
                index:'appname'
            },{
                title:this.i18n.fanyi('AppManage.listPage.tableCols.appCode'),
                index:'appCode'
            },{
                title:this.i18n.fanyi('AppManage.listPage.tableCols.signkey'),
                index:'signkey',
            },{
                title:this.i18n.fanyi('AppManage.listPage.tableCols.description'),
                render:'descriptionRender'
            },{
                title:this.i18n.fanyi('AppManage.listPage.tableCols.admin'),
                render:'adminRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('AppManage.listPage.linkBtn.modulesManage'),
                    hide:(()=>{
                        if(this.helper.btnRole('APPMODULE')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((row: any) =>{
                        this.helper.navigate('/admin/system/modulesmanage', this.i18n.fanyi('AppManage.listPage.linkBtn.modulesManage'),{ appId: row['appCode'] });
                    }).bind(this)
                },{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('APPEDIT')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: this.onEdit.bind(this)
                },{
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('APPDEL')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: this.onDelete.bind(this)
                }]
            }
        ]
    };
    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected modalService: NzModalService,
                protected appManageService: AppManageService,
                public message: NzMessageService,
    ){

    }
    ngOnInit(){

    }
    /**
     * 新增
     */
    public onAdd() {
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('AppManage.listPage.appManageWin.title'),
            content: AppManageAddWinComponent,
            maskClosable:false,// 点击蒙层不允许关闭;
            footer: false,
        });
        subscription.subscribe(res => {
            if(res && res == 'onOk' ){
                this.appManageListTable.doSearch(false);//刷新表格
            }
        })
    }

    /**
     * 编辑
     */
    public onEdit(row:any) {
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('AppManage.listPage.appManageWin.title'),
            content: AppManageAddWinComponent,
            footer: false,
            maskClosable:false,// 点击蒙层不允许关闭;
            componentParams: {
                model: newClone(row)
            }
        });
        subscription.subscribe(res => {
            if(res && res == 'onOk' ){
                this.appManageListTable.doSearch(false);//刷新表格
            }
        })
    }

    /**
     * 删除
     */
    public onDelete(row: any) {
        let that = this;
        const subscription = that.modalService.confirm({
            title  : that.i18n.fanyi('default.hint.hintInfo'),
            content: that.i18n.fanyi('AppManage.listPage.tips.deleteAppTip', row['appname']),
            maskClosable:false,// 点击蒙层不允许关闭;
            onOk() {
                that.appManageService.deleteAppManageInfo({id:row['id']}).subscribe((res) => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        that.message.success(that.i18n.fanyi('default.hint.delSuccess'));
                    }else {
                        that.message.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            },
            onCancel() {
            }
        })
        subscription.subscribe(res => {
            if(res && res == 'onOk' ){
                //设置延时，解决数据库里的数据还没删除就刷新的问题
                setTimeout(() => {
                    this.appManageListTable.doSearch(false);//刷新表格
                },500)
            }
        })
    }

    /**
     *添加管理员账号
     */
    public onAddAdmin(appCode: any) {
        this.appManageService.findAdmin({appId: appCode}).subscribe(res => {
            if(res){
                let condition = (res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY )&& res[CommonEnum.SERVER_DATA_KEY];
                const subscription = this.modalService.open({
                    title: condition ? this.i18n.fanyi('AppManage.listPage.appAdminWin.editTitle'):this.i18n.fanyi('AppManage.listPage.appAdminWin.addTitle'),
                    //若查到已存在管理员信息,标题为编辑管理员信息，否则为添加管理员账号
                    content: AppAdminAddWinComponent,
                    footer: false,
                    maskClosable:false,// 点击蒙层不允许关闭;
                    componentParams: condition ? {
                        appId: appCode,
                        isDisabled: true,
                        model: newClone(res[CommonEnum.SERVER_DATA_KEY])
                    }:{
                        appId: appCode,
                        isDisabled: false,
                    }//若查到已存在管理员信息,则将res['data']赋值给model，且userName（用户名）和 realName（真实姓名）为只读
                });
                subscription.subscribe(res => {
                    if(res && res == 'onOk' ){
                        this.appManageListTable.doSearch(false);//刷新表格
                    }
                })
            }
        })

    }
    /**
     * 查询
     */
    public onSearch() {
        this.appManageListTable.doSearch();
    }
}
